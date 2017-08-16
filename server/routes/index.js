import routesLoader from '../utils/routesLoader'

export default function (app) {
  // app
  // .use(login.routes())
  routesLoader(`${__dirname}`).then((files) => {
    files.forEach((route) => {
      app
        .use(route.routes())
        .use(route.allowedMethods({
          throw: true,
        }))
    })
  })
}
