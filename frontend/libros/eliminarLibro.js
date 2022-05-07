const sessionUser = new URLSearchParams(window.location.search);
const _id = sessionUser.get("usuario");
var checked = false;

agregarEventoRegresar();
agregarEventoEliminar();
agregarEventoVerificar();

function agregarEventoEliminar() {
  const btnEliminar = document.getElementById("eliminar");
  btnEliminar.addEventListener("click", eliminarLibro);
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

  const libroDiv = document.getElementById("libro");

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
        libroDiv.innerHTML ="";
        checked = true;
      }
      console.log(str);
      libroDiv.innerHTML = `<br />
          <label type="text">Titulo: ${libro.titulo}</label>
          <br />
          <label type="text">Autor: ${libro.autor}</label>
          <br />
          <label type="text" >Fecha: ${libro.fechaPublicacion}</label>
          <br />
          <label type="text">Editorial: ${libro.editorial}</label>
          <br />`;
      
    }
  };
}

async function eliminarLibro() {
  const isbn = document.getElementById("isbn").value;
  var con = confirm("Seguro que desea eliminar el libro con ISBN "+isbn);

  if (con) {
    // Creating a XHR object
    let xhr = new XMLHttpRequest();

    // open a connection
    xhr.open("DELETE", `http://localhost:3312/api/v1/libros/${isbn}`, true);

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
      isbn: isbn
    });

    // Sending data with the request
    xhr.send(data);
  }
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
