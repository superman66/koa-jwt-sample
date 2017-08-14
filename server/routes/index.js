import routesLoader from '../utils/routesLoader'
import { login } from './login'

export default function (app) {
  app
  .use(login.routes())
}
