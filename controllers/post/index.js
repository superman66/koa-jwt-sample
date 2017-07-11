const router = require('koa-router')();
const books = require('./post');

// 前台路由
router.get('/', books.list);
router.get('/:id', books.article);

module.exports = router;