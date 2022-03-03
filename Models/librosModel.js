const mongoose = require('mongoose');

const esquemaLibros = new mongoose.Schema({
    autor : String,
    titulo : String,
    fechaPublicacion : String,
    isbn : Number,
    editorial: String
})

const libros = mongoose.model('libros',esquemaLibros);

module.exports = libros;