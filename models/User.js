const mongoos = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('config')

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

module.exports = User;