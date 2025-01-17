'use strict';

var express = require('express');
var pagoController = require('../Controllers/PagoController');

var api = express.Router();
var auth = require('../Middlewares/authenticate');

api.post('/registro_reservacion_cliente', auth.auth, pagoController.registro_reservacion_cliente);
api.get('/obtener_pagos_cliente/:id', auth.auth, pagoController.obtener_pagos_cliente);
api.get('/obtener_pagos_admin', auth.auth, pagoController.obtener_pagos_admin);
api.get('/obtener_pago_admin/:id', auth.auth, pagoController.obtener_pago_admin);
api.put('/actualizar_pago_confirmado/:id', auth.auth, pagoController.actualizar_pago_confirmado);

//Enviar correo
api.get('/enviar_correo_reservacion_cliente/:id', auth.auth, pagoController.enviar_correo_reservacion_cliente);
api.get('/enviar_correo_confirmacion_admin/:id', auth.auth, pagoController.enviar_correo_confirmacion_admin);

module.exports = api;