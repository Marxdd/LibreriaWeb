const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const usuarioRoutes = require('./routes/UsuarioRoutes');
const libroRouters = require('./routes/LibroRouters');
const AuthController = require('./Auth/AuthController');

const corsOptions = {
    origin:"*",
    Credential:true,
    optionSuccessStatus:200,
  } 

const globalErrorHandler = require('./utils/appError');
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors(corsOptions));

//Routers
app.use('/api/v1/usuarios', usuarioRoutes);
app.use('/api/v1/libros', libroRouters);
app.use('api/auth', AuthController);


app.all('*', (req, resp, next) =>{
    next(new globalErrorHandler(`No se pudo acceder a ${req.originalUrl} en el servidor`, 404));
});

//Global error Handler 
app.use(globalErrorHandler);


module.exports = app;



