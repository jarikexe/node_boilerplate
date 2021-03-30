import express from 'express';
import expressAsyncErrors from 'express-async-errors'
import winston from 'winston'
import i18nextMiddleware from "i18next-express-middleware"
import i18next from './middleware/i18n.js'
import router from './routes/index.js'
import bodyParser from 'body-parser'
import mongoos from 'mongoose'
import errorHandler from './middleware/errorHandler.js'
import config from 'config'
import cors from 'cors'
import {PROD, DEV, TEST} from './definitions/env.js'

const app = express();

app.use(i18nextMiddleware.handle(i18next))
process.on('uncaughtException', (ex) => {
  winston.error(ex.message, ex);
})
process.on('unhandledRejection', (ex) => {
  winston.error(ex.message, ex);
})
const port = process.env.PORT | 5000;
winston.add(new winston.transports.File({filename: config.get('logFile')}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
mongoos.connect(config.get('dbUrl'))
if(
  (config.get('env') === DEV
  || config.get('env') === TEST)
  && config.get('env') !== PROD
){
  app.use(cors());
  app.options('*', cors({allowedHeaders: 'Access-Control-Request-Headers', exposedHeaders: 'Access-Control-Expose-Headers'}));
}
app.use('/api/v1', router);
if(process.env === 'production'){
  app.use(errorHandler);
}
app.listen(port);