'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Se crea un modelo de objeto para el resultado de práctica de Álgebra
var ReviewsSchema = Schema({
    user: {type: Schema.ObjectId, ref: 'user', required: true},
    estrellas: {type: Number, required: false},
    comentario: {type: String, required: true},
    destacado: {type: Boolean, required: false},
    
    createdAt: {type: Date, default: Date.now, required: true}
});

module.exports = mongoose.model('reviews', ReviewsSchema);