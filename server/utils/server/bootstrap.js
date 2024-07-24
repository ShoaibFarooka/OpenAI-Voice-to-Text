import mongoose from "mongoose";
import colors from 'colors';

let server;

const bootstrap = async (app) => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION);
        console.log(colors.red(`Database is connected successfully`));

        server = app.listen(process.env.PORT, () => {
            console.log(colors.magenta(`Listening on port http://localhost:${process.env.PORT}`));
        });
    } catch (err) {
        console.log('Failed to connect database', err);
    }

    process.on('unhandledRejection', error => {
        if (server) {
            server.close(() => {
                console.log(error);
                process.exit(1);
            });
        } else {
            process.exit(1);
        }
    });
}

export default bootstrap;
