import httpStatus from "http-status";
import sendResponse from "../../../utils/helpers/SendResponse.js";
import catchAsync from "../../../utils/helpers/catchAsync.js";
import axios from "axios";
import fs from "fs";
import ApiError from "../../../utils/errors/ApiError.js";
import FormData from "form-data";
import OpenAI from "openai";
import config from "../../../utils/server/config.js";
import User from "../../models/userSchema.js";
import path from "path";
import { exec } from "child_process";
import { Storage } from "@google-cloud/storage";
import { pipeline } from "stream";
import { promisify } from "util";
import { getPromptMessage } from "../../../utils/getPromptMessage.js";

const pipelineAsync = promisify(pipeline);

const bucketName = "saving_audio_bucket";
const directory = "/tmp";

const apiKey = String(config.OPENAI_SECRET);
const apiUrl = String(config.OPENAI_URL);

const openai = new OpenAI({
  apiKey: apiKey,
});

// Remove the file after a successful API call
const removeFile = (path) => {
  fs.unlink(path, (err) => {
    if (err) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Error during audio transcription"
      );
    }
  });
};

// get text from the audio
const getAudioToText = async (path, fileName, languageCode) => {
  try {
    if (!fs.existsSync(path)) {
      console.error(`File not found: ${path}`);
      throw new ApiError(httpStatus.BAD_REQUEST, `File not found: ${path}`);
    }
    const audioData = fs.readFileSync(path);

    const formData = new FormData();
    formData.append("file", audioData, { filename: fileName });
    formData.append("model", "whisper-1");
    formData.append("language", languageCode);
    formData.append("temperature", 0.0);

    const response = await axios.post(apiUrl, formData, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        ...formData.getHeaders(),
      },
    });

    return response.data.text;
  } catch (error) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Error during audio transcription"
    );
  }
};

// get open ai chat message
const getChatMessage = async (
  textMsg,
  transcript,
  filePath,
  totalChunk,
  fileNameWithoutExtension
) => {
  try {
    console.log(transcript, "Sending this to chat gpt....");
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: textMsg },
        { role: "user", content: transcript },
      ],
      model: "gpt-4-1106-preview",
      response_format: { type: "json_object" },
      temperature: 0.0,
    });
    return chatCompletion.choices[0].message;
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Error during chat completion"
    );
  } finally {
    const tmpOutputDir = path.join(
      `${directory}`,
      "output",
      `${fileNameWithoutExtension}`
    );
    // remove main audio file
    removeFile(filePath);
    fs.rmSync(tmpOutputDir, { recursive: true, force: true });
    // // removing chunks file
    // if (totalChunk > 0) {
    //   for (let i = 0; i < totalChunk; i++) {
    //     removeFile(
    //       `${directory}/output/${fileNameWithoutExtension}/chunk_${i}.wav`
    //     );
    //   }
    // }
  }
};

// Function to split audio file into chunks
const splitAudio = async (filePath, fileNameWithoutExtension) => {
  try {
    const outputAudio = path.join(
      `${directory}`,
      "output",
      `${fileNameWithoutExtension}`,
      "chunk_%d.wav"
    );

    await new Promise((resolve, reject) => {
      // 120 second segments
      const sCommand = `ffmpeg -i "${filePath}" -f segment -segment_time 120 -c copy ${outputAudio}`;

      exec(sCommand, (error, stdout, stderr) => {
        if (error) {
          console.error("Exec error:", error);
          reject(error);
        } else {
          console.log("Exec stdout:", stdout);
          console.log("Exec stderr:", stderr);
          resolve({
            status: "success",
            error: stderr,
            out: stdout,
          });
        }
      });
    });
  } catch (error) {
    console.error("Error splitting audio file:", error);
  }
};

const ensureTmpDirsExist = (fileNameWithoutExtension) => {
  const tmpOutputDir = path.join(
    `${directory}`,
    "output",
    `${fileNameWithoutExtension}`
  );
  const tmpFilesDir = path.join(`${directory}`, "files");

  // Check if the output directory already exists, if not, create it
  if (!fs.existsSync(tmpOutputDir)) {
    fs.mkdirSync(tmpOutputDir, { recursive: true });
  }

  // Check if the files directory already exists, if not, create it
  if (!fs.existsSync(tmpFilesDir)) {
    fs.mkdirSync(tmpFilesDir, { recursive: true });
  }
};

