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

  async findById(id, options = {}, fields = '-__v') {
    return this.model.findById(id, fields, options);
  }

  async findOne(condition, options = {}, fields = '-__v') {
    return this.model.findOne(condition, fields, options);
  }

  async find(condition = {}, options = {}, fields = '-__v') {
    return this.model.find(condition, fields, options);
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
