import bodyParser from 'koa-bodyparser'
import Koa from 'koa'
import logger from 'koa-logger'
import mongoose from 'mongoose'
import helmet from 'koa-helmet'
import cors from 'koa-cors'
import jwt from 'koa-jwt'
// import serve from 'koa-static'
import routing from './routes'
import { port, connexionString, secret } from './config/index'
import errorHandle from './middlewares/errorHandle'

mongoose.connect(connexionString)
mongoose.connect('error', console.error)
// mongoose promise 风格 [mongoose.Promise = require('bluebird')]
mongoose.Promise = global.Promise

// create Koa application
const app = new Koa();

// apply middlewares
app
  .use(errorHandle)
  .use(jwt({
    secret,
  }).unless({
    path: [/\/register/, /\/login/],
  }))
  .use(logger())
  .use(bodyParser())
  .use(helmet())
  .use(cors())

routing(app)

// Start application
app.listen(port, () => console.log(`✅  The server is running at http://localhost:${port}/`))

export default app
