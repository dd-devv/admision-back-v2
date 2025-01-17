'use strict';

var User = require('../Models/User');
var Contacto = require('../Models/Contacto');
var Pago = require('../Models/Pago');
var Cuenta = require('../Models/Cuenta');
var CirculoEstudio = require('../Models/CirculoEstudio');
var ResultadoExamen = require('../Models/ResultadoExamen');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../Helpers/jwt');

var fs = require('fs');
var handlebars = require('handlebars');
var ejs = require('ejs');
var nodemailer = require('nodemailer');
var { google } = require('googleapis');
var { v4: uuidv4 } = require('uuid');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const registro_user = async function (req, res) {
  //Obtiene los parámetros del cliente
  var data = req.body;
  var users_arr = [];

  //Generar un aleatorio de 6 dígitos
  const code = Math.floor(100000 + Math.random() * 900000);

  //Verifica que no exista correo repetido
  users_arr = await User.find({ email: data.email });

  if (users_arr.length == 0) {
    //Registro del usuario

    if (data.password) {
      bcrypt.hash(data.password, null, null, async function (err, hash) {
        if (hash) {
          data.password = hash;
          data.codigo = code;
          var reg = await User.create(data);
          res.status(200).send({
            data: reg,
            token: jwt.createToken(reg)
          });
        } else {
          res.status(200).send({ message: "Error server", data: undefined });
        }
      });
    } else {
      res
        .status(200)
        .send({ message: "No hay una contraseña", data: undefined });
    }
  } else {
    res
      .status(200)
      .send({
        message: "El correo ya está registrado por otro usuario",
        data: undefined,
      });
  }
}

