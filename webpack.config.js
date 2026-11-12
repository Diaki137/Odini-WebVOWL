"use strict";
const paths = require("./paths.js").path_func;
const path = require("path");
const webpack = require("webpack");
const MergeWebPackPlugin = require("webpack-merge");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

function getConfig(args) {
  const isProdEnabled = args.mode === "production" ? true : false;
  const modeLiteral = args.mode === "production" ? "production" : "development";
  return {
    cache: true,
    mode: modeLiteral,
    target: "web",
    devtool: args.mode === "production" ? false : "source-map",
    entry: {
      app: {
        import: [`./${paths.frontendPath}/js/entry.js`],
      },
    },
    output: {
      path: path.resolve(__dirname, paths.deployPath),
      publicPath: "auto",
      filename: "js/[name].js",
      chunkFilename: "js/[chunkhash].js",
      library: {
        name: "[name]",
        type: "umd",
      },
    },
    optimization: {
      minimize: isProdEnabled,
      minimizer: [
        new TerserPlugin({
          minify: TerserPlugin.uglifyJsMinify,
          // `terserOptions` options will be passed to `uglify-js`
          // https://github.com/mishoo/UglifyJS#minify-options
          terserOptions: { sourceMap: isProdEnabled },
        }),
        new CssMinimizerPlugin(),
      ],
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /webvowl\.js$/,
          loader: "string-replace-loader",
          options: {
            search: "@@WEBVOWL_VERSION",
            replace: process.env.npm_package_version,
          },
        },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        d3: "d3",
      }),
      new CopyWebpackPlugin({
        patterns: [
          { context: paths.srcPath, from: "favicon.ico", to: "." },
          { from: "license.txt", to: "." },
        ],
      }),
      new MiniCssExtractPlugin({ filename: "css/[name].css" }),
    ],
  };
}

function getServerConfig(args) {
  return {
    devServer: {
      host: "localhost",
      port: 8080,
      server: "http",
      compress: false,
      hot: false,
      open: true,
      setupExitSignals: true,
      static: {
        directory: path.resolve(paths.deployPath),
      },
      client: {
        overlay: {
          errors: true,
          warnings: false,
          runtimeErrors: true,
        },
        logging: "info",
        progress: false,
        reconnect: 3,
      },
      devMiddleware: {
        index: true,
        serverSideRender: false,
        writeToDisk: true,
        lastModified: false, // setting to true crashes the devserver - https://github.com/webpack/webpack-dev-server/issues/5519#issuecomment-3127206441
      },
    },
  };
}

module.exports = (args) => {
  switch (args.type) {
    case "devserver":
      return MergeWebPackPlugin.merge(getConfig(args), getServerConfig(args));
    default:
      return getConfig(args);
  }
};
