const Router = require('koa-router')();
const books = require('./controllers/post');

module.exports = function(app){
    Router.use('/post', books.routes())
    app.use(Router.routes())
};