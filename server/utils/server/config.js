import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    PORT: process.env.PORT,
    MONGO_CONNECTION: process.env.MONGO_CONNECTION,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    TOKEN_SECRET_EXP: process.env.TOKEN_SECRET_EXP,

    OPENAI_SECRET: process.env.OPENAI_SECRET,
    OPENAI_URL: process.env.OPENAI_URL,

    MAILER_HOST: process.env.MAILER_HOST,
    MAILER_USERNAME: process.env.MAILER_USERNAME,
    MAILER_PASSWORD: process.env.MAILER_PASSWORD,
    MAILER_GOOGLE_APP_PASSWORD: process.env.MAILER_GOOGLE_APP_PASSWORD,
    FRONTEND_LINK: process.env.FRONTEND_LINK,
};