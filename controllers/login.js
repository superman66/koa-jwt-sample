const router = require('koa-router')();

const login = async (ctx) => {
    await ctx.render('login/login')
}

const register = async (ctx) => {
    await ctx.render('login/register');
}

// 前台路由
router.get('/login', login);
router.get('/register', register);

module.exports = router;