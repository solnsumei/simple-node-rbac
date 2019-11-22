const userPermissions = {
  CAN_CREATE_OWN_POST: 'own-post-create',
  CAN_VIEW_POST: 'post-view',
  CAN_UPDATE_OWN_POST: 'own-post-update',
  CAN_DELETE_OWN_POST: 'own-post-delete',
};

const adminPermissions = {
  ...userPermissions,
  CAN_CREATE_USER: 'user-create',
  CAN_VIEW_USER: 'user-view',
  CAN_UPDATE_USER: 'user-update',
  CAN_DELETE_USER: 'user-delete',
};

const permissions = {
  ...adminPermissions,
  // Role permissions
  CAN_CREATE_ROLE: 'role-create',
  CAN_VIEW_ROLE: 'role-view',
  CAN_UPDATE_ROLE: 'role-update',
  CAN_DELETE_ROLE: 'role-delete',
  CAN_ASSIGN_ROLE: 'role-assign',
  CAN_ASSIGN_USER_PERMISSION: 'user-permission-assignment',
};

module.exports = {
  permissions,
  adminPermissions,
  userPermissions,
};
