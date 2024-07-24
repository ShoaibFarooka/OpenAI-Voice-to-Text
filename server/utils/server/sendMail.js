// external imports
import nodemailer from 'nodemailer';
import config from './config.js';

// auth middleware
const send_mail = async (mailOptions) => {

    // Create a transporter using your Gmail account
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.MAILER_HOST,
            pass: config.MAILER_GOOGLE_APP_PASSWORD, // Use the App Password you generated
        },
    });

    // verify connection configuration
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("Server is ready to take our messages");
            transporter.sendMail(mailOptions, function async(error, info) {
                if (error) {
                    console.log(error, 'mail');
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
    });

}

export default send_mail;
