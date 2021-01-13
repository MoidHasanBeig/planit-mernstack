const path = require("path");
const webpack = require("webpack"); //eslint-disable-line
const nodeExternals = require('webpack-node-externals');

module.exports = (env,argv) => {
  const prodMode = (argv.mode === 'production');

  const server = prodMode
                  ? "./src/server/serverProd.js"
                  : "./src/server/serverDev.js";

  return ({
    entry: {
      server: server
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
      filename: "server.bundle.js"
    }
  });
};
