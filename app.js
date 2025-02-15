'use strict'

var express = require('express');
require("dotenv").config();
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 3200;

var server = require('http').createServer(app);

var user_route = require('./Routes/User');
var pregunta_route = require('./Routes/Pregunta');
var practicas_route = require('./Routes/Practicas');
var pagos_route = require('./Routes/Pago');
var examen_route = require('./Routes/Examen');
var reviews_route = require('./Routes/Reviews');

//Conexión a base de datos MongoDB
mongoose
  .connect(process.env.URL_MONGO, {
    useNewUrlParser: true,  // Utilizar el nuevo analizador de URL
    useUnifiedTopology: true,  // Utilizar el nuevo motor de descubrimiento y monitoreo del servidor
  })
  .then(() => {
    console.log('Conexión exitosa a MongoDB');
    server.listen(port, function () {
      console.log('Servidor en funcionamiento en el puerto: ' + port);
    });
  })
  .catch((err) => {
    console.error('Error al conectar a MongoDB:', err);
  });

const cors = require('cors');

app.use(cors({

    origin: '*'

}));

//Para convertir las pticiones en formato json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/test', user_route);
app.use('/test', pregunta_route);
app.use('/test', practicas_route);
app.use('/test', pagos_route);
app.use('/test', examen_route);
app.use('/test', reviews_route);

module.exports = app;