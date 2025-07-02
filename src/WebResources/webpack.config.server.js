const dotenv = require("dotenv");
const { resolve, join } = require('path');
const fs = require('fs');

module.exports = () => {
    dotenv.config({  path: resolve(__dirname, ".env") });
    return {
        entry: {}, //Don't attempt to build files for the server, we only want to serve static files
        devServer: {
            static: join(__dirname, 'dist'),
            port: 3000,
            server: {
                type: 'https',
                options: {
                    key: fs.readFileSync(resolve(join(process.env.USERPROFILE, process.env.KEY_FILE_NAME))),
                    cert: fs.readFileSync(resolve(join(process.env.USERPROFILE, process.env.CERT_FILE_NAME))),
                },
            }
        }
    };
};

