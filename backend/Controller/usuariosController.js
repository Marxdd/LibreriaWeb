'use strict';
const mongoose = require("mongoose");
const userModel = require('../model/Usuario'); 
const url = "mongodb://localhost:27017/dbbiblioteca";

class UsuariosControl {
  async conexionBD() {
    try {
      await mongoose.connect(url);
      console.log("conexion exitosa");
    } catch (error) {
      console.log(error);
    }
  }

  async insertarUsuario(usuarioNuevo) {
    await this.conexionBD();
    const dato = new userModel({
      correo: usuarioNuevo.correo,
      contra: usuarioNuevo.contra,
      nombre: usuarioNuevo.nombre,
      esAdmin: usuarioNuevo.esAdmin,
    });
    await dato.save();
    console.log("Se agrego correctamente el dato: " + usuarioNuevo.nombre);
    mongoose.disconnect();
  }
 
  async eliminarDato(correoBuscar) {
    var eliminado = false;
    await this.conexionBD();
    const user = await userModel.deleteOne({
      correo: correoBuscar
    });
    if (user.deletedCount != 0) {
      console.log("Se elimino correctamente el usuario con correo: " + correoBuscar);
      eliminado=true;
    } else {
      console.log("No se encontro el usuario con correo: " + correoBuscar);
    }
    mongoose.disconnect();
    return eliminado;
  }

  async actualizarUsuario(correoBuscar, nuevoUsuario) {
    await this.conexionBD();
    const usuario = await userModel.updateOne(
      { correo: correoBuscar },
      {
        $set: {
          nombre: nuevoUsuario.nombre,
          contra: nuevoUsuario.contra,
          esAdmin: nuevoUsuario.esAdmin
        }
      }
    );
    console.log("El Usuario de correo " + correoBuscar + "se actualizo correctamente!");
    mongoose.disconnect();
    return usuario;
  }

  async consultarUnDato(correoBuscar) {
    await this.conexionBD();
    const user = await userModel.findOne({
      correo: correoBuscar
    });

    mongoose.disconnect();
    if (user != null) {
      return user;
    } else {
      return null;
    }
  }

  async consultarTodosDatos() {
    await this.conexionBD();
    const users = await userModel.find();
    mongoose.disconnect();
    return users;
  }
} 

module.exports = UsuariosControl;