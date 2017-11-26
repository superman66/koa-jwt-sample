import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: String,
  password: String,
})

UserSchema
  .virtual('userInfo')
  .get(function() {
    return {
      username: this.username,
    }
  })


const User = mongoose.model('User', UserSchema)
export default User
