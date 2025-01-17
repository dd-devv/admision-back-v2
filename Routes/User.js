'use strict';

var express = require('express');
var UserController = require('../Controllers/UserController');
var api = express.Router();
var auth = require('../Middlewares/authenticate');

//Peticiones
api.post('/registro_user', UserController.registro_user);
api.post('/login_user', UserController.login_user);
api.get('/obtener_user/:id', auth.auth, UserController.obtener_user);
api.get('/obtener_user_admin/:id', auth.auth, UserController.obtener_user_admin);
api.get('/listar_usuarios_filtro_admin/:filtro?', auth.auth, UserController.listar_usuarios_filtro_admin);
api.put('/actualizar_user_admin/:id', auth.auth, UserController.actualizar_user_admin);
api.delete('/eliminar_user_admin/:id', auth.auth, UserController.eliminar_user_admin);
api.put('/actualizar_user/:id', auth.auth, UserController.actualizar_user);
api.put('/registrar_codigo_referido/:id', auth.auth, UserController.registrar_codigo_referido);
api.get('/verificar_codigo_referido/:codigo?', auth.auth, UserController.verificar_codigo_referido);
api.delete('/eliminar_user/:id', auth.auth, UserController.eliminar_user);
api.post('/comparar_password', UserController.comparar_password);
api.put('/actualizar_password_user/:id', auth.auth, UserController.actualizar_password_user);

////Contacto
api.post('/enviar_mensaje_contacto', UserController.enviar_mensaje_contacto);
api.get('/obtener_mensajes_admin', auth.auth, UserController.obtener_mensajes_admin);
api.put('/cerrar_mensaje_admin/:id', auth.auth, UserController.cerrar_mensaje_admin);

/////KPI
api.get('/kpi_ganancias_mensuales_admin', auth.auth, UserController.kpi_ganancias_mensuales_admin);
api.get('/obtener_cantidad_usuarios_admin', auth.auth, UserController.obtener_cantidad_usuarios_admin);
api.get('/cantidad_simuacros_mes_admin', auth.auth, UserController.cantidad_simuacros_mes_admin);

//Correo de confirmación
api.get('/enviar_correo_confirmacion/:id', UserController.enviar_correo_confirmacion);
api.put('/actualizar_user_verificado/:id/:codigo', UserController.actualizar_user_verificado);

//CAMBIAR password
api.put('/registro_token_cambio_pass', UserController.registro_token_cambio_pass);
api.get('/enviar_correo_token_cambio_pass/:correo', UserController.enviar_correo_token_cambio_pass);
api.get('/verificar_token_cambio_pass/:token', UserController.verificar_token_cambio_pass);
api.put('/cambiar_password_user/:token', UserController.cambiar_password_user);

/////// CUENTAS
api.post('/registro_cuenta_admin', auth.auth, UserController.registro_cuenta_admin);
api.get('/obtener_cuentas_admin', auth.auth, UserController.obtener_cuentas_admin);
api.get('/obtener_cuenta_admin/:id', auth.auth, UserController.obtener_cuenta_admin);
api.delete('/eliminar_cuenta_admin/:id', auth.auth, UserController.eliminar_cuenta_admin);
api.put('/actualizar_cuenta_admin/:id', auth.auth, UserController.actualizar_cuenta_admin);
api.get('/obtener_cuentas', auth.auth, UserController.obtener_cuentas);

/////// CÍRCULOS DE ESTUDIO
api.post('/registro_circulo_admin', auth.auth, UserController.registro_circulo_admin);
api.get('/obtener_circulos_admin', auth.auth, UserController.obtener_circulos_admin);
api.get('/obtener_circulo_admin/:id', auth.auth, UserController.obtener_circulo_admin);
api.delete('/eliminar_circulo_admin/:id', auth.auth, UserController.eliminar_circulo_admin);
api.put('/actualizar_circulo_admin/:id', auth.auth, UserController.actualizar_circulo_admin);
api.get('/obtener_circulos', auth.auth, UserController.obtener_circulos);

//Exportar los módulos
module.exports = api;