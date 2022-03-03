const usuarioControl = require('./Controller/usuariosController');
const readline = require('readline-sync');
require('mongoose');

let LibrosController = require('./Controller/librosController');
let noSql = new LibrosController()

usuarioControl.conexionBD();

menuCredenciales();




async function menuCredenciales() {
    do {
        var opcion = readline.questionInt('Qué desea hacer?\n1: iniciar sesion\n2: crear cuenta\n3: cerrar aplicacion \n');
        if (opcion == 1) {
            await iniciarSesion();
        } else if (opcion == 2) {
           await crearCuenta();
        }
    } while (opcion != 3);
}

async function crearCuenta(){
    let correo = readline.question('ingrese su correo: ');
    let nombre = readline.question('ingrese su nombre: ');
    do {
        var contra = readline.question('ingrese su contrasena: ');
        var contra2 = readline.question('ingrese su contraseña de nuevo: ');
    } while (contra != contra2);

    do {
        var esAdmin = readline.questionInt('sera cuenta de administrador?\n1: Usuario normal\n2: Admin\n');
        if (esAdmin == 1) {
            await usuarioControl.addUsuario({ nombre: nombre, correo: correo, contra: contra, esAdmin: false });
        } else if (esAdmin == 2) {
            await usuarioControl.addUsuario({ nombre: nombre, correo: correo, contra: contra, esAdmin: true });
        }

    } while (esAdmin != 1 && esAdmin != 2);
    usuarioControl.cerrar();
}

async function iniciarSesion() {
    let correo = readline.question('ingrese su correo: ');
    let contra = readline.question('ingrese su contrasenia: ');
    let usuario = await usuarioControl.getUsuarioByCorreoyContra(correo, contra);
    if (usuario == null) {
        console.log('no existe');
    } else {
        if (usuario.esAdmin) {
            await menuAdmin();
        } else {
            await menuPrincipal();
        }
    }
    usuarioControl.cerrar();
}

async function menuPrincipal() {
    console.log('menu normal');
}

async function menuAdmin() {
    console.log('menu admin');
    do {
        var opcion = readline.questionInt('Que desea hacer?\n1: agregar libro \n2: eliminar libro \n3: actualizar libro \n4: consultar un libro\n5: consultar todos los libros \n6: salir \n Elegir opcion: ');
        if (opcion == 1) {
            let autor = readline.question('ingrese un autor del libro: ');
            let titulo = readline.question('ingrese el titulo del libro: ');
            let fechaPublicacion = readline.question('ingrese la fecha de publicacion: ');
            let isbn = readline.question('ingrese el isbn del libro: ');
            let editorial = readline.question('ingrese la editorial del libro: ');
     
            await noSql.agregarLibro({
                autor: autor,
                titulo: titulo,
                fechaPublicacion: fechaPublicacion,
                isbn: isbn,
                editorial: editorial
            });
        } else if (opcion == 2) {
            let tituloLibro = readline.question('ingrese el titulo del libro que desea eliminar: ');
            await noSql.eliminarLibro(tituloLibro);
        } else if (opcion == 3) {
            let autor = readline.question('ingrese el autor del que se desea actualizar: ');
            let tituloNuevo = readline.question('ingrese el nuevo titulo del libro que desea actualizar: ');
            await noSql.actualizarLibro(autor,tituloNuevo);
        } else if (opcion == 4){
            let libroConsultar = readline.question('ingrese el libro que se desea consultar: ');
            await noSql.consultarUnLibro(libroConsultar);
        } else if (opcion == 5){
            await noSql.mostrarTodos();
        }
    } while (opcion != 6);
}
