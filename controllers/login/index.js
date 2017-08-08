const router = require('koa-router')();
const login = require('./login');

// 前台路由
router.get('/login', login.frontLogin);
router.get('/register', login.frontRegister);

// 后台路由
router.get('/api/login', login.login);

module.exports = router;