import Router from 'koa-router'
import UserController from './user.controller'

const router = new Router();

router.get('/', UserController.getUsers)

export default router