async function processChunksInParallel(
  totalChunk,
  directory,
  fileNameWithoutExtension,
  language
) {
  try {
    const promises = [];

    for (let i = 0; i < totalChunk; i++) {
      const chunkFilePath = `${directory}/output/${fileNameWithoutExtension}/chunk_${i}.wav`;
      promises.push(getAudioToText(chunkFilePath, `chunk_${i}.wav`, language));
    }

    const chunkTexts = await Promise.all(promises);

    const fullText = chunkTexts.join(" "); // Assuming you want a space between chunk texts
    console.log(`The output of all chunks is ${fullText}`);

    return fullText;
  } catch (err) {
    console.error(err);
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Error during audio transcription"
    );
  }
}

const CreateChatGCP = catchAsync(async (req, res) => {
  // For testing error message on frontend, uncomment this line
  // throw new ApiError(httpStatus.BAD_REQUEST, `Random Error`);
  const fileName = req.body.fileName;
  const fileNameWithoutExtension = fileName.split(".")[0];
  // file paths
  const filePath = `${directory}/files/${fileName}`;
  ensureTmpDirsExist(fileNameWithoutExtension);

  const storage = new Storage();

  // Rest of your code remains the same
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(fileName);

  // Create a readable stream from the file
  const readableStream = file.createReadStream();

  // Create a writable stream to save the file locally (you can modify this as needed)
  const writableStream = fs.createWriteStream(filePath);

  // Use pipelineAsync to handle the stream asynchronously

  await pipelineAsync(readableStream, writableStream);
  console.log("File download completed.");

  const language = req.body.language;
  const time = req.body.time;
  let text;
  let totalChunk;
  const user = await User.findById(req.user._id);
  if (user?.timesUsed >= user?.usageLimit) {
    // send mail
    const mailOptions = {
      from: "Fysio.ai <no-reply@fysio.ai.com>",
      to: user.email,
      subject: `Gebruikslimiet Overtroffen`,
      html: `<p>Je hebt de gebruikslimiet van je account overschreden. Neem voor meer details contact op via info@fysio.ai.</p>`,
    };

    send_mail(mailOptions);
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Je hebt de gebruikslimiet van je account overschreden."
    );
  } else if (
    new Date() < new Date(user?.startDate) ||
    new Date() > new Date(user?.endDate)
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "De datum moet liggen tussen de startdatum en einddatum van je account"
    );
  }

  if (time > 120) {
    totalChunk = Math.ceil(time / 120);
    await splitAudio(filePath, fileNameWithoutExtension);

    let fullText = "";

    // Transcribe each chunk and append to fullText
    // for (let i = 0; i < totalChunk; i++) {
    //   const chunkFilePath = `${directory}/output/${fileNameWithoutExtension}/chunk_${i}.wav`;
    //   const chunkText = await getAudioToText(
    //     chunkFilePath,
    //     `chunk_${i}.wav`,
    //     language
    //   );
    //   console.log(`The output of chunk_${i}.wav is ${chunkText}`);
    //   fullText += chunkText + " "; // Assuming you want a space between chunk texts
    // }
    fullText = await processChunksInParallel(
      totalChunk,
      directory,
      fileNameWithoutExtension,
      language
    );

    // Set the full text
    text = fullText.trim();
  } else {
    // getting text from audio
    text = await getAudioToText(filePath, fileName, language);
  }

  // promtmsg
  const promtMsg = await getPromptMessage();

  // get assistant response
  const chatData = await getChatMessage(
    promtMsg,
    text,
    filePath,
    totalChunk,
    fileNameWithoutExtension
  );

  // Split the content into lines
  const lines = chatData.content.split("\n");

  // Extract user messages
  // const userMessages = lines.filter(line => line.startsWith('User:'));
  // const youMessages = lines.filter(line => line.startsWith('You:'));

  const extractValue = (key) => {
    const index = lines.findIndex((line) => line.includes(`"${key}":`));
    return index !== -1
      ? lines[index]
          .replace(/.*: "(.*)",?$/, "$1")
          .trim()
          .replace(/\\n/g, "\n")
      : null;
  };

  // Extract values for specific keys
  const hulpvraagValue = extractValue("Hulpvraag patiënt (of contactreden)");
  const beloopValue = extractValue("Functioneringsproblemen en beloop");
  const medischeValue = extractValue("Medische gezondheidsdeterminanten");
  const omgevingsValue = extractValue("Omgevingsdeterminanten");
  const persoonlijkeValue = extractValue("Persoonlijke determinanten");

  // to handle concurrent requests we again fetch the user
  const userAgain = await User.findById(req.user._id);

  await User.updateOne(
    { _id: req.user._id },
    { $inc: { timesUsed: 1, secondsUsed: parseInt(time) } }
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Chat retrived successfully!`,
    data: {
      textData: text,
      chat: chatData,
      array: [
        hulpvraagValue,
        beloopValue,
        medischeValue,
        omgevingsValue,
        persoonlijkeValue,
      ],
    },
  });
});

export default CreateChatGCP;
