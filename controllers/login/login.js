const router = require('koa-router')();


exports.login = async (ctx) => {
    console.log(ctx.request.username, ctx.request.password);
}

exports.register = async (ctx) => {

}

exports.frontLogin = async (ctx) => {
    await ctx.render('login/login')
}

exports.frontRegister = async (ctx) => {
    await ctx.render('login/register');
}
