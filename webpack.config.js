const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    materialLikeInput: "./src/material-like-input/index.js",
    neumorphicLightSwitch: "./src/neumorphic-light-switch/index.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: "all",
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "material-like-input/index.html",
      template: "src/material-like-input/index.html",
      chunks: ["materialLikeInput"],
    }),
    new HtmlWebpackPlugin({
      filename: "neumorphic-light-switch/index.html",
      template: "src/neumorphic-light-switch/index.html",
      chunks: ["neumorphicLightSwitch"],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|gif)$/i,
        use: ["file-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        use: ["file-loader"],
      },
    ],
  },
};
