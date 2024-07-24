import httpStatus from "http-status";
import sendResponse from "../../../utils/helpers/SendResponse.js";
import catchAsync from "../../../utils/helpers/catchAsync.js";
import Feedback from "../../models/feedbackSchema.js";

const CreateFeedback = catchAsync(async (req, res) => {
  // creating feedback
  await Feedback.create({
    userId: req?.user?._id,
    ...req.body,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Feedback given successfully!`,
  });
});

export default CreateFeedback;
