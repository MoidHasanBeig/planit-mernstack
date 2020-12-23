import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../../webpack.client.config.js'

const app = express();

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

app.get("*", (req,res) => {
  prodMode
    ? res.sendFile(__dirname + '/dist_index.html')
    :  compiler.outputFileSystem.readFile(compiler.outputPath + '/dist_index.html', (err,result) => {
      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
    })
});

app.listen(3000, () => {
  devMode && console.log('server live @ 3000');
  devMode && console.log(process.env.NODE_ENV);
});
