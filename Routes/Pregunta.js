'use strict';

var express = require('express');
var PreguntaController = require('../Controllers/PreguntaController');
var api = express.Router();
var auth = require('../Middlewares/authenticate');

//Peticiones

//Prueba gratis
api.get('/obtener_preguntas_prueba_gratis', PreguntaController.obtener_preguntas_prueba_gratis);
api.get('/obtener_preguntas_examen', auth.auth, PreguntaController.obtener_preguntas_examen);

//Álgebra
api.post('/agregar_pregunta_algebra', auth.auth, PreguntaController.agregar_pregunta_algebra);
api.get('/listar_preguntas_filtro_algebra/:filtro?', auth.auth, PreguntaController.listar_preguntas_filtro_algebra);
api.get('/obtener_pregunta_algebra/:id', auth.auth, PreguntaController.obtener_pregunta_algebra);
api.put('/actualizar_pregunta_algebra/:id', auth.auth, PreguntaController.actualizar_pregunta_algebra);
api.delete('/eliminar_pregunta_algebra/:id', auth.auth, PreguntaController.eliminar_pregunta_algebra);

api.get('/obtener_preguntas_practica_algebra', auth.auth, PreguntaController.obtener_preguntas_practica_algebra);

//Anatomía
api.post('/agregar_pregunta_anatomia', auth.auth, PreguntaController.agregar_pregunta_anatomia);
api.get('/listar_preguntas_filtro_anatomia/:filtro?', auth.auth, PreguntaController.listar_preguntas_filtro_anatomia);
api.get('/obtener_pregunta_anatomia/:id', auth.auth, PreguntaController.obtener_pregunta_anatomia);
api.put('/actualizar_pregunta_anatomia/:id', auth.auth, PreguntaController.actualizar_pregunta_anatomia);
api.delete('/eliminar_pregunta_anatomia/:id', auth.auth, PreguntaController.eliminar_pregunta_anatomia);

api.get('/obtener_preguntas_practica_anatomia', auth.auth, PreguntaController.obtener_preguntas_practica_anatomia);

//Aritmética
api.post('/agregar_pregunta_aritmetica', auth.auth, PreguntaController.agregar_pregunta_aritmetica);
api.get('/listar_preguntas_filtro_aritmetica/:filtro?', auth.auth, PreguntaController.listar_preguntas_filtro_aritmetica);
api.get('/obtener_pregunta_aritmetica/:id', auth.auth, PreguntaController.obtener_pregunta_aritmetica);
api.put('/actualizar_pregunta_aritmetica/:id', auth.auth, PreguntaController.actualizar_pregunta_aritmetica);
api.delete('/eliminar_pregunta_aritmetica/:id', auth.auth, PreguntaController.eliminar_pregunta_aritmetica);

api.get('/obtener_preguntas_practica_aritmetica', auth.auth, PreguntaController.obtener_preguntas_practica_aritmetica);

//Biología
api.post('/agregar_pregunta_biologia', auth.auth, PreguntaController.agregar_pregunta_biologia);
api.get('/listar_preguntas_filtro_biologia/:filtro?', auth.auth, PreguntaController.listar_preguntas_filtro_biologia);
api.get('/obtener_pregunta_biologia/:id', auth.auth, PreguntaController.obtener_pregunta_biologia);
api.put('/actualizar_pregunta_biologia/:id', auth.auth, PreguntaController.actualizar_pregunta_biologia);
api.delete('/eliminar_pregunta_biologia/:id', auth.auth, PreguntaController.eliminar_pregunta_biologia);

api.get('/obtener_preguntas_practica_biologia', auth.auth, PreguntaController.obtener_preguntas_practica_biologia);

//Economía
api.post('/agregar_pregunta_economia', auth.auth, PreguntaController.agregar_pregunta_economia);
api.get('/listar_preguntas_filtro_economia/:filtro?', auth.auth, PreguntaController.listar_preguntas_filtro_economia);
api.get('/obtener_pregunta_economia/:id', auth.auth, PreguntaController.obtener_pregunta_economia);
api.put('/actualizar_pregunta_economia/:id', auth.auth, PreguntaController.actualizar_pregunta_economia);
api.delete('/eliminar_pregunta_economia/:id', auth.auth, PreguntaController.eliminar_pregunta_economia);

api.get('/obtener_preguntas_practica_economia', auth.auth, PreguntaController.obtener_preguntas_practica_economia);

//Educación Cívica
api.post('/agregar_pregunta_ed_civica', auth.auth, PreguntaController.agregar_pregunta_ed_civica);
api.get('/listar_preguntas_filtro_ed_civica/:filtro?', auth.auth, PreguntaController.listar_preguntas_filtro_ed_civica);
api.get('/obtener_pregunta_ed_civica/:id', auth.auth, PreguntaController.obtener_pregunta_ed_civica);
api.put('/actualizar_pregunta_ed_civica/:id', auth.auth, PreguntaController.actualizar_pregunta_ed_civica);
api.delete('/eliminar_pregunta_ed_civica/:id', auth.auth, PreguntaController.eliminar_pregunta_ed_civica);

