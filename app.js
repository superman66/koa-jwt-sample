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

/**
 * handling 404
 */
app.use(async function pageNotFound(ctx) {
    ctx.status = 404;
    switch (ctx.accepts('html', 'json')) {
        case 'html':
            ctx.type = 'html';
            ctx.body = '<p>Page Not Found</p>'
            break;
        case 'json':
            ctx.body = {
                message: 'Page Not Found'
            };
            break;
        default:
            ctx.type = 'text';
            ctx.body = 'Page Not Found';
    }
});

async function list(ctx) {
    await ctx.render('list', { posts: posts })
}

if (!module.parent) app.listen(3002);