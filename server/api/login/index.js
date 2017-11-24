import Router from 'koa-router'
import LoginControllers from './login.controllers'

const router = new Router();

router.post('/login', LoginControllers.login)
router.post('/register', LoginControllers.register)

export default router