api.get('/obtener_preguntas_practica_ed_civica', auth.auth, PreguntaController.obtener_preguntas_practica_ed_civica);

//Física
api.post('/agregar_pregunta_fisica', auth.auth, PreguntaController.agregar_pregunta_fisica);
api.get('/listar_preguntas_filtro_fisica/:filtro?', auth.auth, PreguntaController.listar_preguntas_filtro_fisica);
api.get('/obtener_pregunta_fisica/:id', auth.auth, PreguntaController.obtener_pregunta_fisica);
api.put('/actualizar_pregunta_fisica/:id', auth.auth, PreguntaController.actualizar_pregunta_fisica);
api.delete('/eliminar_pregunta_fisica/:id', auth.auth, PreguntaController.eliminar_pregunta_fisica);

api.get('/obtener_preguntas_practica_fisica', auth.auth, PreguntaController.obtener_preguntas_practica_fisica);

//Geografía
api.post('/agregar_pregunta_geografia', auth.auth, PreguntaController.agregar_pregunta_geografia);
api.get('/listar_preguntas_filtro_geografia/:filtro?', auth.auth, PreguntaController.listar_preguntas_filtro_geografia);
api.get('/obtener_pregunta_geografia/:id', auth.auth, PreguntaController.obtener_pregunta_geografia);
api.put('/actualizar_pregunta_geografia/:id', auth.auth, PreguntaController.actualizar_pregunta_geografia);
api.delete('/eliminar_pregunta_geografia/:id', auth.auth, PreguntaController.eliminar_pregunta_geografia);

api.get('/obtener_preguntas_practica_geografia', auth.auth, PreguntaController.obtener_preguntas_practica_geografia);

//Geometría
api.post('/agregar_pregunta_geometria', auth.auth, PreguntaController.agregar_pregunta_geometria);
api.get('/listar_preguntas_filtro_geometria/:filtro?', auth.auth, PreguntaController.listar_preguntas_filtro_geometria);
api.get('/obtener_pregunta_geometria/:id', auth.auth, PreguntaController.obtener_pregunta_geometria);
api.put('/actualizar_pregunta_geometria/:id', auth.auth, PreguntaController.actualizar_pregunta_geometria);
api.delete('/eliminar_pregunta_geometria/:id', auth.auth, PreguntaController.eliminar_pregunta_geometria);

api.get('/obtener_preguntas_practica_geometria', auth.auth, PreguntaController.obtener_preguntas_practica_geometria);

//Historia del Perú
api.post('/agregar_pregunta_historia_peru', auth.auth, PreguntaController.agregar_pregunta_historia_peru);
api.get('/listar_preguntas_filtro_historia_peru/:filtro?', auth.auth, PreguntaController.listar_preguntas_filtro_historia_peru);
api.get('/obtener_pregunta_historia_peru/:id', auth.auth, PreguntaController.obtener_pregunta_historia_peru);
api.put('/actualizar_pregunta_historia_peru/:id', auth.auth, PreguntaController.actualizar_pregunta_historia_peru);
api.delete('/eliminar_pregunta_historia_peru/:id', auth.auth, PreguntaController.eliminar_pregunta_historia_peru);

api.get('/obtener_preguntas_practica_historia_peru', auth.auth, PreguntaController.obtener_preguntas_practica_historia_peru);

//Historia Universal
api.post('/agregar_pregunta_historia_universal', auth.auth, PreguntaController.agregar_pregunta_historia_universal);
api.get('/listar_preguntas_filtro_historia_universal/:filtro?', auth.auth, PreguntaController.listar_preguntas_filtro_historia_universal);
api.get('/obtener_pregunta_historia_universal/:id', auth.auth, PreguntaController.obtener_pregunta_historia_universal);
api.put('/actualizar_pregunta_historia_universal/:id', auth.auth, PreguntaController.actualizar_pregunta_historia_universal);
api.delete('/eliminar_pregunta_historia_universal/:id', auth.auth, PreguntaController.eliminar_pregunta_historia_universal);

api.get('/obtener_preguntas_practica_historia_universal', auth.auth, PreguntaController.obtener_preguntas_practica_historia_universal);

