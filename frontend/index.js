const btnIngresar = document.getElementById("btnIngresar");
var usuarios;
var checked = false;

async function ingresarSesion() {
  var txtCorreo = document.getElementById("txtCorreo").value;
  var txtContra = document.getElementById("txtPassword").value;

  if(txtContra == ""||txtCorreo == ""){
    alert("Por Favor llene los datos de inicio de sesion");
    
  }else{
  validarUsuario(txtCorreo, txtContra);
  }
}

async function validarUsuario(correo, contra) {

  const Http = new XMLHttpRequest();
  const url = "http://localhost:3312/api/v1/usuarios";
  Http.open("GET", url);
  Http.send();

  Http.onreadystatechange = (e) => {
    var str = Http.responseText;
    usuarios = JSON.parse(str);
    var valid = false;
    
    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].correo === correo) {
        if (usuarios[i].contra === contra) {
          valid=true;
          break;
        }
      }
    }

    if(valid){
      alert("usuario validado");
      window.location.href = "menu.html";
    }else{
      alert("usuario no validado");
    }
  };

  };

  

btnIngresar.addEventListener("click", ingresarSesion);
