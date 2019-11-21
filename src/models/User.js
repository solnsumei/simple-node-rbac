const { BaseSchema, model } = require('./BaseSchema');
const { permissions } = require('../utils/permissions');


const userSchema = new BaseSchema({
  name: {
    type: String,
    trim: true,
    index: true,
  },
  email: {
    type: String,
    trim: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    index: true,
    hideJSON: true,
  },
  roles: [{
    type: String,
    index: true,
    uniqueItems: true,
  }],
  assignedPermissions: [{
    type: String,
    index: true,
    enum: Object.values(permissions),
    uniqueItems: true,
  }],
}, { timestamps: true });

userSchema.useMongooseHidden();

module.exports = model('User', userSchema, 'users');
