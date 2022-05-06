const btnIngresar = document.getElementById("btnIngresar");
var usuarios;

async function ingresarSesion() {
  var txtCorreo = document.getElementById("txtCorreo").value;
  var txtContra = document.getElementById("txtPassword").value;

  validarUsuario(txtCorreo, txtContra);
}

async function validarUsuario(correo, contra) {

  const Http = new XMLHttpRequest();
  const url = "http://localhost:3312/api/v1/usuarios";
  Http.open("GET", url);
  Http.send();

  Http.onreadystatechange = (e) => {
    var str = Http.responseText;
    usuarios = JSON.parse(str);
   
    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].correo === correo) {
        if (usuarios[i].contra === contra) {
          alert("usuario validado");
          window.location.href = "menu.html";
          return;
        }
      }
    }
  };

  };

  

btnIngresar.addEventListener("click", ingresarSesion);
