const sessionUser = new URLSearchParams(window.location.search);
const _id = sessionUser.get("usuario");
var checked = false;

agregarEventoRegresar();
consultarUsuarios();

async function consultarUsuarios() {
  if (checked) {
    checked = false;
  }

  const tableUsuarios = document.getElementById("usuarios");

  var usuarios;
  const Http = new XMLHttpRequest();
  const url = "http://localhost:3312/api/v1/usuarios";
  Http.open("GET", url);
  Http.send();

  Http.onreadystatechange = (e) => {
    var str = Http.responseText;

    if (!checked) {
      usuarios = JSON.parse(str);
      var inner = `<thead>
              <tr>
                <th>Correo Electronico</th>
                <th>Nombre</th>
                <th>Es Administrador</th>
              </tr>
            </thead>`;
      

      for (let i = 0; i < usuarios.length; i++) {
        var correo = usuarios[i].correo;
        var nombre = usuarios[i].nombre;
        var esAdmin = usuarios[i].esAdmin;

        inner += `<tbody>
              <tr>
                <td>${correo}</td>
                <td>${nombre}</td>
                <td>${esAdmin ? "Si": "No"}</td>
              </tr>
            </tbody>`;
      }

      tableUsuarios.innerHTML = inner;
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
  window.location = `../menu.html?usuario=${_id}`;
}
