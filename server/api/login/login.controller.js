import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
// ensure import UserModel before use model('user')
import UserModel from '../../models/User.model'
import { secret } from '../../config/index';


const User = mongoose.model('User');

class LoginController {
  async login(ctx) {
    const { body } = ctx.request
    try {
      const user = await User.findOne({ username: body.username });
      if (!user) {
        ctx.status = 401
        ctx.body = {
          message: '用户名错误',
        }
        return;
      }
      if (await bcrypt.compare(body.password, user.password)) {
        ctx.status = 200
        ctx.body = {
          message: '登录成功',
          user: user.userInfo,
          token: jsonwebtoken.sign({
            data: user,
            exp: Math.floor(Date.now() / 1000) + (60 * 60), // 60 seconds * 60 minutes = 1 hour
          }, secret),
        }
      } else {
        ctx.status = 401
        ctx.body = {
          message: '密码错误',
        }
      }
    } catch (error) {
      ctx.throw(500)
    }
  }

  async register(ctx) {
    const { body } = ctx.request;
    try {
      if (!body.username || !body.password) {
        ctx.status = 400;
        ctx.body = {
          error: `expected an object with username, password but got: ${body}`,
        }
        return;
      }
      body.password = await bcrypt.hash(body.password, 5)
      let user = await User.find({ username: body.username });
      if (!user.length) {
        const newUser = new User(body);
        user = await newUser.save();
        ctx.status = 200;
        ctx.body = {
          message: '注册成功',
          user,
        }
      } else {
        ctx.status = 406;
        ctx.body = {
          message: '用户名已经存在',
        }
      }
    } catch (error) {
      ctx.throw(500)
    }
  }

}

export default new LoginController();
