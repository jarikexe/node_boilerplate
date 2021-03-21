const User = require('../models/User');
const bcrypt = require('bcrypt');
const _ = require('lodash');

module.exports.setUser = async function(req, res){
  const user = await User.findOne({email: req.body.email});
  if(user) return res.status(400).send('User already register');
  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(req.body.password, salt);
  const userNew = new User({
    email: req.body.email,
    password: passwordHash,
  })

  await userNew.save()
  res.status(201).send(_.pick(userNew, ['_id', 'email']))
}

module.exports.getMe = async function(req, res) {
  const user = await User.findById(req.user.id).select('-password');
  res.send(user);
}