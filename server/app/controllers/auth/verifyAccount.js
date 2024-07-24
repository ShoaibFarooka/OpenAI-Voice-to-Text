import User from "../../models/userSchema.js";
import httpStatus from "http-status";
import sendResponse from "../../../utils/helpers/SendResponse.js";
import catchAsync from "../../../utils/helpers/catchAsync.js";

const verifyAccount = catchAsync(
    async (req, res) => {

        // updating item
        await User.findOneAndUpdate({ email: req.params.email }, {
            $set: {
                isVerified: true
            }
        })

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Profile verified!',
        });
    }
)

export default verifyAccount