const { merge } = require("webpack-merge");
const { resolve, join } = require('path');
const webpack = require('webpack');
const dotenv = require("dotenv");
const sharedConfig = require("./webpack.config");
const CopyPlugin = require("copy-webpack-plugin");
const webresources = require('./webresources.json');

module.exports = () => {
    dotenv.config({  path: resolve(__dirname, ".env") });

    //Build an array of file copy patterns based on the webresources.json file
    //This will copy the built JavaScript files to the correct location in the browser override content root
    const fileCopyPatterns = webresources.webResources.map(item => ({
        from: `${item.resourceName}`,
        to: resolve(join(process.env.BROWSER_OVERRIDE_CONTENT_ROOT, process.env.DYNAMICS_URL, `${item.resourceId}/webresources`)),
        context: "dist",
        noErrorOnMissing: true, // Don't throw an error if the file is missing
    }));

    return merge(sharedConfig, {
        mode: "development",
        devtool: false,
        watch: true,
        watchOptions: {
            ignored: [
                resolve(__dirname, "node_modules"),
                resolve(__dirname, "dist"),
            ]
        },
        optimization: {
            minimize: false,
        },
        output: {
            filename: "[name]", //No extension, because that's what the browser expects when it overrides web resources
            sourceMapFilename: "[name].map",
            path: resolve(__dirname, "dist"),
            library: ["VRM", '[name]'], //Update this to match your namespace (as defined in BaseForm and any of your form subclasses)
            libraryTarget: "var",
        },
         plugins: [
            //We need to customize the behavior of the SourceMapDevToolPlugin to include the publicPath
            //This is necessary for the browser to correctly load the source maps when debugging
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Output map files with the same name as the source file
                publicPath: 'https://localhost:3000/'
            }),
            new CopyPlugin({
                patterns: fileCopyPatterns,
            }),
         ],
    });
};