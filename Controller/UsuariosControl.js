'use strict';

const userModel = require('../model/Usuarios'); 

class TrabajadoresControl {


  async insertarDato(nuevoDato) {
    const dato = new userModel({
      correo: nuevoDato.correo,
      contrasena: nuevoDato.contrasena,
      nombre: nuevoDato.nombre,
      direccion: nuevoDato.direccion,
      telefono: nuevoDato.telefono
    });
      await dato.save();
      console.log('Se agrego correctamente el dato: ' + nuevoDato.nombre);
    
  }

  async eliminarDato(idBuscar) {
    const user = await userModel.deleteOne({
      _id: idBuscar
    });
    if(user.deletedCount!=0){
      console.log('Se elimino correctamente el dato con id: ' + idBuscar);
    }else{
      console.log('No se encontro un dato con id: '+idBuscar)
    }
    return user;
  }

  async actualizarDato(idBuscar, direccionNuevo) {
    const user = await userModel.updateOne({
      _id: idBuscar
    }, {
      $set: {
        direccion: direccionNuevo
      }
    });
    if(user.modifiedCount!=0){
      console.log('El id ' + idBuscar + ' se actualizo correctamente con el dato nuevo: ' + direccionNuevo);
    }else{
      console.log('El id ' + idBuscar + ' no existe');
    }
    return user;
  }

  async consultarUnDato(idBuscar) {
    const user = await userModel.findOne({
      _id: idBuscar
    });
    if(user!=null){
      return user;
    }else{
      return null;
    }
    
  }

  async consultarTodosDatos() {
    const users = await userModel.find();
    return users;
  }

}

module.exports = TrabajadoresControl;