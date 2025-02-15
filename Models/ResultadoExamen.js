'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Se crea un modelo de objeto para el resultado de práctica de Álgebra
var ResultadoExamenSchema = Schema({
    user: {type: Schema.ObjectId, ref: 'user', required: true},
    puntos: {type: Number, required: true},
    acertadas: {type: Number, required: true},
    nota: {type: Number, required: true},
    
    createdAt: {type: Date, default: Date.now, required: true}
});

module.exports = mongoose.model('resultadoExamen', ResultadoExamenSchema);