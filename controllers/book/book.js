const db = require('../../connect');
const library = db.get('db');


exports.list = async (ctx) => {
    // if('GET' != this.method) return await next;
    // this.body = await render('list', {
    //     books: await library.find({})
    // })
    await ctx.render('book/list', {
        books:  await library.find({})
    })
}

exports.book = async (ctx) => {
    await ctx.render('book/book', { 
        book: await library.findOne({_id: ctx.params.id})
     })
}

