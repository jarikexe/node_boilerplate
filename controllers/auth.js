import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const auth = async function(req, res){
  console.log(req.t);
  const {email, password} = req.body;
  let user = await User.findOne({email})
  if(!user) return res.status(400).send(req.t('Errors.wrongLoginOrPassword'))
  const result = await bcrypt.compare(password, user.password);
  if(!result) return res.status(400).send(req.t('Errors.wrongLoginOrPassword'));
  const token = user.generateAuthTocken();
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type,Authorization',
    'Access-Control-Expose-Headers': 'X-Requested-With,content-type, Authorization'
  });
  res.header('Authorization', `Bearer ${token}`)
  .send(user);
} 