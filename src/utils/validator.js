const Joi = require('@hapi/joi');


// validate function based off joi validation
module.exports = {
  Joi,
  itemTypes: {
    body: 'body',
    params: 'params',
    query: 'query',
  },
  validate: ({ itemType, schema, opt }) => async (ctx, next) => {
    ctx.assert(itemType, 400);
    ctx.assert(schema, 400);

    const requestToValidate = itemType === 'body' ? ctx.request.body : ctx[itemType];
    const options = { ...opt, allowUnknown: true, abortEarly: false };

    const result = schema.validate(requestToValidate, { ...options });
    if (!result.error) {
      return next();
    }

    // map through and extract error messages
    const errors = {};
    result.error.details
      .forEach((e) => {
        errors[e.context.key] = e.message.replace(/"/g, '');
      });

    ctx.status = 400;
    ctx.body = {
      errors,
    };
    return ctx.app.emit('error', errors, ctx);
  },
};
