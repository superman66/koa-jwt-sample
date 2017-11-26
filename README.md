# koa 实现 jwt 认证
关于 Token 认证机制，这里不做更多解释。不清楚的可以看我的这篇文章：[Web开发中常见的认证机制](https://chenhuichao.com/2017/03/13/fe/web-auth/)

## 所需库
- bcrypt - 用于加密密码
- koa-jwt - jwt 中间件
- jsonwebtoken - 用于生成token下发给浏览器，在 koa2 以后的版本不再提供 jsonwebtoken 的方法,所以需要另行安装。
## 实现思路
整个方案实现的流程和思路很清晰，大致分为下面几步：
- 自定义 401 拦截中间件，用于拦截 token 不存在或者失效的情况
- 配置 koa-jwt
- 注册实现
- 登录实现

## 运行项目
该项目需要你已经装好 mongodb，并启动。关于 mongodb 的配置见 `config/index.js`。
```
npm run start
```
该项目提供了三个 api
- /api/register
- /api/login
- /api/users

其中 `/api/register` 和 `/api/login` 为 public api，无需token就能访问。`/users` 则为 private api，需要传入正确的 token 才能访问。
### 自定义 401 handler
使用了 `koa-jwt` 中间件后，如果没有token，或者token失效，该中间件会给出对应的错误信息。如果没有自定义中间件的话，会直接将 `koa-jwt` 暴露的错误信息直接返回给用户。

```js
// server/middlewares/errorHandle.js
export default errorHandle = (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        error: err.originalError ? err.originalError.message : err.message,
      };
    } else {
      throw err;
    }
  });
}
```
然后在 `index.js` 中使用该中间件
```js
app
  .use(errorHandle)
```
### 使用 koa-jwt
在 `index.js` 中加入 `koa-jwt` 中间件。
```js
const secert = 'jwt_secret'
  app
  .use(jwt({
    secret,
  }).unless({
    path: [/\/register/, /\/login/],
  }))
```
其中 `secret` 是用于加密的key，不局限于字符串，也可以是一个文件。

```js
// https://github.com/koajs/jwt#token-verification-exceptions
var publicKey = fs.readFileSync('/path/to/public.pub');
app.use(jwt({ secret: publicKey }));
```
`unless()` 用于设置哪些 api 是不需要通过 token 验证的。也就是我们通常说的 public api，无需登录就能访问的 api。在这个例子中，设置了 `/register` 和 `/login` 两个 api 无需 token 检查。

在使用 `koa-jwt` 后，所有的路由（除了 `unless()` 设置的路由除外）都会检查 `Header` 首部中的  token，是否存在、是否有效。只有正确之后才能正确的访问。

### 注册实现
注册很简单，这里只是简单的将密码加密，将信息存入数据库。实际项目中，还需要对用户输入的字段进行验证。
```js
  /**
   * you can register with
   * curl -X POST http://localhost:3200/api/register  -H 'cache-control: no-cache' -H 'content-type: application/x-www-form-urlencoded'  -d 'username=superman2&password=123456'
   */
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
```

### 登录实现
用户输入用户名和密码登录，如果用户名和密码正确的话，使用 `jsonwebtoken.sign()` 生成 token，并返回给客户端。客户端将token存储在本地存储，在每次的 HTTP 请求中，都将 token 添加在 HTTP Header `Authorazition: Bearer token` 中。然后后端每次去验证该token的正确与否。只有token正确后才能访问到对应的资源。

```js
  /** you can login with
   * curl -X POST http://localhost:3200/api/login/ -H 'cache-control: no-cache' -H 'content-type: application/x-www-form-urlencoded' -d 'username=superman2&password=123456'
   */
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
      // 匹配密码是否相等
      if (await bcrypt.compare(body.password, user.password)) {
        ctx.status = 200
        ctx.body = {
          message: '登录成功',
          user: user.userInfo,
          // 生成 token 返回给客户端
          token: jsonwebtoken.sign({
            data: user,
            // 设置 token 过期时间
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
```

需要注意的是，在使用 `jsonwebtoken.sign()` 时，需要传入的 `secret` 参数，这里的 `secret` 必须要与 前面设置  `jwt()` 中的 `secret` 一致。

更多关于 `jsonwebtoken` 的方法，可见：[https://github.com/auth0/node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

在登录后，拿着返回的 token，这时候去访问 `/api/users`，就能正确获得用户列表。

```
curl -X GET http://localhost:3200/api/users -H 'authorization: Bearer token' -H 'cache-control: no-cache'
```

