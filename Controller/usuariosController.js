const mongoose = require('mongoose');
const usuarioModel = require('../Models/usuariosModel');

const uri="mongodb://localhost:27017/dbbiblioteca";

exports.conexionBD = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Conexión exitosa');
    } catch (error) {
        console.log(err);
    }
}

exports.addUsuario = async (usuarioNuevo) => {
    this.conexionBD();
    const usuario = new usuarioModel(usuarioNuevo);
    await usuario.save();
    console.log('Se registro correctamente a usuario: ' + usuario.nombre);
    mongoose.disconnect();
}

exports.deleteUsuario = async (nombre) => {
    this.conexionBD();
    const usuario = await usuarioModel.deleteOne({ nombre: nombre });
    console.log('Se elimino proveedor: ' + usuario.nombre);
    mongoose.disconnect();
}

exports.updateUsuario = async (nombre,nuevosDatos) => {
    this.conexionBD();
    const usuario = await usuarioModel.updateOne({ nombre: nombre }, { $set: nuevosDatos });
    console.log('Se han encontrado ' + usuario.matchedCount + ' documentos');
    console.log('Se han modificado ' + usuario.modifiedCount + ' documentos');
    mongoose.disconnect();
}

exports.getUsuarioByCorreoyContra = async (correo,contra) => {
    this.conexionBD();
    const usuario = await usuarioModel.findOne({ correo: correo,contra: contra });
    //console.log(usuario);
    mongoose.disconnect();
    return usuario;
   //mongoose.disconnect();
}

exports.getUsuarios = async () => {
    this.conexionBD();
    const usuario = await usuarioModel.find();
    console.log(usuario);
    mongoose.disconnect();
}


