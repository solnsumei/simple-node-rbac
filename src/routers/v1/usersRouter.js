const Router = require('@koa/router');
const config = require('../../config')();
const UsersController = require('../../controllers/UsersController');
const auth = require('../../middlewares/auth');
const checkPermissions = require('../../middlewares/checkPermission');
const { permissions } = require('../../utils/permissions');
const { validateId } = require('../../middlewares/common');


const router = new Router({
  prefix: `${config.API_URL}/${config.API_VERSION}/users`,
});

router.use(auth);

router.get('/:id',
  validateId(),
  checkPermissions(permissions.CAN_VIEW_USER),
  UsersController.fetchUser);

router.get('/', checkPermissions([
  permissions.CAN_VIEW_USER,
  permissions.CAN_CREATE_USER,
]), UsersController.fetchAllUsers);

router.put('/:id/assign-role', checkPermissions([
  permissions.CAN_VIEW_USER,
  permissions.CAN_UPDATE_USER,
  permissions.CAN_ASSIGN_ROLE,
]), UsersController.updateRole);

module.exports = router;
