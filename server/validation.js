const joi = require("joi");

const registrationValidation = (data) => {
  const schema = joi.object({
    username: joi.string().min(6).max(255).required(),
    firstName: joi.string().max(255).required(),
    lastName: joi.string().max(255).required(),
    email: joi
      .string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: joi.string().min(6).max(255).required(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = joi.object({
    username: joi.string().min(6).max(255).required(),
    password: joi.string().min(6).max(255).required(),
  });

  return schema.validate(data);
};

const postValidation = (data) => {
  const schema = joi.object({
    title: joi.string().max(255).required(),
    description: joi.string().required(),
  });

  return schema.validate(data);
};

module.exports.registrationValidation = registrationValidation;
module.exports.loginValidation = loginValidation;
module.exports.postValidation = postValidation;
