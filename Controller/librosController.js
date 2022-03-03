'use strict';

const mongoose = require('mongoose');

const url = "mongodb://localhost:27017/dbbiblioteca";


const libroModel = require('../Models/librosModel');

class LibrosController {
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
            fechaPublicacion: libroNuevo.fechaPublicacion,
            isbn: libroNuevo.isbn,
            editorial: libroNuevo.editorial
        });
        await libro.save();
        console.log('Se agrego correctamente el libro: ' + libroNuevo.titulo);
        mongoose.disconnect();
    }
    async eliminarLibro(titulo) {
        try {
            await this.conexionBD();
            const libro = await libroModel.deleteOne({ titulo: titulo });
            console.log('Se elimino correctamente el libro con titulo : ' + libro.titulo);
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
        console.log(libroB);
        mongoose.disconnect();
    }
    async mostrarTodos() {
        await this.conexionBD();
        const libro = await libroModel.find();
        console.log(libro);
        mongoose.disconnect();
    }
}
module.exports = LibrosController;