const URLVideojuegos = "http://localhost:3312/api/v1/videojuego/";
const sessionUser = new URLSearchParams(window.location.search);
const _id = sessionUser.get("usuario");
const configFetch = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
        'Content-Type': 'application/json'
    }
};

agregarEventoRegresar();
consultarVideojuegos();

async function consultarVideojuegos(){
    const data= await fetch(URLVideojuegos,configFetch)
    .then(response => response.json());
    const tbody = document.getElementsByTagName("tbody")[0];
    tbody.innerHTML="";
    data.forEach(e=>{
        tbody.innerHTML += agregarFila(e).outerHTML;
    });
}



function agregarFila(data){
    const row = document.createElement("tr");
    const colTitulo = document.createElement("td");
    const colGenero = document.createElement("td");
    const colClasificacion = document.createElement("td");
    const colConsola = document.createElement("td");
    const colFabricante = document.createElement("td");
    const colVersion = document.createElement("td");
    colTitulo.innerText=data.titulo;
    colGenero.innerText=data.genero;
    colClasificacion.innerText=data.clasificacion;
    colConsola.innerText=data.consola;
    colFabricante.innerText=data.fabricante;
    colVersion.innerText=data.version;
    row.innerHTML += colTitulo.outerHTML;
    row.innerHTML += colGenero.outerHTML;
    row.innerHTML += colClasificacion.outerHTML;
    row.innerHTML += colConsola.outerHTML;
    row.innerHTML += colFabricante.outerHTML;
    row.innerHTML += colVersion.outerHTML;
    return row;

}

function agregarEventoRegresar(){
    const btnRegresar = document.getElementById("cancelar");
    btnRegresar.addEventListener("click",()=>{regresar(_id)});
}

function regresar(_id){
    window.location=`../menu.html?usuario=${_id}`;
}