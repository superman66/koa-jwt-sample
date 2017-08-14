class LoginControllers {
  async login(ctx) {
    try {
      console.log(ctx.request.body);
      if (ctx.request.body.username === 'admin' && ctx.request.body.password === '123456') {
        ctx.body = {
          message: '登录成功',
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
}

export default new LoginControllers();
