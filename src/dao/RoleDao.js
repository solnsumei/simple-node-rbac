const BaseDao = require('./BaseDao');
const Role = require('../models/Role');


class RoleDao extends BaseDao {

}

module.exports = new RoleDao(Role);
