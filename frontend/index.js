const url = "http://localhost:3312/api/v1/usuario/";

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

  const data = await fetch(url,{
    method: "POST", // or 'PUT'
    body: JSON.stringify(user), // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) => alert("Error:", error))
    .then((response) => alert("Success:", response));


  for (let i = 0; i < data.length; i++) {
    if (data[i].correo === usuario) {
      if (data[i].contrasena === contra) return data[i]._id;
    }
  }
  return null;
}

btnIngresar.addEventListener("click", ingresarSesion());
