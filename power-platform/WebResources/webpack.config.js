const { CleanPlugin } = require("webpack");
const { resolve } = require('path');

const webresources = require('./webresources.json');

module.exports = {
    //Creates an object map for each of the web resources defined in webresources.json
    //The format is: { "resourceName": "sourceFile" }
    //Example: { "vrm_AutomationBulkUserRequest": "./src/forms/AutomationBulkUserRequest.ts" }
    entry: Object.fromEntries(webresources.webResources.map(item => [item.resourceName, item.sourceFile])),

    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    output: {
        path: resolve(__dirname, "dist"),
    },
    plugins: [
        new CleanPlugin(),
    ],
};

