const { BaseSchema, model } = require('./BaseSchema');
const { permissions } = require('../utils/permissions');


const roleSchema = new BaseSchema({
  name: {
    type: String,
    trim: true,
    index: true,
    unique: true,
  },
  permissions: [{
    type: String,
    index: true,
    enum: Object.values(permissions),
    uniqueItems: true,
  }],
}, { timestamps: true });

roleSchema.useMongooseHidden();

module.exports = model('Role', roleSchema, 'roles');
