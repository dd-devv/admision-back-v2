'use strict';

var express = require('express');
var resultadoController = require('../Controllers/ResultadoController');

var api = express.Router();
var auth = require('../Middlewares/authenticate');

//Álgebra
api.post('/registro_resultado_examen', auth.auth, resultadoController.registro_resultado_examen);
api.get('/obtener_resultados_examen/:id', auth.auth, resultadoController.obtener_resultados_examen);
api.get('/obtener_ranking_usuarios', auth.auth, resultadoController.obtener_ranking_usuarios);


module.exports = api;