'use strict';
const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
    autor : String,
    titulo : String,
    fechaPublicacion : String,
    isbn : Number,
    editorial: String
});

const libroModel = mongoose.model('libros', libroSchema);
module.exports = libroModel;
