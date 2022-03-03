const mongoose = require('mongoose');


const esquemaUsuarios = new mongoose.Schema({
    nombre : String,
    correo : String,
    contra : String,
    esAdmin : Boolean
})
const usuario = new mongoose.model('usuarios',esquemaUsuarios);

module.exports = usuario;
//module.exports.usuario = usuario;
