const { Joi, itemTypes, validate } = require('../utils/validator');


const validateId = () => validate({
  schema: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
  itemType: itemTypes.params,
});

module.exports = { validateId };
