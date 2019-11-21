const duplicateError = (ctx, error, field) => {
  if (error.code === 11000 && error.name === 'MongoError') {
    ctx.throw(409, `Item with this ${field} already exists.`);
  }
};

const loginError = (ctx) => {
  ctx.throw(401, 'Email and/or password is incorrect.');
};

const notFoundError = (ctx) => {
  ctx.throw(404, 'Resource not found.');
};

const authError = (ctx) => {
  ctx.throw(401, 'Unauthorized user');
};

const permissionError = (ctx) => {
  ctx.throw(403, 'You do not have permission to perform this operation.');
};

module.exports = {
  duplicateError,
  loginError,
  authError,
  permissionError,
  notFoundError,
};
