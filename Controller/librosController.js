'use strict';

const mongoose = require('mongoose');

const url="mongodb://localhost:27017/dbbiblioteca";
const esquemaLibros = new mongoose.Schema({
    autor : String,
    titulo : String,
    fechaPublicacion : String,
    isbn : Number,
    editorial: String
})

const libroModel = new mongoose.model('libros',esquemaLibros);

class LibrosController {
    async conexionBD() {
        mongoose.connect(url)
         .then(() => console.log('Conexión exitosa'))
         .catch((err) => console.log(err));
       }
    
    async agregarLibro(libroNuevo) {
        this.conexionBD();
        const libro = new libroModel({
        autor: libroNuevo.autor,
        titulo: libroNuevo.titulo,
        fechaPublicacion: libroNuevo.fechaPublicacion,
        isbn: libroNuevo.isbn,
        editorial: libroNuevo.editorial
      });
      await libro.save();
      console.log('Se agrego correctamente el libro: ' + libroNuevo.titulo);
      mongoose.disconnect();
    }
    async eliminarLibro(titulo) {
        this.conexionBD();
        const libro = await libroModel.deleteOne({titulo: titulo});
        console.log('Se elimino correctamente el libro con titulo : ' + titulo);
        mongoose.disconnect();
    }
    async actualizarLibro(autorBuscar, tituloNuevo) {
        this.conexionBD();
        const libroNuevo = await libroModel.updateOne({autor: autorBuscar}, {$set: {titulo: tituloNuevo}});
        console.log('El libro de ' + autorBuscar + 'se actualizo correctamente con el nuevo titulo: ' + tituloNuevo);
        mongoose.disconnect();
    }
    async consultarUnLibro(libroBuscar) {
        this.conexionBD();
        const libroB = await libroModel.findOne({ libro: libroBuscar });
        console.log(libroB);
        mongoose.disconnect();
    }
    async mostrarTodos() {
        this.conexionBD();
        const libro = await libroModel.find();
        console.log(libro);
        mongoose.disconnect();
    }
}
module.exports = LibrosController;