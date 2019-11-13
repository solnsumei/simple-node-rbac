const BaseDao = require('./BaseDao');
const user = require('../models/User');


class UserDao extends BaseDao {

}

module.exports = new UserDao(user);
