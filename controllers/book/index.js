const router = require('koa-router')();
const books = require('./book');

// 前台路由
router.get('/', books.list);
router.get('/:id', books.book);

module.exports = router;