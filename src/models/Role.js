const { Schema, model } = require('mongoose');


const roleSchema = new Schema({
  name: {
    type: String,
    trim: true,
    index: true,
    unique: true,
  },
  permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }],
}, { timestamps: true });

module.exports = model('Role', roleSchema, 'roles');
