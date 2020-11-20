// Validation
const Joi = require('@hapi/joi')

// Register Validation
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required(),
    department: Joi.string()
      .min(2)
      .required(),
    position: Joi.string()
      .min(2)
      .required()
  })
  return schema.validate(data)
}

// Login Validation
const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()

  })
  return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
