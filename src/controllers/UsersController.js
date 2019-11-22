const autoBind = require('auto-bind');
const UserDao = require('../dao/UserDao');
const { notFoundError } = require('../utils/errorHelpers');


class UsersController {
  constructor() {
    this.userDao = UserDao;
    autoBind(this);
  }

  /**
   * Fetch all users
   * @param {Object} ctx
   */
  async fetchAllUsers(ctx) {
    try {
      const users = await this.userDao.findUsers({});

      ctx.body = {
        message: 'Users fetched successfully',
        users,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
  * Fetch a single user
  * @param {Object} ctx
  */
  async fetchUser(ctx) {
    const { id } = ctx.params;
    try {
      const user = await this.userDao.findUser({ _id: this.userDao.ObjectId(id) });

      if (!user) {
        notFoundError(ctx);
      }

      ctx.body = {
        message: 'User fetched successfully',
        user,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update user role
   * @param {Object} ctx
   */
  async updateRole(ctx) {
    const { id } = ctx.params;
    const { roles } = ctx.request.body;
    try {
      const user = await this.userDao.findOneAndUpdate(
        { _id: this.userDao.ObjectId(id) },
        { roles },
        { new: true },
      );

      if (!user) {
        notFoundError(ctx);
      }

      ctx.body = {
        message: 'User\'s role updated successfully',
        user,
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UsersController();
