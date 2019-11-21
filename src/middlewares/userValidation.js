const { Joi, itemTypes, validate } = require('../utils/validator');

const email = Joi.string().email().required();

const validateRegistration = () => validate({
  schema: Joi.object({
    email,
    name: Joi.string().min(2).max(30).required(),
    password: Joi.string().min(6).max(80).required(),
  }),
  itemType: itemTypes.body,
});

const validateLogin = () => validate({
  schema: Joi.object({
    email,
    password: Joi.string().required(),
  }),
  itemType: itemTypes.body,
});

module.exports = {
  validateRegistration,
  validateLogin,
};
