var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../Controller/usuariosController');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config({path: '../config.env'});
//

router.post('/register', function(req, res) {
  
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    
    User.create({
        correo: req.body.correo,
        contrasena: hashedPassword,
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        telefono: req.body.telefono
    },
    function (err, user) {
      if (err) return res.status(500).send("Huvo un problema registrando el usuario.")
      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    }); 
  });


  router.get('/me', function(req, res) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No hay token' });
    
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Fallo en autenticar token.' });
      
      User.consultarUnDato(decoded.id,
         {contrasena : 0} ,
        function (err, user) {
        if (err) return res.status(500).send("Huvo un problema encontrando el usuario");
        if (!user) return res.status(404).send("No se encontro el usuario.");
        
        res.status(200).send(user);
      });
    });
  });


  router.post('/login', function(req, res) {

    User.consultarUnDato({ correo: req.body.correo }, function (err, user) {
      if (err) return res.status(500).send('Error en el servidor.');
      if (!user) return res.status(404).send('No se encontro el usuario.');
      
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
      
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      
      res.status(200).send({ auth: true, token: token });
    });
    
  });

  router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
  });

  module.exports = router;