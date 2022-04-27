const URLLibro = "http://localhost:3312/api/v1/libro/";
const sessionUser = new URLSearchParams(window.location.search);
const _id = sessionUser.get("usuario");
const configFetch = {
    method: 'PUT',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
        'Content-Type': 'application/json'
    }
};

agregarEventoId();
agregarEventoRegresar();
agregarEventoActualizar();

function agregarEventoActualizar() {
    const btnActualizar = document.getElementById("actualizar");
    btnActualizar.addEventListener("click", actualizarVideojuego);
}

async function actualizarVideojuego() {
    const inId = document.getElementById("id").value;
    const inClasificacion = document.getElementById("clasificacion").value;
    const update = {
        id:inId,
        clasificacion: inClasificacion
    };
    configFetch.method = "PUT";
    configFetch.body = JSON.stringify(update);
    const resData = await fetch(URLVideojuego, configFetch)
        .then(res => res.json());

    alert(resData.status);
}

function agregarEventoId() {
    const inId = document.getElementById("id");
    inId.addEventListener("keyup", agregarCampos)
}

async function agregarCampos(event) {
    const id = event.path[0].value;


    if (!/^ *$/.test(id)) {
        configFetch.method = "GET";
        const data = await fetch(URLVideojuego + id, configFetch)
            .then(res => res.json())
            .catch(error => null);
        cambiarValores(data);
    }
}

function cambiarValores(data) {
    const inTitulo = document.getElementById("titulo");
    const inGenero = document.getElementById("genero");
    const inClasificacion = document.getElementById("clasificacion");
    const inConsola = document.getElementById("consola");
    const inFabricante = document.getElementById("fabricante");
    const inVersion = document.getElementById("version");

    inTitulo.value = data.titulo;
    inGenero.value = data.genero;
    inClasificacion.value = data.clasificacion;
    inConsola.value = data.consola;
    inFabricante.value = data.fabricante;
    inVersion.value = data.version;
}

function agregarEventoRegresar() {
    const btnRegresar = document.getElementById("cancelar");
    btnRegresar.addEventListener("click", () => {
        regresar(_id)
    });
}

function regresar(_id) {
    window.location = `../menu.html?usuario=${_id}`;
}