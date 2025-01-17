'use strict';

var express = require('express');
var ReviewController = require('../Controllers/ReviewController');
var api = express.Router();
var auth = require('../Middlewares/authenticate');

//Álgebra
api.post('/registro_review_user', auth.auth, ReviewController.registro_review_user);
api.get('/obtener_reviews', ReviewController.obtener_reviews);
api.put('/destacar_review_admin/:id', auth.auth, ReviewController.destacar_review_admin);
api.delete('/eliminar_review_admin/:id', auth.auth, ReviewController.eliminar_review_admin);

//Exportar los módulos
module.exports = api;