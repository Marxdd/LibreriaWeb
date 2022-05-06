const sessionUser = new URLSearchParams(window.location.search);
const _id = sessionUser.get("usuario");
var checked = false;

agregarEventoRegresar();
agregarEventoActualizar();
agregarEventoVerificar();

function agregarEventoActualizar() {
  const btnActualizar = document.getElementById("actualizar");
  btnActualizar.addEventListener("click", actualizarUsuario);
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

  const nombre = document.getElementById("nombre");
  const contra = document.getElementById("contra");
  const esAdmin = document.getElementById("esAdmin");

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
        alert("El usuario no existe, favor de verificar correo");
        nombre.value = "";
        esAdmin.checked = false;
        contra.value = "";
        checked = true;
      }
      console.log(str);
      nombre.value = usuario.nombre;
      esAdmin.checked = usuario.esAdmin;
      contra.value = usuario.contra;
    }
  };
}

async function actualizarUsuario() {
  const correo = document.getElementById("correo").value;

  const nombre = document.getElementById("nombre").value;
  const contra = document.getElementById("contra").value;
  const esAdmin = document.getElementById("esAdmin").checked;

  // Creating a XHR object
  let xhr = new XMLHttpRequest();

  // open a connection
  xhr.open("PUT", `http://localhost:3312/api/v1/usuarios/${correo}`, true);

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
    correo:correo,
    nombre:nombre,
    contra:contra,
    esAdmin:esAdmin
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
