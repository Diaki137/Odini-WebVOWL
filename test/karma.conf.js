module.exports = function (config) {
    config.set({
        basePath: "../",
        frameworks: ["jasmine"],
        files: [
            // Include D3 if needed by your tests
            { pattern: "node_modules/d3/d3.js", watched: false },
            // Only include test files
            { pattern: "test/unit/**/*.spec.js", watched: true }
        ],
        preprocessors: {
            "test/unit/**/*.spec.js": ["webpack"]
        },
        reporters: ["spec"],
        browsers: ["ChromeHeadless"],
        plugins: [
            require("karma-jasmine"),
            require("karma-chrome-launcher"),
            require("karma-spec-reporter"),
            require("karma-webpack"),
        ],
        webpack: {
            mode: "development",
            resolve: {
                extensions: [".js"],
            },
            // Remove the babel-loader configuration temporarily
        },
        webpackMiddleware: {
            noInfo: true,
        },
        singleRun: true,
        concurrency: Infinity
    });
};