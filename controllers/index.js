const router = require('koa-router')();
const books = require('./books');

// 前台路由
router.get('/', books.list);
router.get('/post/:id', books.article);

module.exports = router;