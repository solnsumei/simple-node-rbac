const { Schema, model } = require('mongoose');


const userSchema = new Schema({
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
  },
  roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
  assignedPermissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }],
}, { timestamps: true });

module.exports = model('User', userSchema, 'users');
