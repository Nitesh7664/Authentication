const joi = require("@hapi/joi");

const registerValidation = ({ name, email, password }) => {
  const schema = joi.object({
    name: joi.string().min(5).max(255).required(),
    email: joi.string().min(6).max(255).email().required(),
    password: joi.string().min(6).max(255).required(),
  });

  return schema.validate({ name, email, password });
};

const loginValidation = ({ email, password }) => {
  const schema = joi.object({
    email: joi.string().min(5).max(255).required(),
    password: joi.string().min(6).max(255).required(),
  });

  return schema.validate({ email, password });
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
