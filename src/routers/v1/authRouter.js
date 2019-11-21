const Router = require('@koa/router');
const config = require('../../config')();
const AuthController = require('../../controllers/AuthController');
const { validateRegistration, validateLogin } = require('../../middlewares/userValidation');


const router = new Router({
  prefix: `${config.API_URL}/${config.API_VERSION}`,
});

router.post('/register', validateRegistration(), AuthController.register);
router.post('/login', validateLogin(), AuthController.login);

module.exports = router;
