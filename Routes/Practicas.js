'use strict';

var express = require('express');
var resultadoPracticasController = require('../Controllers/ResultadoPracticasController');

var api = express.Router();
var auth = require('../Middlewares/authenticate');

//ADMIN
api.get('/obtener_resultados_practica_admin', auth.auth, resultadoPracticasController.obtener_resultados_practica_admin);

//Álgebra
api.post('/registro_resultado_practicas_algebra', auth.auth, resultadoPracticasController.registro_resultado_practicas_algebra);
api.get('/obtener_resultado_practicas_algebra/:id', auth.auth, resultadoPracticasController.obtener_resultado_practicas_algebra);

//Anatomía
api.post('/registro_resultado_practicas_anatomia', auth.auth, resultadoPracticasController.registro_resultado_practicas_anatomia);
api.get('/obtener_resultado_practicas_anatomia/:id', auth.auth, resultadoPracticasController.obtener_resultado_practicas_anatomia);

//Aritmética
api.post('/registro_resultado_practicas_aritmetica', auth.auth, resultadoPracticasController.registro_resultado_practicas_aritmetica);
api.get('/obtener_resultado_practicas_aritmetica/:id', auth.auth, resultadoPracticasController.obtener_resultado_practicas_aritmetica);

//Biología
api.post('/registro_resultado_practicas_biologia', auth.auth, resultadoPracticasController.registro_resultado_practicas_biologia);
api.get('/obtener_resultado_practicas_biologia/:id', auth.auth, resultadoPracticasController.obtener_resultado_practicas_biologia);

//Economía
api.post('/registro_resultado_practicas_economia', auth.auth, resultadoPracticasController.registro_resultado_practicas_economia);
api.get('/obtener_resultado_practicas_economia/:id', auth.auth, resultadoPracticasController.obtener_resultado_practicas_economia);

//Educación Cívica
api.post('/registro_resultado_practicas_ed_civica', auth.auth, resultadoPracticasController.registro_resultado_practicas_ed_civica);
api.get('/obtener_resultado_practicas_ed_civica/:id', auth.auth, resultadoPracticasController.obtener_resultado_practicas_ed_civica);

//Física
api.post('/registro_resultado_practicas_fisica', auth.auth, resultadoPracticasController.registro_resultado_practicas_fisica);
api.get('/obtener_resultado_practicas_fisica/:id', auth.auth, resultadoPracticasController.obtener_resultado_practicas_fisica);

//Geografía
api.post('/registro_resultado_practicas_geografia', auth.auth, resultadoPracticasController.registro_resultado_practicas_geografia);
api.get('/obtener_resultado_practicas_geografia/:id', auth.auth, resultadoPracticasController.obtener_resultado_practicas_geografia);

//Geometría
api.post('/registro_resultado_practicas_geometria', auth.auth, resultadoPracticasController.registro_resultado_practicas_geometria);
api.get('/obtener_resultado_practicas_geometria/:id', auth.auth, resultadoPracticasController.obtener_resultado_practicas_geometria);

//Historia del perú
api.post('/registro_resultado_practicas_historia_peru', auth.auth, resultadoPracticasController.registro_resultado_practicas_historia_peru);
api.get('/obtener_resultado_practicas_historia_peru/:id', auth.auth, resultadoPracticasController.obtener_resultado_practicas_historia_peru);

//Historia Universal
api.post('/registro_resultado_practicas_historia_universal', auth.auth, resultadoPracticasController.registro_resultado_practicas_historia_universal);
api.get('/obtener_resultado_practicas_historia_universal/:id', auth.auth, resultadoPracticasController.obtener_resultado_practicas_historia_universal);

//Lenguaje
api.post('/registro_resultado_practicas_lenguaje', auth.auth, resultadoPracticasController.registro_resultado_practicas_lenguaje);
api.get('/obtener_resultado_practicas_lenguaje/:id', auth.auth, resultadoPracticasController.obtener_resultado_practicas_lenguaje);

//Literatura
api.post('/registro_resultado_practicas_literatura', auth.auth, resultadoPracticasController.registro_resultado_practicas_literatura);
api.get('/obtener_resultado_practicas_literatura/:id', auth.auth, resultadoPracticasController.obtener_resultado_practicas_literatura);

//Química
api.post('/registro_resultado_practicas_quimica', auth.auth, resultadoPracticasController.registro_resultado_practicas_quimica);
api.get('/obtener_resultado_practicas_quimica/:id', auth.auth, resultadoPracticasController.obtener_resultado_practicas_quimica);

//Razonamiento Matemático
api.post('/registro_resultado_practicas_raz_matematico', auth.auth, resultadoPracticasController.registro_resultado_practicas_raz_matematico);
api.get('/obtener_resultado_practicas_raz_matematico/:id', auth.auth, resultadoPracticasController.obtener_resultado_practicas_raz_matematico);

//Razonamiento Verbal
api.post('/registro_resultado_practicas_raz_verbal', auth.auth, resultadoPracticasController.registro_resultado_practicas_raz_verbal);
api.get('/obtener_resultado_practicas_raz_verbal/:id', auth.auth, resultadoPracticasController.obtener_resultado_practicas_raz_verbal);

//Razonamiento Verbal
api.post('/registro_resultado_practicas_trigonometria', auth.auth, resultadoPracticasController.registro_resultado_practicas_trigonometria);
api.get('/obtener_resultado_practicas_trigonometria/:id', auth.auth, resultadoPracticasController.obtener_resultado_practicas_trigonometria);

module.exports = api;