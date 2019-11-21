const BaseDao = require('./BaseDao');
const User = require('../models/User');


class UserDao extends BaseDao {
  async getUserWithPermissions({ condition = {}, limit = null, sort = { name: 1 } }) {
    try {
      let limitValue;

      if (limit && typeof limit === 'number') {
        const limitInt = Number.parseInt(limit, 10);
        if (limitInt > 0) {
          limitValue = limitInt;
        }
      }

      return this.model.aggregate([
        { $match: condition },
        {
          $lookup: {
            from: 'roles',
            localField: 'roles',
            foreignField: 'name',
            as: 'userRoles',
          },
        },
        {
          $addFields: {
            permissions: {
              $reduce: {
                input: '$userRoles.permissions',
                initialValue: [],
                in: {
                  $concatArrays: ['$$value', '$$this'],
                },
              },
            },
          },
        },
        {
          $project: {
            userRoles: 0, __v: 0, password: 0,
          },
        },
        { $sort: sort },
        { $limit: limitValue || 200 },
      ]);
    } catch (error) {
      throw error;
    }
  }

  async findUser(condition) {
    try {
      const docArray = await this.getUserWithPermissions({
        condition,
        limit: 1,
      });

      if (docArray.length === 0) {
        return undefined;
      }

      return docArray[0];
    } catch (error) {
      throw error;
    }
  }

  async findUsers({
    condition,
    sort,
    limit,
  }) {
    try {
      return this.getUserWithPermissions({
        condition,
        sort,
        limit,
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserDao(User);
