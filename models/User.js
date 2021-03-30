import mongoos from 'mongoose'
import jwt from 'jsonwebtoken'
import config from 'config'

const UserSchema = new mongoos.Schema({
  email: {
    type: String,
    minLength:5,
    maxLength:25,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minLength:5,
    maxLength:1024,
    required: true
  },
})

UserSchema.methods.generateAuthTocken = function() {
  return jwt.sign({id: this._id}, config.get('jwtPrivat'))
}

const User = mongoos.model('User', UserSchema);

export default User;