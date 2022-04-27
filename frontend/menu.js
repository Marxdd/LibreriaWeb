//Botones de usuarios
const btnConsultarUsuario = document.getElementById("btnConsultarUsuario");
const btnAgregarUsuario = document.getElementById("btnAgregarUsuario");
const btnActualizarUsuario = document.getElementById("btnActualizarUsuario");
const btnEliminarUsuario = document.getElementById("btnEliminarUsuario");

//Botones de libros
const btnConsultarLibros = document.getElementById("btnConsultarLibros");
const btnAgregarLibros = document.getElementById("btnAgregarLibros");
const btnActualizarLibros = document.getElementById("btnActualizarLibros");
const btnEliminarLibros = document.getElementById("btnEliminarLibros");

//Funciones de opciones de usuarios
btnConsultarUsuario.addEventListener("click", (e) => {
  window.location.href="usuarios/consultarusuario.html";
});

btnAgregarUsuario.addEventListener("click", (e) => {
  window.location.href = "usuarios/agregarusuario.html";
});

btnActualizarUsuario.addEventListener("click", (e) => {
  window.location.href = "usuarios/actualizarusuario.html";
});

btnEliminarUsuario.addEventListener("click", (e) => {
  window.location.href = "usuarios/eliminarusuario.html";
});

//Funciones de opciones de librps
btnConsultarLibros.addEventListener("click", (e) => {
  window.location.href = "libros/consultarlibro.html";
});

btnAgregarLibros.addEventListener("click", (e) => {
  window.location.href = "libros/agregarlibro.html";
});

btnActualizarLibros.addEventListener("click", (e) => {
  window.location.href = "libros/actualizarlibro.html";
});

btnEliminarLibros.addEventListener("click", (e) => {
  window.location.href = "libros/eliminarlibro.html";
});