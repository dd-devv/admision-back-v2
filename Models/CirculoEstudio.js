'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Se crea un modelo de objeto para el cliente
var circuloSchema = Schema({
    titulo: {type: String, required: true},
    icono: {type: String, required: true},
    color_fondo: {type: String, required: true},
    color_borde: {type: String, required: true},
    link: {type: String, required: true},
    
    createdAt: {type: Date, default: Date.now, required: true}
});

module.exports = mongoose.model('circulo', circuloSchema);