const enviar_correo_confirmacion = async function (req, res) {

  var id = req.params['id'];

  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );

  oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  // const accessToken = await oauth2Client.getAccessToken();

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
      // accessToken: accessToken
    }
  });

  //cliente _id fecha data subtotal

  var user = await User.findById({ _id: id });

  readHTMLFile(process.cwd() + '/mail-verficar-user.html', (err, html) => {

    let rest_html = ejs.render(html, {
      cliente: user.nombres + ' ' + user.apellidos,
      codigo: user.codigo
    });

    var template = handlebars.compile(rest_html);
    var htmlToSend = template({ op: true });

    var mailOptions = {
      from: 'ingresayaa@gmail.com',
      to: user.email,
      subject: 'Verificación de correo',
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

const actualizar_user_verificado = async function (req, res) {

  var id = req.params['id'];
  var codigo = req.params['codigo'];

  var user = await User.findById({ _id: id });

  if (codigo == user.codigo) {
    var reg = await User.findByIdAndUpdate({ _id: id }, { verificado: true });

    res.status(200).send({ data: reg });
  } else if (codigo != user.codigo) {
    res.status(200).send({ data: undefined });
  }
}

const login_user = async function (req, res) {
  var data = req.body;
  var users_arr = [];

  //Busca un cliente mediante el correo
  users_arr = await User.find({ email: data.email });

  if (users_arr.length == 0) {
    res
      .status(200)
      .send({ message: "Correo o contraseña incorrectos", data: undefined });
  } else {
    //Si existe el cliente se manda al login
    let user = users_arr[0];

    //Comparar contraseñas
    bcrypt.compare(data.password, user.password, async function (error, check) {
      if (check) {
        res.status(200).send({
          data: user,
          token: jwt.createToken(user),
        });
      } else {
        res
          .status(200)
          .send({ message: "Correo o contraseña incorrectos", data: undefined });
      }
    });
  }
}

const registro_token_cambio_pass = async function (req, res) {
  //Obtiene los parámetros del cliente
  var data = req.body;
  var users_arr = [];

  //Verifica que no exista correo repetido
  users_arr = await User.find({ email: data.correo });

  const uniqueString = uuidv4();

  if (users_arr.length == 1) {
    let reg = await User.findOneAndUpdate({ email: data.correo }, { token_pass: uniqueString });
    res.status(200).send({ data: reg });

  } else if (users_arr == 0) {
    res
      .status(200)
      .send({
        message: "El correo ingresado no pertenece a nungún usuario",
        data: undefined,
      });
  }
}

const enviar_correo_token_cambio_pass = async function (req, res) {

  var correo = req.params['correo'];

  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );

  oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  // const accessToken = await oauth2Client.getAccessToken();

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
      // accessToken: accessToken
    }
  });

  //cliente _id fecha data subtotal

  var user = await User.findOne({ email: correo });

  readHTMLFile(process.cwd() + '/mail-cambio-pass.html', (err, html) => {

    let rest_html = ejs.render(html, {
      nombres: user.nombres + ' ' + user.apellidos,
      token: user.token_pass
    });

    var template = handlebars.compile(rest_html);
    var htmlToSend = template({ op: true });

    var mailOptions = {
      from: 'ingresayaa@gmail.com',
      to: user.email,
      subject: 'Cambio de contraseña, IngresaYaa.',
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

const verificar_token_cambio_pass = async function (req, res) {
  var token = req.params['token'];

  var reg = await User.findOne({ token_pass: token });

  if (reg) {
    res.status(200).send({ data: true });
  } else {
    res.status(200).send({ message: "No existe el código de verificación", data: undefined });
  }
}

const cambiar_password_user = async function (req, res) {
  var token = req.params['token'];
  var data = req.body;

  if (data.password) {
    bcrypt.hash(data.password, null, null, async function (err, hash) {
      if (hash) {
        data.password = hash;
        var reg = await User.findOneAndUpdate({ token_pass: token }, {
          password: data.password,
          token_pass: 'N0TokenHaveV01Ddew'
        });

        res.status(200).send({ data: true });

      } else {
        res.status(200).send({ message: "Error server", data: undefined });
      }
    });
  }
}

const obtener_user = async function (req, res) {
  if (req.user) {

    var id = req.params['id'];

    try {
      var reg = await User.findById({ _id: id });
      res.status(200).send({ data: reg });

    } catch (error) {
      res.status(200).send({ data: undefined });
    }

  } else {
    res.status(500).send({ message: 'NoAccess' });
  }
}

const obtener_user_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == 'ADMIN') {

      var id = req.params['id'];

      try {
        var reg = await User.findById({ _id: id });
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

const listar_usuarios_filtro_admin = async function (req, res) {

  if (req.user) {
    if (req.user.role == 'ADMIN') {

      let filtro = req.params['filtro'];

      let reg = await User.find({ nombres: new RegExp(filtro, 'i') }).sort({ createdAt: -1 });
      res.status(200).send({ data: reg });
    } else {
      res.status(500).send({ message: 'NoAccess' });
    }
  } else {
    res.status(500).send({ message: 'NoAccess' });
  }
}

const actualizar_user_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == 'ADMIN') {

      var id = req.params['id'];
      var data = req.body;

      if (data.password.length < 30) {
        bcrypt.hash(data.password, null, null, async function (err, hash) {
          if (hash) {
            var reg = await User.findByIdAndUpdate({ _id: id }, {
              nombres: data.nombres,
              apellidos: data.apellidos,
              email: data.email,
              password: hash,
              telefono: data.telefono,
              f_nacimiento: data.f_nacimiento,
              dni: data.dni,
              genero: data.genero,
              role: data.role
            });

            res.status(200).send({ data: reg });

          } else {
            res.status(200).send({ message: "Error server", data: undefined });
          }
        });
      } else {
        var reg = await User.findByIdAndUpdate({ _id: id }, {
          nombres: data.nombres,
          apellidos: data.apellidos,
          email: data.email,
          telefono: data.telefono,
          f_nacimiento: data.f_nacimiento,
          dni: data.dni,
          genero: data.genero,
          role: data.role
        });

        res.status(200).send({ data: reg });
      }

    } else {
      res.status(500).send({ message: 'NoAccess' });
    }
  } else {
    res.status(500).send({ message: 'NoAccess' });
  }
}

const eliminar_user_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role === 'ADMIN') {

      var id = req.params['id'];
      let reg = await User.findByIdAndRemove({ _id: id });
      res.status(200).send({ data: reg });

    } else {
      res.status(500).send({ message: 'NoAccess' });
    }
  } else {
    res.status(500).send({ message: 'NoAccess' });
  }
}

