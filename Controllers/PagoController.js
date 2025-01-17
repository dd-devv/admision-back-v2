'use strict';

var User = require('../Models/User');
var Pago = require('../Models/Pago');

var fs = require('fs');
var handlebars = require('handlebars');
var ejs = require('ejs');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var { google } = require('googleapis');
const cron = require('node-cron');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const registro_reservacion_cliente = async function (req, res) {
  if (req.user) {

    var data = req.body;

    const fechaActual = new Date();
    const fechaNueva = new Date();

    if (data.plan == 'Basico') {
      fechaNueva.setMonth(fechaActual.getMonth() + 1);
    } else if (data.plan == 'Premium') {
      fechaNueva.setMonth(fechaActual.getMonth() + 3);
    }

    data.estado = 'Reservado';
    data.createdAt = fechaActual;
    data.vencimiento = fechaNueva;
    data.npago = 1;

    let pago = await Pago.create(data);

    res.status(200).send({ pago: pago });

  } else {
    res.status(500).send({ message: 'NoAccess' });
  }
}

const obtener_pagos_cliente = async function (req, res) {
  if (req.user) {
    var id = req.params['id'];

    var reg = await Pago.find({ user: id }).sort({ createdAt: -1 });
    if (reg.length >= 1) {
      res.status(200).send({ data: reg });

    } else if (reg.length == 0) {
      res.status(200).send({ data: undefined });
    }

  } else {
    res.status(500).send({ message: 'NoAccess' });
  }
}

async function updateToken() {
  try {
    const oauth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI
    );

    oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'ingresayaa@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN
      }
    });

    const mailOptions = {
      from: 'ingresayaa@gmail.com',
      to: 'soporte.ingresayaa@gmail.com',
      subject: 'Correo de actualización!',
    };

    // Convertir sendMail a Promise
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error al enviar email:', error);
          reject(error);
        } else {
          console.log('Email enviado:', info.response);
          resolve(info);
        }
      });
    });
  } catch (error) {
    console.error('Error en updateToken:', error);
    throw error;
  }
}

// Función para actualizar estados de pago
async function updatePaymentStatuses() {
  try {
    const result = await Pago.updateMany(
      { 
        vencimiento: { $lte: new Date() },
        estado: { $ne: 'Vencido' }
      },
      { 
        $set: { estado: 'Vencido' } 
      }
    );

    console.log(`${result.modifiedCount} pagos actualizados a estado Vencido`);
    return result;
  } catch (error) {
    console.error('Error al actualizar estados de pago:', error);
    throw error;
  }
}

// Función principal que ejecuta todas las actualizaciones
async function runDailyUpdates() {
  console.log('Iniciando actualizaciones diarias:', new Date().toISOString());
  
  try {
    // Ejecutar actualizaciones en paralelo
    const [paymentResult, emailResult] = await Promise.all([
      updatePaymentStatuses(),
      updateToken()
    ]);
    
    console.log('Actualizaciones diarias completadas:', {
      paymentsUpdated: paymentResult.modifiedCount,
      emailSent: !!emailResult
    });
  } catch (error) {
    console.error('Error en las actualizaciones diarias:', error);
    
    // Intentar notificar el error por email
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'ingresayaa@gmail.com',
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN
        }
      });

      await transporter.sendMail({
        from: 'ingresayaa@gmail.com',
        to: 'soporte.ingresayaa@gmail.com',
        subject: '¡Error en actualizaciones diarias!',
        text: `Error en las actualizaciones diarias: ${error.message}\n\nStack: ${error.stack}`
      });
    } catch (emailError) {
      console.error('Error al enviar notificación de error:', emailError);
    }
  }
}

// Programar la tarea para ejecutarse a las 00:00 todos los días
cron.schedule('0 0 * * *', runDailyUpdates, {
  scheduled: true,
  timezone: "America/Lima"
});


//Pagos
const obtener_pagos_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == 'ADMIN') {

      let ventas = await Pago.find().populate('user').sort({ createdAt: -1 });
      res.status(200).send({ data: ventas });

    } else {
      res.status(500).send({ message: 'NoAccess' });
    }
  } else {
    res.status(500).send({ message: 'NoAccess' });
  }
}

