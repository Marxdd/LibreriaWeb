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
      correo: nuevoDato.correo,
      contra: nuevoDato.contrasena,
      nombre: nuevoDato.nombre,
      direccion: nuevoDato.direccion,
      telefono: nuevoDato.telefono,
    });
    await dato.save();
    console.log("Se agrego correctamente el dato: " + nuevoDato.nombre);
    mongoose.disconnect();
  }

  async eliminarDato(idBuscar) {
    await this.conexionBD();
    const user = await userModel.deleteOne({
      _id: idBuscar,
    });
    if (user.deletedCount != 0) {
      console.log("Se elimino correctamente el dato con id: " + idBuscar);
    } else {
      console.log("No se encontro un dato con id: " + idBuscar);
    }
    mongoose.disconnect();
    return user;
  }

  async actualizarDato(idBuscar, direccionNuevo) {
    await this.conexionBD();
    const user = await userModel.updateOne(
      {
        _id: idBuscar,
      },
      {
        $set: {
          direccion: direccionNuevo,
        },
      }
    );
    if (user.modifiedCount != 0) {
      console.log(
        "El id " +
          idBuscar +
          " se actualizo correctamente con el dato nuevo: " +
          direccionNuevo
      );
    } else {
      console.log("El id " + idBuscar + " no existe");
    }
    mongoose.disconnect();
    return user;
  }

  async consultarUnDato(idBuscar) {
    await this.conexionBD();
    const user = await userModel.findOne({
      _id: idBuscar,
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