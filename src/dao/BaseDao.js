const { Types } = require('mongoose');

class BaseDao {
  constructor(model) {
    this.model = model;
    this.ObjectId = Types.ObjectId;
  }

  async create(payload) {
    return this.model.create(payload);
  }

  async insertMany(payload) {
    return this.model.insertMany(payload);
  }

  async findById(id, options = {}) {
    return this.model.findById(id, '-__v', options);
  }

  async findOne(condition, options = {}) {
    return this.model.findOne(condition, '-__v', options);
  }

  async find(condition = {}, options = {}) {
    return this.model.find(condition, '-__v', options);
  }

  async findOneAndUpdate(condition, payload, options = {}) {
    return this.model.findOneAndUpdate(
      condition,
      payload,
      options,
    );
  }

  async updateMany(condition = {}, payload, options = {}) {
    return this.model.updateMany(
      condition,
      payload,
      options,
    );
  }

  async deleteOne(condition) {
    return this.model.deleteOne(condition);
  }

  async deleteMany(condition) {
    return this.model.deleteMany(condition);
  }
}

module.exports = BaseDao;
