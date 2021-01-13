require('dotenv').config();

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import router from './router';

import mongoInit from './utils/mongo_init';
import socketInit from './utils/socket_init';
import passportInit from './utils/passport_init';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

//initialize utils
passportInit(app);
mongoInit();
socketInit(server);

app.use(express.static(__dirname));

const argv = {
  mode: process.env.NODE_ENV
}
const compiler = null;
const prodMode = (argv.mode === 'production');


//initialize router
const routerConf = {
  prodMode,
  compiler
}
router(app, routerConf);

server.listen(port, () => {
  console.log(`server live @ ${port}`);
  console.log(process.env.NODE_ENV);
});
