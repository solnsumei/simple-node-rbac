const bycrypt = require('bcrypt');
const logger = require('pino')();
const config = require('../config')();

const connectDb = require('../lib/db');
const PermissionDao = require('../dao/PermissionDao');
const RoleDao = require('../dao/RoleDao');
const UserDao = require('../dao/UserDao');

const defaultPermissions = [
  { name: 'permission-create' },
  { name: 'permission-read' },
  { name: 'permission-update' },
  { name: 'permission-delete' },
  { name: 'role-create' },
  { name: 'role-read' },
  { name: 'role-update' },
  { name: 'role-delete' },
  { name: 'user-create' },
  { name: 'user-read' },
  { name: 'user-update' },
  { name: 'user-delete' },
];

const defaultRoles = [
  'superAdmin',
];

const seedPermissions = async (permissions) => {
  try {
    await PermissionDao.insertMany(permissions);
    logger.info('Permissions seeded successfully');
  } catch (error) {
    logger.error(error.message);
  }
};

const seedRoles = async () => {
  try {
    const storedPermissions = await PermissionDao.find({});

    const permissionIds = storedPermissions.map((permission) => permission.id);

    await RoleDao.create({
      name: defaultRoles[0],
      permissions: permissionIds,
    });

    logger.info('Roles seeded successfully');
  } catch (error) {
    logger.error(error.message);
  }
};

const seedAdmin = async () => {
  try {
    const storedRoles = await RoleDao.find({});

    const roleIds = storedRoles.map((role) => role.id);

    const password = await bycrypt.hash('admin', 10);

    const admin = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password,
      roles: roleIds,
    };

    await UserDao.create(admin);

    logger.info('Admin seeded successfully');
  } catch (error) {
    logger.error(error.message);
  }
};

const seedDefaultData = async () => {
  connectDb({ config, logger });
  await PermissionDao.deleteMany({});
  await RoleDao.deleteMany({});
  await UserDao.deleteMany({});

  logger.info('Models deleted');

  await seedPermissions(defaultPermissions);
  await seedRoles();
  await seedAdmin();
};

seedDefaultData()
  .then(() => {
    logger.info('Data seeded successfully.');
    process.exit();
  })
  .catch((error) => {
    logger.error(error.message);
    process.exit();
  });
