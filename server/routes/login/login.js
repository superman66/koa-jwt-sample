import Router from 'koa-router'
import { LoginControllers } from '../../controllers/login'
import { baseApi } from '../../config'

const api = 'login'
const router = new Router();

router.prefix(`/${baseApi}/${api}`)
router.post('/', LoginControllers.login)

export default router
