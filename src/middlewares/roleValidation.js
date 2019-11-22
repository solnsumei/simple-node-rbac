const { Joi, itemTypes, validate } = require('../utils/validator');
const { permissions } = require('../utils/permissions');

const validPermissions = Object.values(permissions);

const validateAddRole = () => validate({
  schema: Joi.object({
    name: Joi.string().min(3).max(50).required(),
    permissions: Joi.array().items(Joi.string().valid(...validPermissions))
      .unique().required(),
  }),
  itemType: itemTypes.body,
});

const validateUpdateRole = () => validate({
  schema: Joi.object({
    name: Joi.string().min(3).max(50),
    permissions: Joi.array().items(Joi.string().valid(...validPermissions))
      .unique(),
  }),
  itemType: itemTypes.body,
});

module.exports = {
  validateAddRole,
  validateUpdateRole,
};
