const Joi = require('joi');

module.exports.userValidation = function(req, res, next) {
  const userSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .min(5)
        .max(30)
        .required(),
    password: Joi.string()
        .min(8),
  });
  const {value, error} = userSchema.validate(req.body);
  if(error) return res.status(400).send(error.message);
  req.body = value;
  next();
}