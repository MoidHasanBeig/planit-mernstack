require('dotenv').config();

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import router from './router';

import mongoInit from './utils/mongo_init';
import socketInit from './utils/socket_init';
import passportInit from './utils/passport_init';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../../webpack.client.config.js'

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

//initialize utils
passportInit(app);
mongoInit();
socketInit(server);

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

//initialize router
router(app);
app.use(renderHtml);

server.listen(port, () => {
  console.log(`server live @ ${port}`);
  console.log(process.env.NODE_ENV);
});
