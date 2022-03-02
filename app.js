const usuarioControl = require('./Controller/usuariosController');
const readline = require('readline-sync');
require('mongoose');


usuarioControl.conexionBD();

//en construcción
do {
    var opcion = readline.questionInt('Qué desea hacer?\n1: iniciar sesión\n2: crear cuenta\n3: cerrar aplicación');
    if (opcion == 1) {
        let correo = readline.question('ingrese su correo: ');
        let contra = readline.question('ingrese su contraseña: ');
        let usuario = usuarioControl.getUsuarioByCorreoyContra(correo,contra);
        console.log(usuario.nombre);
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
