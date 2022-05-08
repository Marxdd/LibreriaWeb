const express = require("express");
const usuarioRoutes = require("./routes/UsuarioRoutes");
const libroRouters = require("./routes/LibroRouters");
const AuthController = require("./Auth/AuthController");
const usuariosController = require("./Controller/UsuariosController");
const usuarios = new usuariosController();
const librosController = require("./Controller/LibrosController");
const libros = new librosController();
const mongoose = require("mongoose");
const path = require("path");

const globalErrorHandler = require("./utils/appError");
var cors = require("cors");
const app = express();
app.use(express.json());
// Middleware
app.use(cors());

//Routers
app.delete("/api/v1/libros/:isbn", async (req, res) => {
  try {
    const data = await libros.eliminarLibro(req.params.isbn);
    if (data) {
      res.send("Libro Eliminado!");
    } else {
      res.send("No se eliminó nada");
    }
  } catch (error) {
    res.send(error);
  }
});

app.delete("/api/v1/usuarios/:correo", async (req, res) => {
  try {
    const data = await usuarios.eliminarDato(req.params.correo);
    if (data) {
      res.send("Usuario Eliminado!");
    } else {
      res.send("No se eliminó nada");
    }
  } catch (error) {
    res.send(error);
  }
});

app.get("/api/v1/libros", async (req, res) => {
  try {
    const data = await libros.mostrarTodos();
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

app.get("/api/v1/usuarios", async (req, res) => {
  
  try {
    const data = await usuarios.consultarTodosDatos();
    console.log("Funciona get usuarios ");
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

app.get("/api/v1/libros/:isbn", async (req, res) => {
  try {
    const data = await libros.consultarUnLibro(req.params.isbn);
    if(data!=null){
    res.send(data);
    }else{
      res.send("Nada");
    }
  } catch (error) {
    res.send(error);
  }
});

app.get("/api/v1/usuarios/:correo", async (req, res) => {
  try {
    const data = await usuarios.consultarUnDato(req.params.correo);
    if (data != null) {
      res.send(data);
    } else {
      res.send("Nada");
    }
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

app.post("/api/v1/usuarios", async (req, res) => {
  const usuario = {
    nombre: req.body.nombre,
    correo: req.body.correo,
    contra: req.body.contra,
    esAdmin: req.body.esAdmin
  };
  console.log("Funciona post usuarios ");
  await usuarios.insertarUsuario(usuario);  

  res.send("Usuario agregado!");
});

app.put("/api/v1/libros/:isbn", async (req, res) => {

  try {
    const libroNuevo = {
      titulo: req.body.titulo,
      autor: req.body.autor,
      fecha: req.body.fecha,
      isbn: req.body.isbn,
      editorial: req.body.editorial,
    };

    await libros.actualizarLibro(libroNuevo.isbn, libroNuevo);

    res.send("Libro Acualizado!");
  } catch (error) {
    res.send(error);
  }
});

app.put("/api/v1/usuarios/:correo", async (req, res) => {
  try {
    const usuario = {
      nombre: req.body.nombre,
      correo: req.body.correo,
      contra: req.body.contra,
      esAdmin: req.body.esAdmin,
    };

    await usuarios.actualizarUsuario(usuario.correo, usuario);

    res.send("Usuario Actualizado!");
  } catch (error) {
    res.send(error);
  }
});

//app.use("/api/v1/libros", libroRouters);
//app.use('/api/auth', AuthController);

app.get("/", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../frontend/index.html")
  );
});

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
