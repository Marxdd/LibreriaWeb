'use strict';
const mongoose = require("mongoose");
const libroModel = require('../model/Libro');
const url = "mongodb://localhost:27017/dbbiblioteca";

class LibrosControl {

  async conexionBD() {
    try {
        await mongoose.connect(url);
        console.log('conexion exitosa');
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
        editorial: libroNuevo.editorial
    });
    await libro.save(); 
    //console.log('Se agrego correctamente el libro: ' + libroNuevo.titulo);
    mongoose.disconnect();
}
async eliminarLibro(titulo) {
    try {
        await this.conexionBD();
        const libro = await libroModel.findOne({titulo: titulo});
        if (libro != null) {
          await libroModel.deleteOne({ titulo: titulo });
          console.log('Se elimino correctamente el libro con titulo : ' + libro.titulo);
        } else {
          console.log("El libro que desea eliminar no existe");
        }
    } catch (error) {
        console.log(error);
    }
    mongoose.disconnect();
}
async actualizarLibro(autorBuscar, tituloNuevo) {
    await this.conexionBD();
    const libroNuevo = await libroModel.updateOne({ autor: autorBuscar }, { $set: { titulo: tituloNuevo } });
    console.log('El libro de ' + autorBuscar + 'se actualizo correctamente con el nuevo titulo: ' + tituloNuevo);
    mongoose.disconnect();
}
async consultarUnLibro(libroBuscar) {
    await this.conexionBD();
    const libroB = await libroModel.findOne({ titulo: libroBuscar });
    if(libroB!=null){
    console.log(libroB);
    }else{
        console.log("No se encontro coincidencias");
    }
    mongoose.disconnect();
}
async mostrarTodos() {
    await this.conexionBD();
    const libro = await libroModel.find();
    console.log(libro);
    mongoose.disconnect();
}

}

module.exports = LibrosControl;