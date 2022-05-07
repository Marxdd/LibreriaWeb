const sessionUser = new URLSearchParams(window.location.search);
const _id = sessionUser.get("usuario");
var checked = false;

agregarEventoRegresar();
agregarEventoEliminar();
agregarEventoVerificar();

function agregarEventoEliminar() {
  const btnEliminar = document.getElementById("eliminar");
  btnEliminar.addEventListener("click", eliminarUsuario);
}

function agregarEventoVerificar() {
  const btnVerificar = document.getElementById("verificar");
  btnVerificar.addEventListener("click", verificarUsuario);
}

async function verificarUsuario() {
  if (checked) {
    checked = false;
  }
  const correo = document.getElementById("correo").value;

  const usuarioDiv = document.getElementById("usuario");

  var usuario;
  const Http = new XMLHttpRequest();
  const url = `http://localhost:3312/api/v1/usuarios/${correo}`;
  Http.open("GET", url);
  Http.send();

  Http.onreadystatechange = (e) => {
    var str = Http.responseText;

    if (!checked) {
      if (str != null && str != "Nada") {
        console.log(str);
        usuario = JSON.parse(str);
        alert(
          "Usuario con correo " + correo + " verificado, Nombre: " + usuario.nombre
        );
        checked = true;
      } else {
        alert("El usuarios no existe, favor de verificar correo");
        usuarioDiv.innerHTML = "";
        checked = true;
      }
      console.log(str);
      usuarioDiv.innerHTML = `<br />
          <label type="text">Nombre: ${usuario.nombre}</label>
          <br />
          <label type="text">Contraseña: ${usuario.contra}</label>
          <br />
          <label type="text" >Es Administrador: ${usuario.esAdmin ? "Si" : "No"  }</label>
          <br />`;
    }
  };
}

async function eliminarUsuario() {
  const correo = document.getElementById("correo").value;
  var con = confirm("Seguro que desea eliminar el usuario con correo " + correo);

  if (con) {
    // Creating a XHR object
    let xhr = new XMLHttpRequest();

    // open a connection
    xhr.open("DELETE", `http://localhost:3312/api/v1/usuarios/${correo}`, true);

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
      correo: correo
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
