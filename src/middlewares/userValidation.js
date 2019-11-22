const { Joi, itemTypes, validate } = require('../utils/validator');
const RoleDao = require('../dao/RoleDao');

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

const validateUserRole = () => async (ctx) => {
  const roles = await RoleDao.find({}, { lean: true }, 'name');

  if (!roles || roles.length === 0) {
    ctx.throw(409, 'You need to add roles first before assigning to users.');
  }

  const roleValues = roles.map((role) => role.name);

  return validate({
    schema: Joi.object({
      roles: Joi.array().items(Joi.string().valid(...roleValues))
        .unique().required(),
    }),
    itemType: itemTypes.body,
  });
};

module.exports = {
  validateRegistration,
  validateLogin,
  validateUserRole,
};
