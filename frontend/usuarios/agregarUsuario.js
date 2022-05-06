const sessionUser = new URLSearchParams(window.location.search);
const _id = sessionUser.get("usuario");

agregarEventoRegresar();
agregarEventoRegistrar();

function agregarEventoRegistrar() {
  const btnRegistrar = document.getElementById("registrarse");
  btnRegistrar.addEventListener("click", agregarUsuario);
}

async function agregarUsuario() {
  const nombre = document.getElementById("nombre").value;
  const contra = document.getElementById("contra").value;
  const correo = document.getElementById("correo").value;
  const esAdmin = document.getElementById("esAdmin").checked;

  // Creating a XHR object
  let xhr = new XMLHttpRequest();

  // open a connection
  xhr.open("POST", "http://localhost:3312/api/v1/usuarios", true);

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
    nombre: nombre,
    correo: correo,
    contra: contra,
    esAdmin: esAdmin,
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