const actualizar_user = async function (req, res) {
  if (req.user) {
    var id = req.params['id'];
    var data = req.body;

    var reg = await User.findByIdAndUpdate({ _id: id }, {
      nombres: data.nombres,
      apellidos: data.apellidos,
      telefono: data.telefono,
      f_nacimiento: data.f_nacimiento,
      dni: data.dni,
      genero: data.genero,
      universidad: data.universidad,
      carrera: data.escuela,
      area: data.area
    });

    res.status(200).send({ data: reg });

  } else {
    res.status(500).send({ message: 'NoAccess' });
  }
}

const registrar_codigo_referido = async function (req, res) {
  if (req.user) {
    var id = req.params['id'];

    //Generar un aleatorio de 6 dígitos
    const code = Math.floor(100000 + Math.random() * 900000);

    var reg = await User.findByIdAndUpdate({ _id: id }, {
      codigo_referido: code
    });

    res.status(200).send({ data: reg });

  } else {
    res.status(500).send({ message: 'NoAccess' });
  }
}

const verificar_codigo_referido = async function (req, res) {
  if (req.user) {
    var codigo = req.params['codigo'];

    var reg = await User.findOne({ codigo_referido: codigo });

    if (reg) {
      res.status(200).send({ data: true });
    } else {
      res.status(200).send({ data: false });
    }

  } else {
    res.status(500).send({ message: 'NoAccess' });
  }
}

const eliminar_user = async function (req, res) {
  if (req.user) {
    var id = req.params['id'];
    let reg = await User.findByIdAndRemove({ _id: id });
    res.status(200).send({ data: reg });
  } else {
    res.status(500).send({ message: 'NoAccess' });
  }
}

const comparar_password = async function (req, res) {
  var data = req.body;
  var users_arr = [];

  //Busca un cliente mediante el correo
  users_arr = await User.find({ email: data.email });

  if (users_arr.length == 0) {
    res
      .status(200)
      .send({ message: "Correo o contraseña incorrectos", data: undefined });
  } else {
    //Si existe el cliente se manda al login
    let user = users_arr[0];

    //Comparar contraseñas
    bcrypt.compare(data.password, user.password, async function (error, check) {
      if (check) {
        res.status(200).send({ data: true });
      } else {
        res
          .status(200)
          .send({ message: "Contraseña incorrecta", data: undefined });
      }
    });
  }
}

const actualizar_password_user = async function (req, res) {
  if (req.user) {
    var id = req.params['id'];
    var data = req.body;

    if (data.password) {
      bcrypt.hash(data.password, null, null, async function (err, hash) {
        if (hash) {
          data.password = hash;
          var reg = await User.findByIdAndUpdate({ _id: id }, {
            password: data.password
          });

          res.status(200).send({ data: true });

        } else {
          res.status(200).send({ message: "Error server", data: undefined });
        }
      });
    }

  } else {
    res.status(500).send({ message: 'NoAccess' });
  }
}

////////CONTACTO
const enviar_mensaje_contacto = async function (req, res) {
  let data = req.body;
  data.estado = 'Abierto';
  let reg = await Contacto.create(data);

  res.status(200).send({ data: reg })
}

const obtener_mensajes_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == 'ADMIN') {

      let reg = await Contacto.find().sort({ createdAt: -1 });

      res.status(200).send({ data: reg });

    } else {
      res.status(500).send({ message: 'NoAccess' });
    }
  } else {
    res.status(500).send({ message: 'NoAccess' });
  }
}

const cerrar_mensaje_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == 'ADMIN') {

      let id = req.params['id'];

      let reg = await Contacto.findByIdAndUpdate({ _id: id }, { estado: 'Cerrado' });

      res.status(200).send({ data: reg });

    } else {
      res.status(500).send({ message: 'NoAccess' });
    }
  } else {
    res.status(500).send({ message: 'NoAccess' });
  }
}

