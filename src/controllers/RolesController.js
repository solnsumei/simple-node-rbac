const autoBind = require('auto-bind');
const RoleDao = require('../dao/RoleDao');
const { notFoundError } = require('../utils/errorHelpers');


class RolesController {
  constructor() {
    this.roleDao = RoleDao;
    autoBind(this);
  }

  async fetchAllRoles(ctx) {
    try {
      const roles = await this.roleDao.find({}, { lean: true });

      ctx.body = {
        message: 'Roles fetched successfully',
        roles,
      };
    } catch (error) {
      throw error;
    }
  }

  async fetchRole(ctx) {
    const { id } = ctx.params;
    try {
      const role = await this.roleDao.findOne({ _id: this.roleDao.ObjectId(id) });

      if (!role) {
        notFoundError(ctx);
      }

      ctx.body = {
        message: 'Role fetched successfully',
        role,
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new RolesController();
