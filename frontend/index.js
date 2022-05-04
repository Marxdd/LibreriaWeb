var correo = document.getElementById("txtCorreo").value;
var contra = document.getElementById("txtPassword").value;
var btnIngresar = document.getElementById("btnIngresar");
var usuarios = {};

async function probarConexion() {
  const Http = new XMLHttpRequest();
  const url = "http://localhost:3312/api/v1/usuarios";
  Http.open("GET", url);
  Http.send();

  Http.onreadystatechange = (e) => {
    console.log(Http.responseText);
  };
 
 // usuarios = Http.responseText;
  try {
     usuarios = JSON.stringify(Http.responseText);
     console.log(usuarios);
  } catch (error) {
    alert(error);
  }
}

async function ingresarSesion() {
  const validar = await validarUsuario(correo, contra);

  if (validar != null) {
    window.location = `menu.html?usuario=${validar}`;
  } else {
    alert("Validacion denegada");
  }
}

async function validarUsuario(usuario, contra) {
  var user = { correo: usuario, contra: contra };

  const data = await fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data));

  for (let i = 0; i < data.length; i++) {
    if (data[i].correo === usuario) {
      if (data[i].contrasena === contra) return data[i]._id;
    }
  }
  return null;
}

btnIngresar.addEventListener("click", probarConexion);
