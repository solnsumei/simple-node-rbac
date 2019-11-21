const autoBind = require('auto-bind');
const UserDao = require('../dao/UserDao');
const { hash, verify } = require('../utils/encryption');
const issueToken = require('../utils/jwt');
const { duplicateError, loginError } = require('../utils/errorHelpers');

class AuthController {
  constructor() {
    this.userDao = UserDao;
    this.id = 24;
    autoBind(this);
  }

  async register(ctx) {
    const { name, email, password } = ctx.request.body;
    try {
      const hashedPassword = await hash(password);
      const user = await this.userDao.create({
        name,
        email,
        password: hashedPassword,
      });

      ctx.status = 201;
      ctx.body = {
        message: 'User created successfully',
        user,
      };
    } catch (error) {
      duplicateError(ctx, error, 'email');
      throw error;
    }
  }

  /**
   * Login user
   * @param {object} ctx
   */
  async login(ctx) {
    const { email, password } = ctx.request.body;
    try {
      const user = await this.userDao.findOne({ email });

      if (!user) {
        loginError(ctx);
      }

      const verified = await verify(password, user.password);
      if (!verified) {
        loginError(ctx);
      }

      const token = issueToken({
        id: user.id,
        email: user.email,
      });

      ctx.body = {
        message: 'User logged in successfully',
        user: { ...user.toJSON(), token },
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AuthController();
