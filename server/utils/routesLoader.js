
/**
 * https://github.com/jsnomad/koa-restful-boilerplate/blob/master/server/utils/routesLoader.js
 **/
import glob from 'glob'

export default function (dirname) {
  return new Promise((resolve, reject) => {
    const routes = [];
    glob(`${dirname}/**/*.js`, {
      ignore: '**/index.js',
    }, (err, files) => {
      if (err) {
        return reject(err)
      }
      files.forEach((file) => {
        const route = require(file) // eslint-disable-line global-require, import/no-dynamic-require
        routes.push(route)
      })
      return resolve(routes)
    })
  })
}
