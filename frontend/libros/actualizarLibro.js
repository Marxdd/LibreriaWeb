const sessionUser = new URLSearchParams(window.location.search);
const _id = sessionUser.get("usuario");
var checked = false;

agregarEventoRegresar();
agregarEventoActualizar();
agregarEventoVerificar();

function agregarEventoActualizar() {
  const btnActualizar = document.getElementById("actualizar");
  btnActualizar.addEventListener("click", actualizarLibro);
}

function agregarEventoVerificar() {
  const btnVerificar = document.getElementById("verificar");
  btnVerificar.addEventListener("click", verificarLibro);
}

async function verificarLibro() {
  if (checked) {
    checked = false;
  }
  const isbn = document.getElementById("isbn").value;

  const titulo = document.getElementById("titulo");
  const autor = document.getElementById("autor");
  const fecha = document.getElementById("fecha");
  const editorial = document.getElementById("editorial");

  var libro;
  const Http = new XMLHttpRequest();
  const url = `http://localhost:3312/api/v1/libros/${isbn}`;
  Http.open("GET", url);
  Http.send();

  Http.onreadystatechange = (e) => {
    var str = Http.responseText;

    if (!checked) {
      if (str != null && str != "Nada") {
        console.log(str);
        libro = JSON.parse(str);
        alert(
          "Libro con ISBN " + isbn + " verificado, Titulo: " + libro.titulo
        );
        checked = true;
      } else {
        alert("El libro no existe, favor de verificar ISBN");
        titulo.value = "";
        autor.value = "";
        fecha.value = "";
        editorial.value = "";
        checked = true;
      }
      console.log(str);
      titulo.value = libro.titulo;
      autor.value = libro.autor;
      fecha.value = libro.fechaPublicacion;
      editorial.value = libro.editorial;
    }
  };
}

async function actualizarLibro() {
  const isbn = document.getElementById("isbn").value;

  const titulo = document.getElementById("titulo").value;
  const autor = document.getElementById("autor").value;
  const fecha = document.getElementById("fecha").value;
  const editorial = document.getElementById("editorial").value;

  // Creating a XHR object
  let xhr = new XMLHttpRequest();

  // open a connection
  xhr.open("PUT", `http://localhost:3312/api/v1/libros/${isbn}`, true);

  // Set the request header i.e. which type of content you are sending
  xhr.setRequestHeader("Content-Type", "application/json");

  // Create a state change callback
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Print received data from server
      alert(xhr.responseText);
      window.location.href = "../menu.html";
    }
  };

  // Converting JSON data to string
  var data = JSON.stringify({
    titulo: titulo,
    autor: autor,
    fecha: fecha,
    isbn: isbn,
    editorial: editorial,
  });

  // Sending data with the request
  xhr.send(data);
}

function agregarEventoRegresar() {
  const btnRegresar = document.getElementById("cancelar");
  btnRegresar.addEventListener("click", () => {
    regresar(_id);
  });
}

function regresar(_id) {
  window.location = `../menu.html?usuario=${_id}`;
}
