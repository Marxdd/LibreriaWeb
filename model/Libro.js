'use strict';
const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
    autor : String,
    titulo : String,
    fechaPublicacion : String,
    isbn : Number,
    editorial: String
});

const gameModel = mongoose.model('libros', libroSchema);
module.exports = gameModel;
