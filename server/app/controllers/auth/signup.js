import User from "../../models/userSchema.js";
import httpStatus from "http-status";
import sendResponse from "../../../utils/helpers/SendResponse.js";
import catchAsync from "../../../utils/helpers/catchAsync.js";
import ApiError from "../../../utils/errors/ApiError.js";
import send_mail from "../../../utils/server/sendMail.js";
import config from "../../../utils/server/config.js";
import jwt from 'jsonwebtoken'

const signup = catchAsync(
    async (req, res) => {

        // finding user if exists
        const user = await User.findOne({ email: req.body.email });
        if (user) throw new ApiError(httpStatus.BAD_REQUEST, 'Account already exists!');

        const token = jwt.sign(
            { email: req.body.email },
            config.TOKEN_SECRET,
            { expiresIn: '365d' });

        // send mail
        const mailOptions = {
            from: "Fysio.ai <no-reply@fysio.ai.com>",
            to: req.body.email,
            subject: `Verifieer uw Fysio.ai-account`,
            html: `<p>Beste,</p>
                   <p>Bedankt voor uw registratie bij Fysio.ai. Klik op de link hieronder om uw e-mailadres te bevestigen en uw account te activeren:</p>
                   <p><a href="${config.FRONTEND_LINK}verify/${token}">Account bevestigen</a></p>
                   <p>Heeft u zich niet geregistreerd? Dan kunt u deze e-mail negeren.</p>
                   <p>Vriendelijke groeten,</p>
                   <p>Fysio.ai Team</p>`
        };


        send_mail(mailOptions);

        // creating user
        await User.create(req.body);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: `User created successfully!`,
        });
    }
)

export default signup