const BaseDao = require('./BaseDao');
const permission = require('../models/Permission');


class PermissionDao extends BaseDao {

}

module.exports = new PermissionDao(permission);
