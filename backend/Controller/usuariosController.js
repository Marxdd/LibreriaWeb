const mongoose = require('mongoose');
const usuarioModel = require('../model/Usuario');

const uri = "mongodb://localhost:27017/dbbiblioteca";

exports.conexionBD = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Conexión exitosa');
    } catch (error) {
        console.log(error);
    }
}

exports.cerrar = async () => {
    try {
        await mongoose.disconnect();
        console.log('desconectad6o');
    } catch (error) {
        console.log(error);
    }
}

exports.addUsuario = async (usuarioNuevo) => {
    try {
        await this.conexionBD();
        const usuario = new usuarioModel(usuarioNuevo);
        await usuario.save();
        console.log('Se registro correctamente a usuario: ' + usuario.nombre);
    } catch (error) {
        console.log(error);
    }

    mongoose.disconnect();
}

exports.deleteUsuario = async (nombre) => {
    try {
        await this.conexionBD();
        const usuario = await usuarioModel.deleteOne({ nombre: nombre });
        console.log('Se elimino proveedor: ' + usuario.nombre);
    } catch (error) {
        console.log(error);
    }
    mongoose.disconnect();
}

exports.updateUsuario = async (nombre, nuevosDatos) => {
    try {
        await this.conexionBD();
        const usuario = await usuarioModel.updateOne({ nombre: nombre }, { $set: nuevosDatos });
        console.log('Se han encontrado ' + usuario.matchedCount + ' documentos');
        console.log('Se han modificado ' + usuario.modifiedCount + ' documentos');
    } catch (error) {
        console.log(error);
    }
    mongoose.disconnect();
}

exports.getUsuarioByCorreoyContra = async (correo, contra) => {
    try {
        await this.conexionBD();
        const usuario = await usuarioModel.findOne({ correo: correo, contra: contra });
        return usuario;
    } catch (error) {
        console.log(error);
    }
    mongoose.disconnect();
}

exports.getUsuarios = async () => {
    try {
        await this.conexionBD();
        const usuario = await usuarioModel.find();
        console.log(usuario);
    } catch (error) {
        console.log(error);
    }
    mongoose.disconnect();
}


