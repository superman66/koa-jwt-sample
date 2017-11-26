import Router from 'koa-router'
import LoginController from './login.controller'

const router = new Router();

router.post('/login', LoginController.login)
router.post('/register', LoginController.register)

export default router
