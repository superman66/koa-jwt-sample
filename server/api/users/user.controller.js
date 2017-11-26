import mongoose from 'mongoose'


const User = mongoose.model('User')

class UserController {
  async getUsers(ctx) {
    const users = await User.find()
    ctx.body = {
      users,
    }
  }
}

export default new UserController()
