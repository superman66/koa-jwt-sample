import Router from 'koa-router'
import login from './api/login'
import { baseApi } from './config/index'

const router = new Router()


router.prefix(`/${baseApi}`)
export default function (app) {
  router.use('', login.routes(), login.allowedMethods())
  app.use(router.routes())
}
