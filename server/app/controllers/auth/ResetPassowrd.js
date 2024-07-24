import User from "../../models/userSchema.js";
import httpStatus from "http-status";
import sendResponse from "../../../utils/helpers/SendResponse.js";
import catchAsync from "../../../utils/helpers/catchAsync.js";
import ApiError from "../../../utils/errors/ApiError.js";
import bcrypt from 'bcryptjs';

const ResetPassword = catchAsync(
    async (req, res) => {

        // finding user if exists
        const user = await User.findOne({
            email: req.body.email
        });
        if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'Account niet gevonden. ');

        // checking pass matched or not
        if (req.body.password !== req.body.confirmPassword) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Verkeerde wachtwoord');
        }

        // hashing password
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);

        // updating user password
        const result = await User.findOneAndUpdate({ email: req.body.email }, {
            $set: {
                password: hashedPassword
            }
        }, { new: true })

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: `Password reset successfully!`,
        });
    }
)

export default ResetPassword