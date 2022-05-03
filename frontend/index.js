const url = "http://localhost:3312/api/v1/usuarios/";

const correo = document.getElementById("txtCorreo").value;
const contra = document.getElementById("txtPassword").value;
const btnIngresar = document.getElementById("btnIngresar");

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

btnIngresar.addEventListener("click", ingresarSesion());
