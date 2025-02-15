'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    verificado: {type: Boolean, default: false, required: true},
    codigo: {type: String, required: true},
    token_pass: {type: String, required: false},
    nombres: {type: String, required: true},
    apellidos: {type: String, required: true},
    dni: {type: String, required: true},
    email: {type: String, required: true},
    telefono: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, default: 'USER', required: true},
    genero: {type: String, required: false},
    f_nacimiento: {type: String, required: false},
    universidad: {type: String, required: false},
    carrera: {type: String, required: false},
    area: {type: String, required: false},
    codigo_referido: {type: String, required: false},
    perfil: {type: String, default: 'Perfil.png', required: true},

    createdAt: {type: Date, default: Date.now, required: true}
});

module.exports = mongoose.model('user', UserSchema);