///////KPI de RENDIMIENTO
const kpi_ganancias_mensuales_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == 'ADMIN') {
      var enero = 0;
      var febrero = 0;
      var marzo = 0;
      var abril = 0;
      var mayo = 0;
      var junio = 0;
      var julio = 0;
      var agosto = 0;
      var septiembre = 0;
      var octubre = 0;
      var noviembre = 0;
      var diciembre = 0;

      var nv_enero = 0;
      var nv_febrero = 0;
      var nv_marzo = 0;
      var nv_abril = 0;
      var nv_mayo = 0;
      var nv_junio = 0;
      var nv_julio = 0;
      var nv_agosto = 0;
      var nv_septiembre = 0;
      var nv_octubre = 0;
      var nv_noviembre = 0;
      var nv_diciembre = 0;

      var ganancia_total = 0;
      var total_mes = 0;
      var total_mes_anterior = 0;
      var count_ventas = 0;

      var reg = await Pago.find({$or: [{estado: 'Confirmado'}, {estado: 'Vencido'}]});
      let current_date = new Date();
      let current_year = current_date.getFullYear();
      let current_month = current_date.getMonth() + 1;

      for (var item of reg) {
        let createdAt_date = new Date(item.createdAt);
        let mes = createdAt_date.getMonth() + 1;

        if (createdAt_date.getFullYear() == current_year) {

          ganancia_total = ganancia_total + item.subtotal;

          if (mes == current_month) {
            total_mes = total_mes + item.subtotal;
            count_ventas = count_ventas + 1;
          }

          if (mes == current_month - 1) {
            total_mes_anterior = total_mes_anterior + item.subtotal;
          }

          if (mes == 1) {
            enero = enero + item.subtotal;
            nv_enero = nv_enero + item.cantidad;
          } else if (mes == 2) {
            febrero = febrero + item.subtotal;
            nv_febrero = nv_febrero + item.cantidad;
          } else if (mes == 3) {
            marzo = marzo + item.subtotal;
            nv_marzo = nv_marzo + item.cantidad;
          } else if (mes == 4) {
            abril = abril + item.subtotal;
            nv_abril = nv_abril + item.cantidad;
          } else if (mes == 5) {
            mayo = mayo + item.subtotal;
            nv_mayo = nv_mayo + item.cantidad;
          } else if (mes == 6) {
            junio = junio + item.subtotal;
            nv_junio = nv_junio + item.cantidad;
          } else if (mes == 7) {
            julio = julio + item.subtotal;
            nv_julio = nv_julio + item.cantidad;
          } else if (mes == 8) {
            agosto = agosto + item.subtotal;
            nv_agosto = nv_agosto + item.cantidad;
          } else if (mes == 9) {
            septiembre = septiembre + item.subtotal;
            nv_septiembre = nv_septiembre + item.cantidad;
          } else if (mes == 10) {
            octubre = octubre + item.subtotal;
            nv_octubre = nv_octubre + item.cantidad;
          } else if (mes == 11) {
            noviembre = noviembre + item.subtotal;
            nv_noviembre = nv_noviembre + item.cantidad;
          } else if (mes == 12) {
            diciembre = diciembre + item.subtotal;
            nv_diciembre = nv_diciembre + item.cantidad;
          }
        }
      }

      res.status(200).send({
        enero: enero,
        febrero: febrero,
        marzo: marzo,
        abril: abril,
        mayo: mayo,
        junio: junio,
        julio: julio,
        agosto: agosto,
        septiembre: septiembre,
        octubre: octubre,
        noviembre: noviembre,
        diciembre: diciembre,

        nv_enero: nv_enero,
        nv_febrero: nv_febrero,
        nv_marzo: nv_marzo,
        nv_abril: nv_abril,
        nv_mayo: nv_mayo,
        nv_junio: nv_junio,
        nv_julio: nv_julio,
        nv_agosto: nv_agosto,
        nv_septiembre: nv_septiembre,
        nv_octubre: nv_octubre,
        nv_noviembre: nv_noviembre,
        nv_diciembre: nv_diciembre,

        ganancia_total: ganancia_total,
        total_mes: total_mes,
        total_mes_anterior: total_mes_anterior,
        count_ventas: count_ventas
      });

    } else {
      res.status(500).send({ message: 'NoAccess' });
    }
  } else {
    res.status(500).send({ message: 'NoAccess' });
  }
}

