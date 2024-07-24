import httpStatus from "http-status";
import sendResponse from "../../../utils/helpers/SendResponse.js";
import catchAsync from "../../../utils/helpers/catchAsync.js";
import Request from "../../models/requestSchema.js";
import send_mail from "../../../utils/server/sendMail.js";

const CreateRequest = catchAsync(async (req, res) => {
  await Request.create({
    ...req.body,
  });

  // send mail
  const mailOptions = {
    from: "Fysio.ai <no-reply@fysio.ai.com>",
    to: "info@fysio.ai",
    subject: `Request for Demo`,
    html: `<p>${req.body.email} has requested for demo of the app!</p>`,
  };

  send_mail(mailOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Request Submitted successfully!`,
  });
});

export default CreateRequest;
