const mongoose = require('mongoose');


const esquemaUsuarios = new mongoose.Schema({
    nombre : String,
    correo : String,
    contra : String,
    esAdmin : Boolean
})

exports.usuario = new mongoose.model('usuarios',esquemaUsuarios);

//module.exports.usuario = usuario;
