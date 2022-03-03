const usuarioControl = require('./Controller/usuariosController');
const readline = require('readline-sync');
require('mongoose');

let LibrosController = require('./Controller/librosController');
let noSql = new LibrosController()

usuarioControl.conexionBD();

//en construcción
do {
    var opcion = readline.questionInt('Qué desea hacer?\n1: iniciar sesión\n2: crear cuenta\n3: cerrar aplicación');
    if (opcion == 1) {
        let correo = readline.question('ingrese su correo: ');
        let contra = readline.question('ingrese su contraseña: ');
        let usuario = usuarioControl.getUsuarioByCorreoyContra(correo,contra);
        console.log(usuario.nombre);
        do {
            var opcion = readline.questionInt('Que desea hacer?\n1: agregar libro \n2: eliminar libro \n3: actualizar libro \n4: consultar todos los libros \n5: salir \n Elegir opcion: ');
            if (opcion == 1) {
                let autor = readline.question('ingrese un autor del libro: ');
                let titulo = readline.question('ingrese el titulo del libro: ');
                let fechaPublicacion = readline.question('ingrese la fecha de publicacion: ');
                let isbn = readline.question('ingrese el isbn del libro: ');
                let editorial = readline.question('ingrese la editorial del libro: ');
        
                noSql.agregarLibro({
                    autor: autor,
                    titulo: titulo,
                    fechaPublicacion: fechaPublicacion,
                    isbn: isbn,
                    editorial: editorial
                });
            } else if (opcion == 2) {
                let tituloLibro = readline.question('ingrese el titulo del libro que desea eliminar: ');
                noSql.eliminarLibro(tituloLibro);
            } else if (opcion == 3) {
                let autor = readline.question('ingrese el autor del que se desea actualizar: ');
                let tituloNuevo = readline.question('ingrese el nuevo titulo del libro que desea actualizar: ');
                noSql.actualizarLibro(autor,tituloNuevo);
            } else if (opcion == 4){
                let libroConsultar = readline.question('ingrese el libro que se desea consultar: ');
                noSql.consultarUnLibro(libroConsultar);
            } else if (opcion == 5){
                noSql.mostrarTodos();
            }
        } while (opcion != 6);
    } else if (opcion == 2) {
        let correo = readline.question('ingrese su correo: ');
        let nombre = readline.question('ingrese su nombre');
        do {
            var contra = readline.question('ingrese su contraseña: ');
            var contra2 = readline.question('ingrese su contraseña de nuevo: ');
        } while (contra != contra2);
        
        do{
        var esAdmin = readline.questionInt('sera cuenta de administrador?\n1: Usuario normal\n2: Admin');
            if (esAdmin == 1) {
                usuarioControl.addUsuario({nombre: nombre, correo: correo, contra: contra, esAdmin: false});
            } else if(esAdmin == 2){
                usuarioControl.addUsuario({nombre: nombre, correo: correo, contra: contra, esAdmin: true});
            }
            
        } while (esAdmin != 1 && esAdmin != 2);
    }
} while (opcion != 3);


function menu(op){

}
