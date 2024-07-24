import httpStatus from "http-status";
import sendResponse from "../../../utils/helpers/SendResponse.js";
import catchAsync from "../../../utils/helpers/catchAsync.js";
import User from "../../models/userSchema.js";

const profile = catchAsync(
    async (req, res) => {

        // finding profile
        const data = await User.findOne({ _id: req.user._id });

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: `Profile retrived successfully!`,
            data: data
        });
    }
)

export default profile