const User = require('../models/User');
const bcrypt = require('bcrypt');


module.exports.auth = async function(req, res){
  const {email, password} = req.body;
  let user = await User.findOne({email})
  if(!user) return res.status(400).send('Email or password is incorrect')
  if(!bcrypt.compare(password, user.password)) return res.status(400).send('Email or password is incorrect')
  const token = user.generateAuthTocken();
  res.header('x-auth-token', token).send(user);
} 