const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = (env, argv) => {
  const devMode = (argv.mode === 'development');
  const prodMode = (argv.mode === 'production');

  const minimize = prodMode ? [
    new TerserPlugin({
      parallel: true
    }),
    new OptimizeCSSAssetsPlugin({})
  ] : [];

  const miniCssPlug = new MiniCssExtractPlugin({
    filename: "[name].css",
    chunkFilename: "[id].css"
  });

  const hmr = new webpack.HotModuleReplacementPlugin();

  const noErr = new webpack.NoEmitOnErrorsPlugin();

  return ({
    entry: {
      client: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', "./src/client/index.js"],
    },
    mode: "development",
    target: "web",
    devtool: "source-map",
    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "eslint-loader",
          options: {
            emitWarning: true,
            failOnError: false,
            failOnWarning: false
          }
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"]
          }
        },
        {
          // Loads the javacript into html template provided.
          // Entry point is set below in HtmlWebPackPlugin in Plugins
          test: /\.html$/,
          use: [{
            loader: "html-loader"
          }]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ['file-loader']
        },
        {
          // Loads CSS into a file when you import it via Javascript
          // Rules are set in MiniCssExtractPlugin
          test: /\.(css|s[ac]ss)$/,
          use: [prodMode ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader']
        },
      ]
    },
    resolve: {
      extensions: ["*", ".js", ".jsx"]
    },
    optimization: {
      minimize: true,
      minimizer: minimize
    },
    output: {
      path: path.resolve(__dirname, "dist/"),
      publicPath: "/",
      filename: "[name].bundle.js"
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/client/index.html",
        publicPath: "/",
        filename: "dist_index.html",
        excludeChunks: ['server']
      }),
      devMode ? hmr : () => {},
      devMode ? noErr : () => {},
      prodMode ? miniCssPlug : () => {}
    ]
  });
};
