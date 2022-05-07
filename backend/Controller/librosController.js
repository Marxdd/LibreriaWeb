'use strict';
const mongoose = require("mongoose");
const libroModel = require('../model/Libro');
const url = "mongodb://localhost:27017/dbbiblioteca";

class LibrosControl {
  async conexionBD() {
    try {
      await mongoose.connect(url);
      console.log("conexion exitosa");
    } catch (error) {
      console.log(error);
    }
  }

  async agregarLibro(libroNuevo) {
    await this.conexionBD();
    const libro = new libroModel({
      autor: libroNuevo.autor,
      titulo: libroNuevo.titulo,
      fechaPublicacion: libroNuevo.fecha,
      isbn: libroNuevo.isbn,
      editorial: libroNuevo.editorial,
    });
    await libro.save();
    //console.log('Se agrego correctamente el libro: ' + libroNuevo.titulo);
    mongoose.disconnect();
  }
  async eliminarLibro(isbnBuscar) {
    var eliminado = false;
    try {
      await this.conexionBD();
      const libro = await libroModel.findOne({ isbn: isbnBuscar });
      if (libro != null) {
        await libroModel.deleteOne({ isbn: isbnBuscar });
        console.log(
          "Se elimino correctamente el libro con titulo : " + libro.titulo
        );
        eliminado = true;
      } else {
        console.log("El libro que desea eliminar no existe");
      }
    } catch (error) {
      console.log(error);
    }
    mongoose.disconnect();
    return eliminado;
  }
  async actualizarLibro(isbnBuscar, libroActualizado) {
    await this.conexionBD();
    const libroNuevo = await libroModel.updateOne(
      { isbn: isbnBuscar },
      {
        $set: {
          titulo: libroActualizado.titulo,
          autor: libroActualizado.autor,
          fecha: libroActualizado.fecha,
          editorial: libroActualizado.editorial,
        },
      }
    );
    console.log("El libro de " + isbnBuscar + "se actualizo correctamente!");
    mongoose.disconnect();
  }
  async consultarUnLibro(isbnBuscar) {
    await this.conexionBD();
    const libroB = await libroModel.findOne({ isbn: isbnBuscar });
    if (libroB != null) {
      console.log(libroB);
    } else {
      console.log("No se encontro coincidencias");
    }
    mongoose.disconnect();
    return libroB;
  }
  async mostrarTodos() {
    await this.conexionBD();
    const libro = await libroModel.find();
    console.log(libro);
    mongoose.disconnect();
  }
}

module.exports = LibrosControl;