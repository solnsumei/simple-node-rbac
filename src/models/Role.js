const { BaseSchema, model } = require('./BaseSchema');
const User = require('./User');
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

roleSchema.pre('findOneAndUpdate', async function updateUserRoles(next) {
  const doc = await this.model.findOne(this.getQuery());
  if (!doc) {
    return next();
  }

  const { name } = this._update;

  if (name && name !== doc.name) {
    await User.updateMany(
      { roles: doc.name },
      { 'roles.$': name },
    );
  }
  return next();
});

roleSchema.pre('deleteOne', async function updateUserRoles(next) {
  const doc = await this.model.findOne(this.getQuery());
  if (!doc) {
    return next();
  }

  await User.updateMany(
    { roles: doc.name },
    { $pull: { roles: doc.name } },
  );

  return next();
});

module.exports = model('Role', roleSchema, 'roles');
