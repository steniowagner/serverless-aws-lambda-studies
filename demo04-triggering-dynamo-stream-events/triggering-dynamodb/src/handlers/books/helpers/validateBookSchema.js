const Joi = require("@hapi/joi");

const bookSchemaValidator = () => {
  return Joi.object({
    title: Joi.string().max(100).min(2).required(),
    isbn: Joi.string().max(14).required(),
  });
};

module.exports = bookSchemaValidator;
