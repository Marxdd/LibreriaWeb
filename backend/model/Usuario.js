'use strict';
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  correo: {type:String, unique: true},
  contrasena: String,
  nombre: String,
  direccion: String,
  telefono: String
});

const userModel = mongoose.model('usuarios', userSchema);
module.exports = userModel