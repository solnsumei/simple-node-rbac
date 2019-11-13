const { Schema, model } = require('mongoose');


const permissionSchema = new Schema({
  name: {
    type: String,
    trim: true,
    index: true,
    unique: true,
  },
}, { timestamps: true });

module.exports = model('Permission', permissionSchema, 'permissions');
