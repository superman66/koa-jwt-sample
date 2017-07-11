const monk = require('monk');

const posts = [{
    id: 1,
    title: 'first post title'
}];

exports.list = async function (ctx) {
    await ctx.render('list', { posts: posts })
}

exports.article = async (ctx) => {
    const post = posts.filter((post) => 
        post.id == ctx.params.id
    )[0];
    await ctx.render('article', { post: post })
}

