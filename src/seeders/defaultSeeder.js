const bycrypt = require('bcrypt');
const logger = require('pino')();
const config = require('../config')();

const connectDb = require('../lib/db');
const RoleDao = require('../dao/RoleDao');
const UserDao = require('../dao/UserDao');
const { adminPermissions, permissions } = require('../utils/permissions');


const defaultRoles = [
  'superAdmin',
  'admin',
];

const seedRoles = async () => {
  try {
    await RoleDao.create([{
      name: defaultRoles[0],
      permissions: Object.values(permissions),
    }, {
      name: defaultRoles[1],
      permissions: Object.values(adminPermissions),
    }]);

    logger.info('Roles seeded successfully');
  } catch (error) {
    throw error;
  }
};

const seedAdmin = async () => {
  try {
    const storedRoles = await RoleDao.find({});

    const roles = storedRoles.map((role) => role.name);

    const password = await bycrypt.hash(config.ADMIN_PASSWORD, 10);

    const admin = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password,
      roles,
    };

    await UserDao.create(admin);

    logger.info('Admin seeded successfully');
  } catch (error) {
    throw error;
  }
};

const seedDefaultData = async () => {
  try {
    connectDb({ config, logger });
    await RoleDao.deleteMany({});
    await UserDao.deleteMany({});

    logger.info('Models deleted');
    await seedRoles();
    await seedAdmin();
  } catch (error) {
    throw error;
  }
};

seedDefaultData()
  .then(() => {
    logger.info('Data seeded successfully.');
    process.exit();
  })
  .catch((error) => {
    logger.error(`Seeding failed: ${error.message}`);
    process.exit();
  });