const obtener_pago_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == 'ADMIN') {

      let id = req.params['id'];

      try {
        let reg = await Pago.findById({ _id: id });
        res.status(200).send({ data: reg });
      } catch (error) {
        res.status(200).send({ data: undefined });
      }

    } else {
      res.status(500).send({ message: 'NoAccess' });
    }
  } else {
    res.status(500).send({ message: 'NoAccess' });
  }
}

const actualizar_pago_confirmado = async function (req, res) {
  if (req.user) {
    if (req.user.role == 'ADMIN') {

      let id = req.params['id'];
      let reg = await Pago.findByIdAndUpdate({ _id: id }, { estado: 'Confirmado' });
      res.status(200).send({ data: reg });

    } else {
      res.status(500).send({ message: 'NoAccess' });
    }
  } else {
    res.status(500).send({ message: 'NoAccess' });
  }
}

//CORREOS
const enviar_correo_reservacion_cliente = async function (req, res) {

  var id = req.params['id'];

  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );

  oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  var readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
      if (err) {
        throw err;
        callback(err);
      }
      else {
        callback(null, html);
      }
    });
  };

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'ingresayaa@gmail.com',
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN
    }
  });

  //cliente _id fecha data subtotal

  var pago = await Pago.findById({ _id: id }).populate('user');

  var user = pago.user.nombres + ' ' + pago.user.apellidos;
  var _id = pago._id.toString();
  var fecha = new Date(pago.createdAt);
  var subtotal = pago.subtotal;
  var estado = pago.estado;
  var plan = pago.plan;

  readHTMLFile(process.cwd() + '/mail-reservacion.html', (err, html) => {

    let rest_html = ejs.render(html, {
      cliente: user,
      _id: _id,
      fecha: fecha,
      subtotal: subtotal,
      estado: estado,
      plan: plan
    });

    var template = handlebars.compile(rest_html);
    var htmlToSend = template({ op: true });

    var mailOptions = {
      from: 'ingresayaa@gmail.com',
      to: pago.user.email,
      subject: 'Gracias por tu reservación, IngresaYaa.',
      html: htmlToSend
    };
    res.status(200).send({ data: true });
    transporter.sendMail(mailOptions, function (error, info) {
      if (!error) {
        console.log('Email sent: ' + info.response);
      }
    });

  });
}

const enviar_correo_confirmacion_admin = async function (req, res) {

  var id = req.params['id'];

  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );

  oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  var readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
      if (err) {
        throw err;
        callback(err);
      }
      else {
        callback(null, html);
      }
    });
  };

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'ingresayaa@gmail.com',
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN
    }
  });

  //cliente _id fecha data subtotal

  var pago = await Pago.findById({ _id: id }).populate('user');

  var user = pago.user.nombres + ' ' + pago.user.apellidos;
  var _id = pago._id.toString();
  var fecha = new Date(pago.createdAt);
  var subtotal = pago.subtotal;
  var estado = pago.estado;
  var plan = pago.plan;

  readHTMLFile(process.cwd() + '/mail-confirmacion.html', (err, html) => {

    let rest_html = ejs.render(html, {
      cliente: user,
      _id: _id,
      fecha: fecha,
      subtotal: subtotal,
      estado: estado,
      plan: plan
    });

    var template = handlebars.compile(rest_html);
    var htmlToSend = template({ op: true });

    var mailOptions = {
      from: 'ingresayaa@gmail.com',
      to: pago.user.email,
      subject: 'Gracias por tu pago, IngresaYaa!',
      html: htmlToSend
    };
    res.status(200).send({ data: true });
    transporter.sendMail(mailOptions, function (error, info) {
      if (!error) {
        console.log('Email sent: ' + info.response);
      }
    });

  });
}

module.exports = {
  registro_reservacion_cliente,
  obtener_pagos_cliente,
  obtener_pagos_admin,
  obtener_pago_admin,
  actualizar_pago_confirmado,

  enviar_correo_reservacion_cliente,
  enviar_correo_confirmacion_admin
}