///CANTIDAD DE EXAMENES POR MES
const cantidad_simuacros_mes_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == 'ADMIN') {

      var enero = 0;
      var febrero = 0;
      var marzo = 0;
      var abril = 0;
      var mayo = 0;
      var junio = 0;
      var julio = 0;
      var agosto = 0;
      var septiembre = 0;
      var octubre = 0;
      var noviembre = 0;
      var diciembre = 0;

      var total_mes = 0;
      var total_mes_anterior = 0;

      var reg = await ResultadoExamen.find();
      let current_date = new Date();
      let current_year = current_date.getFullYear();
      let current_month = current_date.getMonth() + 1;

      for (var item of reg) {
        let createdAt_date = new Date(item.createdAt);
        let mes = createdAt_date.getMonth() + 1;

        if (createdAt_date.getFullYear() == current_year) {

          if (mes == current_month) {
            total_mes++;
          }

          if (mes == current_month - 1) {
            total_mes_anterior++;
          }

          if (mes == 1) {
            enero++;
          } else if (mes == 2) {
            febrero++;
          } else if (mes == 3) {
            marzo++;
          } else if (mes == 4) {
            abril++;
          } else if (mes == 5) {
            mayo++;
          } else if (mes == 6) {
            junio++;
          } else if (mes == 7) {
            julio++;
          } else if (mes == 8) {
            agosto++;
          } else if (mes == 9) {
            septiembre++;
          } else if (mes == 10) {
            octubre++;
          } else if (mes == 11) {
            noviembre++;
          } else if (mes == 12) {
            diciembre++;
          }
        }
      }

      res.status(200).send({
        enero: enero,
        febrero: febrero,
        marzo: marzo,
        abril: abril,
        mayo: mayo,
        junio: junio,
        julio: julio,
        agosto: agosto,
        septiembre: septiembre,
        octubre: octubre,
        noviembre: noviembre,
        diciembre: diciembre,

        total_mes: total_mes,
        total_mes_anterior: total_mes_anterior
      });

    } else {
      res.status(500).send({ message: 'NoAccess' });
    }
  } else {
    res.status(500).send({ message: 'NoAccess' });
  }
}

///USUARIOS
const obtener_cantidad_usuarios_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == 'ADMIN') {

      let reg = await User.find();

      res.status(200).send({ data: reg.length });

    } else {
      res.status(500).send({ message: 'NoAccess' });
    }
  } else {
    res.status(500).send({ message: 'NoAccess' });
  }
}

/////////CUENTAS
const registro_cuenta_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == 'ADMIN') {

      var data = req.body;

      let reg = await Cuenta.create(data);
      res.status(200).send({ data: reg });

    } else {
      res.status(500).send({ message: 'NoAccess' });
    }
  } else {
    res.status(500).send({ message: 'NoAccess' });
  }
}

const obtener_cuentas_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == 'ADMIN') {

      let cuentas = [];
      try {
        cuentas = await Cuenta.find().sort({ createdAt: -1 });
        res.status(200).send({ data: cuentas });
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

const obtener_cuenta_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == 'ADMIN') {

      var id = req.params['id'];

      let cuenta;

      try {
        cuenta = await Cuenta.findById({ _id: id });
        res.status(200).send({ data: cuenta });
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

const eliminar_cuenta_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == 'ADMIN') {

      var id = req.params['id'];
      let reg = await Cuenta.findByIdAndRemove({ _id: id });
      res.status(200).send({ data: reg });

    } else {
      res.status(500).send({ message: 'NoAccess' });
    }
  } else {
    res.status(500).send({ message: 'NoAccess' });
  }
}

