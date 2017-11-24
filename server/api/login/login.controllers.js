import mongoose from 'mongoose'
import UserModel from '../../models/User.model'

const User = mongoose.model('User');

class LoginControllers {
  async login(ctx) {
    const { body } = ctx.request
    try {
      const user = await User.find({ username: body.username, password: body.password });
      if (user.length) {
        ctx.status = 200;
        ctx.body = {
          message: '登录成功',
          user,
        }
      } else {
        ctx.body = {
          message: '用户名或者密码错误',
        }
      }
    } catch (error) {
      ctx.throw(500)
    }
  }

  async register(ctx) {
    const { body } = ctx.request;
    try {
      const newUser = new User(body);
      const user = await newUser.save();
      ctx.status = 200;
      ctx.body = {
        message: '注册成功',
        user,
      }
    } catch (error) {
      ctx.throw(500)
    }
  }

}

export default new LoginControllers();
