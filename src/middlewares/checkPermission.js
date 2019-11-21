const { permissionError } = require('../utils/errorHelpers');


const checkPermissions = (permissions) => async (ctx, next) => {
  let permissionArray;

  try {
    if (Array.isArray(permissions)) {
      permissionArray = [...permissions];
    }

    if (typeof permissions === 'string') {
      permissionArray = [permissions];
    }

    ctx.assert(Array.isArray(permissionArray), 500);

    const { user } = ctx.state;

    if (!user || (user.permissions.length === 0 && user.assignedPermissions.length === 0)) {
      permissionError();
    }

    const { permissions: rolePermissions, assignedPermissions } = user;

    if (rolePermissions.length === 0 && assignedPermissions.permissions.length === 0) {
      permissionError();
    }

    // Check if permission passed in is in user assigned permissions or user's role permissions
    if (!permissionArray.every((permission) => (rolePermissions
      .includes(permission) || assignedPermissions.includes(permission)))) {
      permissionError();
    }

    return next();
  } catch (error) {
    throw error;
  }
};

module.exports = checkPermissions;