const actualizar_cuenta_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == 'ADMIN') {

      var id = req.params['id'];
      var data = req.body;

      var reg = await Cuenta.findByIdAndUpdate({ _id: id }, {
        banco: data.banco,
        titular: data.titular,
        cuenta: data.cuenta,
        cci: data.cci,
        color: data.color
      });

      res.status(200).send({ data: reg });

    } else {
      res.status(500).send({ message: 'NoAccess' });
    }
  } else {
    res.status(500).send({ message: 'NoAccess' });
  }
}

const obtener_cuentas = async function (req, res) {
  if (req.user) {

    let cuentas = [];
    try {
      cuentas = await Cuenta.find();
      res.status(200).send({ data: cuentas });
    } catch (error) {
      res.status(200).send({ data: undefined });
    }
  } else {
    res.status(500).send({ message: 'NoAccess' });
  }
}

/////////CÍRCULOS DE ESTUDIO
const registro_circulo_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == 'ADMIN') {

      var data = req.body;

      let reg = await CirculoEstudio.create(data);
      res.status(200).send({ data: reg });

    } else {
      res.status(500).send({ message: 'NoAccess' });
    }
  } else {
    res.status(500).send({ message: 'NoAccess' });
  }
}

const obtener_circulos_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == 'ADMIN') {

      let circulos = [];
      try {
        circulos = await CirculoEstudio.find().sort({ createdAt: -1 });
        res.status(200).send({ data: circulos });
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

const obtener_circulo_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == 'ADMIN') {

      var id = req.params['id'];

      let circulo;

      try {
        circulo = await CirculoEstudio.findById({ _id: id });
        res.status(200).send({ data: circulo });
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

const eliminar_circulo_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == 'ADMIN') {

      var id = req.params['id'];
      let reg = await CirculoEstudio.findByIdAndRemove({ _id: id });
      res.status(200).send({ data: reg });

    } else {
      res.status(500).send({ message: 'NoAccess' });
    }
  } else {
    res.status(500).send({ message: 'NoAccess' });
  }
}

const actualizar_circulo_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == 'ADMIN') {

      var id = req.params['id'];
      var data = req.body;

      var reg = await CirculoEstudio.findByIdAndUpdate({ _id: id }, {
        titulo: data.titulo,
        icono: data.icono,
        color_fondo: data.color_fondo,
        color_borde: data.color_borde
      });

      res.status(200).send({ data: reg });

    } else {
      res.status(500).send({ message: 'NoAccess' });
    }
  } else {
    res.status(500).send({ message: 'NoAccess' });
  }
}

const obtener_circulos = async function (req, res) {
  if (req.user) {

    let circulos = [];
    try {
      circulos = await CirculoEstudio.find();
      res.status(200).send({ data: circulos });
    } catch (error) {
      res.status(200).send({ data: undefined });
    }
  } else {
    res.status(500).send({ message: 'NoAccess' });
  }
}

module.exports = {
  registro_user,
  enviar_correo_confirmacion,
  actualizar_user_verificado,
  login_user,
  registro_token_cambio_pass,
  enviar_correo_token_cambio_pass,
  verificar_token_cambio_pass,
  cambiar_password_user,
  obtener_user,
  obtener_user_admin,
  listar_usuarios_filtro_admin,
  actualizar_user_admin,
  eliminar_user_admin,
  actualizar_user,
  registrar_codigo_referido,
  verificar_codigo_referido,
  eliminar_user,
  comparar_password,
  actualizar_password_user,
  enviar_mensaje_contacto,
  obtener_mensajes_admin,
  cerrar_mensaje_admin,
  kpi_ganancias_mensuales_admin,
  cantidad_simuacros_mes_admin,
  obtener_cantidad_usuarios_admin,
  registro_cuenta_admin,
  obtener_cuentas_admin,
  obtener_cuenta_admin,
  eliminar_cuenta_admin,
  actualizar_cuenta_admin,
  obtener_cuentas,
  registro_circulo_admin,
  obtener_circulos_admin,
  obtener_circulo_admin,
  eliminar_circulo_admin,
  actualizar_circulo_admin,
  obtener_circulos
}