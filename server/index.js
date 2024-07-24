import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/routes.js";
import httpStatus from "http-status";
import bootstrap from "./utils/server/bootstrap.js";
import globalErrorHandler from "./utils/helpers/globalErrorHandler.js";
import "dotenv/config";
import fs from "fs";
import path from "path";
import { exec } from "child_process";

// const sourceAudio = path.join(
//   "public",
//   "files",
//   "1704094974640-6137821-audio.wav"
// );
// const outputAudio = path.join("public", "output", "chunk_%d.wav");

// const ret = await new Promise((resolve, reject) => {
//   // 120 second segments
//   const sCommand = `ffmpeg -i "${sourceAudio}" -f segment -segment_time 20 -c copy ${outputAudio}`;

//   exec(sCommand, (error, stdout, stderr) => {
//     if (error) {
//       resolve({
//         status: "error",
//       });
//     } else {
//       resolve({
//         status: "success",
//         error: stderr,
//         out: stdout,
//       });
//     }
//   });
// });

// const audioBuffer = Buffer.from([0, 1, 2, 3, 4, 5, 6]);
// const chunk1 = audioBuffer.subarray(0, 1);
// const chunk2 = audioBuffer.subarray(1, 3);
// const audioBuffer = fs.readFileSync(
//   "public/files/1704094974640-6137821-audio.wav"
// );
// const buf = Buffer.alloc(100); // Creating a new Buffer
// const len = buf.write("Hello world! I am Tim User and this is my application"); // Writing to the Buffer
// const part1 = buf.subarray(0, 10);
// const part2 = Buffer.from(buf.subarray(10, 20));
// console.log(buf);
// console.log(part1);
// console.log(part2);

// const chunkSize = 2 * 1024;
// let i = 1;
// const totalChunks = Math.ceil(audioBuffer.length / chunkSize);
// const start = 0 * chunkSize;
// const end = Math.min((i + 1) * chunkSize, audioBuffer.length);
// const chunkBuffer = Buffer.from(audioBuffer.subarray(start, end));
// console.log("Breaking the buffer: ", start, end);
// // console.log("Chunked Buffer", chunkBuffer.toString());
// const chunkFileName = `public/output/chunk_${i + 1}.wav`;
// fs.writeFileSync(chunkFileName, chunkBuffer);
// console.log(audioBuffer, totalChunks, audioBuffer.length);

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// all routes
app.use("/api/v1", routes);

// files route
// app.use('/public', express.static('public'))

//global error handler
app.use(globalErrorHandler);

//handle not found
app.use((req, res) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
});

// server related works
process.on("uncaughtException", (error) => {
  console.log(error, "uncaughtException");
  process.exit(1);
});

let server;
bootstrap(app);

process.on("SIGTERM", () => {
  console.log("SIGTERM is received");
  if (server) {
    server.close();
  }
});
