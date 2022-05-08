const sessionUser = new URLSearchParams(window.location.search);
const _id = sessionUser.get("usuario");
var checked = false;
var p = false;

agregarEventoRegresar();
agregarEventoRegistrar();
primerUsuario();

function agregarEventoRegistrar() {
  const btnRegistrar = document.getElementById("registrarse");
  btnRegistrar.addEventListener("click", registrarUsuario);
}
async function registrarUsuario(){
  await agregarUsuario();
}
async function agregarUsuario() {
  if (checked) {
    checked = false;
  }
  
  const nombre = document.getElementById("nombre").value;
  const contra = document.getElementById("contra").value;
  const correo = document.getElementById("correo").value;
  var esAdmin = p;

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
      window.location.href = "../index.html";
    }
  };

  // Converting JSON data to string

  var data = JSON.stringify({
    nombre: nombre,
    correo: correo,
    contra: contra,
    esAdmin: esAdmin
  });

  // Sending data with the request
  xhr.send(data);
}

async function primerUsuario(){
  if (checked) {
    checked = false;
  }
  var usuarios;
  const Http = new XMLHttpRequest();
  const url = "http://localhost:3312/api/v1/usuarios";
  Http.open("GET", url);
  Http.send();

  Http.onreadystatechange = (e) => {
    var str = Http.responseText;

    if (!checked) {
      usuarios = JSON.parse(str);
      if (usuarios.length == 0) {
        p= true;
        alert("Es primer Usuario, será registrado como administrador");
      }
      checked = true;
    }
    
  };
}

function agregarEventoRegresar() {
  const btnRegresar = document.getElementById("cancelar");
  btnRegresar.addEventListener("click", () => {
    regresar(_id);
  }); 
}

function regresar(_id) {
  window.location = "../index.html";
}
