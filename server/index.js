import bodyParser from 'koa-bodyparser'
import Koa from 'koa'
import logger from 'koa-logger'
import mongoose from 'mongoose'
import helmet from 'koa-helmet'
import cors from 'koa-cors'
import path from 'path'
import fs from 'fs'
// import serve from 'koa-static'
import routing from './routes'
import { port, connexionString } from './config/index'

mongoose.connect(connexionString)
mongoose.connect('error', console.error)

// create Koa application
const app = new Koa();

// apply middlewares
app
  .use(logger())
  .use(bodyParser())
  .use(helmet())
  .use(cors())

routing(app)

// Start application
app.listen(port, () => console.log(`✅  The server is running at http://localhost:${port}/`))

export default app
