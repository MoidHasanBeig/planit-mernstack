import express from 'express';
import mongoose from 'mongoose';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../../webpack.client.config.js'

import loginRouter from './routes/login';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const altlasUri = process.env.ATLAS_URI;

mongoose.connect(altlasUri, {useNewUrlParser: true, useCreateIndex: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("MongoDB connected");
});

const argv = {
  mode: process.env.NODE_ENV
}
const conf = config(null,argv);
const compiler = webpack(conf);
const devMode = (argv.mode === 'development');
const prodMode = (argv.mode === 'production');

prodMode
  ? app.use(express.static(__dirname))
  : app.use(webpackDevMiddleware(compiler, {
      publicPath: conf.output.publicPath
    }));

devMode && app.use(webpackHotMiddleware(compiler));

const renderHtml = (req,res) => {
  prodMode
    ? res.sendFile(__dirname + '/dist_index.html')
    :  compiler.outputFileSystem.readFile(compiler.outputPath + '/dist_index.html', (err,result) => {
      res.set('content-type', 'text/html');
      res.send(result);
    });
};

app.use("/auth/google",loginRouter);
app.use(renderHtml);

app.listen(port, () => {
  devMode && console.log(`server live @ ${port}`);
  devMode && console.log(process.env.NODE_ENV);
});
