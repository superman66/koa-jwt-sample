const Router = require('koa-router')();
const books = require('./controllers/book');

module.exports = function(app){
    Router.redirect('/', '/book')
    Router.use('/book', books.routes())
    app.use(Router.routes())
};