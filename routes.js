const Router = require('koa-router')();
const books = require('./controllers/book');

module.exports = function(app){
    Router.use('/book', books.routes())
    app.use(Router.routes())
};