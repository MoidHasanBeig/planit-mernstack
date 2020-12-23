const path = require("path");
const webpack = require("webpack");
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    server: "./src/server/server.js"
  },
  mode: "development",
  target: "node",
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/env"]
        }
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "[name].bundle.js"
  }
};
