const express = require('express');
const controller = require('../controller/librosController');
const router = express.Router();

const libro = new controller();

router.route("/").get(async (req, res) => {
    const data = await libro.mostrarTodos();
    res.json(data);
});

router.route("/").post(async (req, res) => {
    const libro = {
        autor: libroNuevo.autor,
        titulo: libroNuevo.titulo,
        fechaPublicacion: libroNuevo.fechaPublicacion,
        isbn: libroNuevo.isbn,
        editorial: libroNuevo.editorial
    };
    
    await libro.agregarLibro(libro);

    res.status(201).json({
        status: 'Agregado!',
        body:libro
    });
}).put(async (req, res) => {
    
    const libro = {
        autor: req.body.autor,
        titulo: req.body.titulo
    };

    const data = await libro.actualizarLibro(libro.autor,libro.titulo);

    res.status(201).json({
        status: 'Actualizado',
        body: data
    });
});

router.route("/:titulo")
    .get(async (req, res) => {
        const titulo= req.params.titulo;
        const data = await libro.consultarUnLibro(titulo);
        res.json(data);
    }).delete(async (req, res) => {
        const titulo= req.params.titulo;

        const data = await libro.eliminarLibro(titulo);
        res.status(201).json({
            status: 'Eliminado',
            body:data
        });
    });

module.exports = router;