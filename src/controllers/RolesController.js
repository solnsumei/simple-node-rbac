const autoBind = require('auto-bind');
const RoleDao = require('../dao/RoleDao');
const { notFoundError, duplicateError } = require('../utils/errorHelpers');


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

  async addRole(ctx) {
    const { name, permissions } = ctx.request.body;
    try {
      const role = await this.roleDao.create({ name, permissions });

      ctx.body = {
        message: 'Role saved successfully',
        role,
      };
    } catch (error) {
      duplicateError(ctx, error, 'name');
      throw error;
    }
  }

  async updateRole(ctx) {
    const { id } = ctx.params;
    const { name, permissions } = ctx.request.body;

    const updateParams = {};

    if (name) {
      updateParams.name = name;
    }

    if (permissions) {
      updateParams.permissions = permissions;
    }

    try {
      const role = await this.roleDao.findOneAndUpdate(
        { _id: this.roleDao.ObjectId(id) },
        { ...updateParams },
        { new: true },
      );

      if (!role) {
        notFoundError(ctx);
      }

      ctx.body = {
        message: 'Role updated successfully',
        role,
      };
    } catch (error) {
      duplicateError(ctx, error, 'name');
      throw error;
    }
  }

  async deleteRole(ctx) {
    const { id } = ctx.params;
    try {
      const deleted = await this.roleDao.deleteOne({ _id: this.roleDao.ObjectId(id) });

      if (deleted.deletedCount === 0) {
        notFoundError(ctx);
      }

      ctx.body = {
        message: 'Role deleted successfully',
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new RolesController();
