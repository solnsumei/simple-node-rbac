const { Schema, model } = require('mongoose');
const mongooseHidden = require('mongoose-hidden')({ defaultHidden: { __v: true } });


class BaseSchema extends Schema {
  useMongooseHidden() {
    this.plugin(mongooseHidden);
  }
}

module.exports = { BaseSchema, model };
