const express = require("express");
const usuarioRoutes = require("../routes/UsuarioRoutes");
const libroRouters = require("../routes/LibroRouters");
const AuthController = require("../Auth/AuthController");
const usuariosController = require("../Controller/UsuariosController");
const usuarios = new usuariosController();
const librosController = require("../Controller/LibrosController");
const libros = new librosController();
const mongoose = require("mongoose");

const globalErrorHandler = require("../utils/appError");
var cors = require("cors");
const app = express();
app.use(express.json());
// Middleware
app.use(cors());

//Routers
app.get("/api/v1/usuarios", async (req, res) => {
  
  try {
    const data = await usuarios.consultarTodosDatos();
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

app.post("/api/v1/libros", async (req, res) => {
  const libro = {
    titulo: req.body.titulo,
    autor: req.body.autor,
    fecha: req.body.fecha,
    isbn: req.body.isbn,
    editorial: req.body.editorial,
  };

  await libros.agregarLibro(libro);

  res.send("Libro agregado!");
});

//app.use("/api/v1/libros", libroRouters);
//app.use('/api/auth', AuthController);

app.all("*", (req, resp, next) => {
  next(
    new globalErrorHandler(
      `No se pudo acceder a ${req.originalUrl} en el servidor`,
      404
    )
  );
});

app.listen(3312, () => {
  console.log("Servidor levantado y escuchando por el puerto 3312!");
});

module.exports = app;
