const BaseDao = require('./BaseDao');
const role = require('../models/Role');


class RoleDao extends BaseDao {

}

module.exports = new RoleDao(role);
