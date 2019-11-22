const jwt = require('jsonwebtoken');
const config = require('../config')();
const UserDao = require('../dao/UserDao');
const { authError } = require('../utils/errorHelpers');


const authenticate = async (ctx, next) => {
  try {
    const { authorization } = ctx.header;

    if (!authorization) {
      authError(ctx);
    }

    const tokenArray = authorization.split(' ');
    if (!tokenArray || tokenArray.length !== 2) {
      authError(ctx);
    }

    const [prefix, token] = tokenArray;
    if (prefix !== config.TOKEN_PREFIX) {
      authError(ctx);
    }

    const decoded = jwt.verify(token, config.SECRET);

    const { id } = decoded.data;

    const user = await UserDao.findUser({ _id: UserDao.ObjectId(id) });
    if (!user) {
      authError(ctx);
    }
    ctx.state.user = user;
  } catch (error) {
    authError(ctx);
  }
  return next();
};

module.exports = authenticate;
