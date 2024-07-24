import User from "../../models/userSchema.js";
import httpStatus from "http-status";
import sendResponse from "../../../utils/helpers/SendResponse.js";
import catchAsync from "../../../utils/helpers/catchAsync.js";
import send_mail from "../../../utils/server/sendMail.js";
import jwt from 'jsonwebtoken'
import config from "../../../utils/server/config.js";
import ApiError from "../../../utils/errors/ApiError.js";

const ForgetPassword = catchAsync(
    async (req, res) => {

        // finding user if exists
        const user = await User.findOne({
            email: req.body.email
        });
        if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'User not exists!');


        const token = jwt.sign(
            { email: req.body.email },
            config.TOKEN_SECRET,
            { expiresIn: '5m' });

        // send mail
        const mailOptions = {
            from: "Fysio.ai <no-reply@fysio.ai.com>",
            to: req.body.email,
            subject: `Wachtwoord resetten voor Fysio.ai-account`,
            html: `<p>Beste gebruiker,</p>
                   <p>U heeft onlangs een verzoek ingediend om uw wachtwoord te resetten voor uw Fysio.ai-account. Klik op de onderstaande link om uw wachtwoord te resetten. Deze link is 5 minuten geldig:</p>
                   <p><a href="${config.FRONTEND_LINK}reset-password/${token}">Wachtwoord resetten</a></p>
                   <p>Als u geen wachtwoordreset heeft aangevraagd, negeer dan deze e-mail.</p>
                   <p>Vriendelijke groeten,</p>
                   <p>Het Fysio.ai Team</p>`
        };


        send_mail(mailOptions);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Reset link sent to email!',
        });
    }
)

export default ForgetPassword