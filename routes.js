const Router = require('koa-router')();
const books = require('./controllers/book');
const login = require('./controllers/login');

module.exports = function(app){
    Router.redirect('/', '/book')
    Router.use('/book', books.routes())
    Router.use('', login.routes())
    app.use(Router.routes())
};