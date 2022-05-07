const sessionUser = new URLSearchParams(window.location.search);
const _id = sessionUser.get("usuario");
var checked = false;

agregarEventoRegresar();
consultarLibros();

async function consultarLibros() {
  if (checked) {
    checked = false;
  }

  const tableLibros = document.getElementById("libros");

  var libros;
  const Http = new XMLHttpRequest();
  const url = "http://localhost:3312/api/v1/libros";
  Http.open("GET", url);
  Http.send();

  Http.onreadystatechange = (e) => {
    var str = Http.responseText;

    if (!checked) {
      libros = JSON.parse(str);
      var inner = `<thead>
              <tr>
                <th>ISBN</th>
                <th>Título</th>
                <th>Autor</th>
                <th>Fecha de Publicación</th>
                <th>Editorial</th>
              </tr>
            </thead>`;

      for (let i = 0; i < libros.length; i++) {
        var isbn = libros[i].isbn;
        var titulo = libros[i].titulo;
        var autor = libros[i].autor;
        var fecha = libros[i].fechaPublicacion;
        var editorial = libros[i].editorial;

        inner += `<tbody>
              <tr>
                <td>${isbn}</td>
                <td>${titulo}</td>
                <td>${autor}</td>
                <td>${fecha}</td>
                <td>${editorial}</td>
              </tr>
            </tbody>`;
      }

      tableLibros.innerHTML = inner;
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
