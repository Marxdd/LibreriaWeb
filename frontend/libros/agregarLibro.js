const URLVideojuego = "http://localhost:3312/api/v1/videojuego/";
const sessionUser = new URLSearchParams(window.location.search);
const _id = sessionUser.get("usuario");
const configFetch = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
        'Content-Type': 'application/json'
    }
};

agregarEventoRegresar();
agregarEventoRegistrar();



function agregarEventoRegistrar(){
    const btnRegistrar = document.getElementById("registrarse");
    btnRegistrar.addEventListener("click",agregarVideojuego);
}

async function agregarVideojuego(){
    const inTitulo = document.getElementById("titulo").value;
    const inGenero = document.getElementById("genero").value;
    const inClasificacion = document.getElementById("clasificacion").value;
    const inConsola = document.getElementById("consola").value;
    const inFabricante = document.getElementById("fabricante").value;
    const inVersion = document.getElementById("version").value;


    const vid = {
        titulo:inTitulo,
        genero:inGenero,
        clasificacion:inClasificacion,
        consola:inConsola,
        fabricante:inFabricante,
        version:inVersion
    };

    configFetch.body = JSON.stringify(vid);

    const resData= await fetch(URLVideojuego,configFetch)
    .then(res=> res.json());

    alert(resData.status);
}





function agregarEventoRegresar(){
    const btnRegresar = document.getElementById("cancelar");
    btnRegresar.addEventListener("click",()=>{regresar(_id)});
}

function regresar(_id){
    window.location=`../menu.html?usuario=${_id}`;
}