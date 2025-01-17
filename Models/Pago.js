'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PagoSchema = Schema({
    user: {type: Schema.ObjectId, ref: 'user', required: true},
    npago: {type: Number, required: true},
    subtotal: {type: Number, required: true},
    transaccion: {type: String, required: true},
    estado: {type: String, required: true},
    plan: {type: String, required: true},
    createdAt: {type: Date, required: true},
    vencimiento: {type: Date, required: true}
});

module.exports = mongoose.model('pago', PagoSchema);