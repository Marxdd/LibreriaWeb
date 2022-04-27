const URLUsuario = "http://localhost:3312/api/v1/usuario/";
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
    btnActualizar.addEventListener("click", actualizarUsuario);
}

async function actualizarUsuario() {
    const inId = document.getElementById("id").value;
    const inDireccion = document.getElementById("direccion").value;
    const update = {
        id:inId,
        direccion: inDireccion
    };
    configFetch.method = "PUT";
    configFetch.body = JSON.stringify(update);
    const resData = await fetch(URLUsuario, configFetch)
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
        const data = await fetch(URLUsuario + id, configFetch)
            .then(res => res.json())
            .catch(error => null);
        cambiarValores(data);
    }
}

function cambiarValores(data) {
    const inNombre = document.getElementById("nombre");
    const inDireccion = document.getElementById("direccion");
    const inTelefono = document.getElementById("telefono");
    const inCorreo = document.getElementById("correo");
    const inContra = document.getElementById("contrasena");

    inNombre.value = data.nombre;
    inDireccion.value = data.direccion;
    inTelefono.value = data.telefono;
    inCorreo.value = data.correo;
    inContra.value = data.contrasena;
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