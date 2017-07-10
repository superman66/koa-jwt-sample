const render = require('./lib/render');
const Router = require('koa-router');
const Koa = require('koa');
const KoaBody = require('koa-body');

const app = new Koa();
const router = new Router();

const posts = [];

// middleware
app.use(render);
app.use(KoaBody());


// router definitions

router.get('/', list);

app.use(router.routes());

async function list(ctx) {
    await ctx.render('list', {posts: posts})
}

if(!module.parent) app.listen(3002);