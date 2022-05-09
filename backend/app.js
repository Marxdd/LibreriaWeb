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

//Recursos Principales
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/../frontend/index.html"));
  
});

app.get("/css/index.css", function (req, res) {
  res.sendFile(path.join(__dirname, "/../frontend/css/index.css"));
});

app.get("/img/libreria.png", function (req, res) {
  res.sendFile(path.join(__dirname, "/../frontend/img/libreria.png"));
});
app.get("/index.html", function (req, res) {
  res.sendFile(path.join(__dirname, "/../frontend/index.html"));
});

app.get("/index.js", function (req, res) {
  res.sendFile(path.join(__dirname, "/../frontend/index.js"));
});

app.get("/menu.html", function (req, res) {
  res.sendFile(path.join(__dirname, "/../frontend/menu.html"));
});

app.get("/css/stylepag.css", function (req, res) {
  res.sendFile(path.join(__dirname, "/../frontend/css/stylepag.css"));
});

app.get("/img/usuarios.jpg", function (req, res) {
  res.sendFile(path.join(__dirname, "/../frontend/img/usuarios.jpg"));
});

app.get("/menu.js", function (req, res) {
  res.sendFile(path.join(__dirname, "/../frontend/menu.js"));
});

//Recursos de usuarios
app.get("/usuarios/actualizarusuario.html", function (req, res) {
  res.sendFile(
    path.join(__dirname, "/../frontend/usuarios/actualizarusuario.html")
  );
});

app.get("/usuarios/actualizarusuario.js", function (req, res) {
  res.sendFile(
    path.join(__dirname, "/../frontend/usuarios/actualizarusuario.js")
  );
});

app.get("/usuarios/agregarusuario.html", function (req, res) {
  res.sendFile(
    path.join(__dirname, "/../frontend/usuarios/agregarusuario.html")
  );
});

app.get("/usuarios/agregarusuario.js", function (req, res) {
  res.sendFile(path.join(__dirname, "/../frontend/usuarios/agregarusuario.js"));
});

app.get("/usuarios/consultarusuario.html", function (req, res) {
  res.sendFile(
    path.join(__dirname, "/../frontend/usuarios/consultarusuario.html")
  );
});

app.get("/usuarios/consultarusuario.js", function (req, res) {
  res.sendFile(
    path.join(__dirname, "/../frontend/usuarios/consultarusuario.js")
  );
});

app.get("/usuarios/eliminarusuario.html", function (req, res) {
  res.sendFile(
    path.join(__dirname, "/../frontend/usuarios/eliminarusuario.html")
  );
});

app.get("/usuarios/eliminarusuario.js", function (req, res) {
  res.sendFile(
    path.join(__dirname, "/../frontend/usuarios/eliminarusuario.js")
  );
});

app.get("/usuarios/registrarusuario.html", function (req, res) {
  res.sendFile(
    path.join(__dirname, "/../frontend/usuarios/registrarusuario.html")
  );
});

app.get("/usuarios/registrarusuario.js", function (req, res) {
  res.sendFile(
    path.join(__dirname, "/../frontend/usuarios/registrarusuario.js")
  );
});

//Recursos de Libros
app.get("/libros/actualizarlibro.html", function (req, res) {
  res.sendFile(
    path.join(__dirname, "/../frontend/libros/actualizarlibro.html")
  );
});

app.get("/libros/actualizarlibro.js", function (req, res) {
  res.sendFile(path.join(__dirname, "/../frontend/libros/actualizarlibro.js"));
});

app.get("/libros/agregarlibro.html", function (req, res) {
  res.sendFile(path.join(__dirname, "/../frontend/libros/agregarlibro.html"));
});

app.get("/libros/agregarlibro.js", function (req, res) {
  res.sendFile(path.join(__dirname, "/../frontend/libros/agregarlibro.js"));
});

app.get("/libros/consultarlibro.html", function (req, res) {
  res.sendFile(path.join(__dirname, "/../frontend/libros/consultarlibro.html"));
});

app.get("/libros/consultarlibro.js", function (req, res) {
  res.sendFile(path.join(__dirname, "/../frontend/libros/consultarlibro.js"));
});

app.get("/libros/eliminarlibro.html", function (req, res) {
  res.sendFile(path.join(__dirname, "/../frontend/libros/eliminarlibro.html"));
});

app.get("/libros/eliminarlibro.js", function (req, res) {
  res.sendFile(path.join(__dirname, "/../frontend/libros/eliminarlibro.js"));
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