//Lenguaje
api.post('/agregar_pregunta_lenguaje', auth.auth, PreguntaController.agregar_pregunta_lenguaje);
api.get('/listar_preguntas_filtro_lenguaje/:filtro?', auth.auth, PreguntaController.listar_preguntas_filtro_lenguaje);
api.get('/obtener_pregunta_lenguaje/:id', auth.auth, PreguntaController.obtener_pregunta_lenguaje);
api.put('/actualizar_pregunta_lenguaje/:id', auth.auth, PreguntaController.actualizar_pregunta_lenguaje);
api.delete('/eliminar_pregunta_lenguaje/:id', auth.auth, PreguntaController.eliminar_pregunta_lenguaje);

api.get('/obtener_preguntas_practica_lenguaje', auth.auth, PreguntaController.obtener_preguntas_practica_lenguaje);

//Literatura
api.post('/agregar_pregunta_literatura', auth.auth, PreguntaController.agregar_pregunta_literatura);
api.get('/listar_preguntas_filtro_literatura/:filtro?', auth.auth, PreguntaController.listar_preguntas_filtro_literatura);
api.get('/obtener_pregunta_literatura/:id', auth.auth, PreguntaController.obtener_pregunta_literatura);
api.put('/actualizar_pregunta_literatura/:id', auth.auth, PreguntaController.actualizar_pregunta_literatura);
api.delete('/eliminar_pregunta_literatura/:id', auth.auth, PreguntaController.eliminar_pregunta_literatura);

api.get('/obtener_preguntas_practica_literatura', auth.auth, PreguntaController.obtener_preguntas_practica_literatura);

//Química
api.post('/agregar_pregunta_quimica', auth.auth, PreguntaController.agregar_pregunta_quimica);
api.get('/listar_preguntas_filtro_quimica/:filtro?', auth.auth, PreguntaController.listar_preguntas_filtro_quimica);
api.get('/obtener_pregunta_quimica/:id', auth.auth, PreguntaController.obtener_pregunta_quimica);
api.put('/actualizar_pregunta_quimica/:id', auth.auth, PreguntaController.actualizar_pregunta_quimica);
api.delete('/eliminar_pregunta_quimica/:id', auth.auth, PreguntaController.eliminar_pregunta_quimica);

api.get('/obtener_preguntas_practica_quimica', auth.auth, PreguntaController.obtener_preguntas_practica_quimica);

//Razonamiento Matemático
api.post('/agregar_pregunta_raz_matematico', auth.auth, PreguntaController.agregar_pregunta_raz_matematico);
api.get('/listar_preguntas_filtro_raz_matematico/:filtro?', auth.auth, PreguntaController.listar_preguntas_filtro_raz_matematico);
api.get('/obtener_pregunta_raz_matematico/:id', auth.auth, PreguntaController.obtener_pregunta_raz_matematico);
api.put('/actualizar_pregunta_raz_matematico/:id', auth.auth, PreguntaController.actualizar_pregunta_raz_matematico);
api.delete('/eliminar_pregunta_raz_matematico/:id', auth.auth, PreguntaController.eliminar_pregunta_raz_matematico);

api.get('/obtener_preguntas_practica_raz_matematico', auth.auth, PreguntaController.obtener_preguntas_practica_raz_matematico);

//Razonamiento Verbal
api.post('/agregar_pregunta_raz_verbal', auth.auth, PreguntaController.agregar_pregunta_raz_verbal);
api.get('/listar_preguntas_filtro_raz_verbal/:filtro?', auth.auth, PreguntaController.listar_preguntas_filtro_raz_verbal);
api.get('/obtener_pregunta_raz_verbal/:id', auth.auth, PreguntaController.obtener_pregunta_raz_verbal);
api.put('/actualizar_pregunta_raz_verbal/:id', auth.auth, PreguntaController.actualizar_pregunta_raz_verbal);
api.delete('/eliminar_pregunta_raz_verbal/:id', auth.auth, PreguntaController.eliminar_pregunta_raz_verbal);

api.get('/obtener_preguntas_practica_raz_verbal', auth.auth, PreguntaController.obtener_preguntas_practica_raz_verbal);

//Trigonometría
api.post('/agregar_pregunta_trigonometria', auth.auth, PreguntaController.agregar_pregunta_trigonometria);
api.get('/listar_preguntas_filtro_trigonometria/:filtro?', auth.auth, PreguntaController.listar_preguntas_filtro_trigonometria);
api.get('/obtener_pregunta_trigonometria/:id', auth.auth, PreguntaController.obtener_pregunta_trigonometria);
api.put('/actualizar_pregunta_trigonometria/:id', auth.auth, PreguntaController.actualizar_pregunta_trigonometria);
api.delete('/eliminar_pregunta_trigonometria/:id', auth.auth, PreguntaController.eliminar_pregunta_trigonometria);

api.get('/obtener_preguntas_practica_trigonometria', auth.auth, PreguntaController.obtener_preguntas_practica_trigonometria);

//Exportar los módulos
module.exports = api;