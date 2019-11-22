const Router = require('@koa/router');
const config = require('../../config')();
const RolesController = require('../../controllers/RolesController');
const auth = require('../../middlewares/auth');
const checkPermissions = require('../../middlewares/checkPermission');
const { permissions } = require('../../utils/permissions');
const { validateId } = require('../../middlewares/common');
const { validateAddRole, validateUpdateRole } = require('../../middlewares/roleValidation');


const router = new Router({
  prefix: `${config.API_URL}/${config.API_VERSION}/roles`,
});

router.use(auth);

router.get('/:id',
  validateId(),
  checkPermissions(permissions.CAN_VIEW_ROLE),
  RolesController.fetchRole);

router.put('/:id',
  validateId(),
  validateUpdateRole(),
  checkPermissions(permissions.CAN_UPDATE_ROLE),
  RolesController.updateRole);

router.delete('/:id',
  validateId(),
  checkPermissions(permissions.CAN_DELETE_ROLE),
  RolesController.deleteRole);

router.get('/', checkPermissions([
  permissions.CAN_VIEW_ROLE,
  permissions.CAN_CREATE_ROLE,
]), RolesController.fetchAllRoles);

router.post('/',
  validateAddRole(),
  checkPermissions(permissions.CAN_CREATE_ROLE),
  RolesController.addRole);

module.exports = router;
