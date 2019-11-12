const { Schema, model } = require('mongoose');


const permissionSchema = new Schema({
  value: {
    type: String,
    trim: true,
    index: true,
    unique: true,
  },
}, { timestamps: true });

module.exports = model('Permission', permissionSchema, 'permissions');
