const monk = require('monk');

const posts = [{
    id: 1,
    title: 'first post title'
}];

exports.list = async function (ctx) {
    await ctx.render('list', { posts: posts })
}

exports.article = async (id, ctx) => {
    const post = posts.filter((post) => {
        post.id === id
    });
    await ctx.render('article', { post: post })
}

