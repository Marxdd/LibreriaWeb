'use strict';
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  correo: {type:String, unique: true},
  contra: String,
  nombre: String,
  esAdmin: Boolean
});

const userModel = mongoose.model('usuarios', userSchema);
module.exports = userModel