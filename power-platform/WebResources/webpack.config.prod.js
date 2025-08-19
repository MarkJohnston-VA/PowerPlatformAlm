const { merge } = require("webpack-merge");
const { resolve } = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const sharedConfig = require("./webpack.config");
module.exports = merge(sharedConfig, {
    mode: "production",
    output: {
        filename: "[name]", //No extension, because that's what the browser expects when it overrides web resources
        sourceMapFilename: "[name].map",
        path: resolve(__dirname, "dist"),
        library: ["CDCEP", '[name]'], //Update this to match your namespace (as defined in BaseForm and any of your form subclasses)
        libraryTarget: "var",
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        // Power Apps Solution Checker will complain if strict equality operators
                        // are optimised, rule: web-use-strict-equality-operators
                        // see https://docs.microsoft.com/en-us/powerapps/maker/data-platform/use-powerapps-checker#best-practice-rules-used-by-solution-checker
                        comparisons: false
                    }
                }
            })
        ]
    } 
});
