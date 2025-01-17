var ResultadoExamen = require('../Models/ResultadoExamen');

//Resultado de esxámenes
const registro_resultado_examen = async function (req, res) {
  if (req.user) {
    var data = req.body;
    let reg = await ResultadoExamen.create(data);

    res.status(200).send({ data: reg });
  } else {
    res.status(500).send({ message: 'NoAccess' });
  }
}

const obtener_resultados_examen = async function (req, res) {
  if (req.user) {
    var id = req.params['id'];

    var reg = await ResultadoExamen.find({ user: id }).sort({ createdAt: 1 });
    if (reg.length >= 1) {
      res.status(200).send({ data: reg });

    } else if (reg.length == 0) {
      res.status(200).send({ data: undefined });
    }

  } else {
    res.status(500).send({ message: 'NoAccess' });
  }
}

const obtener_ranking_usuarios = async function (req, res) {
  if (req.user) {

    var reg = await ResultadoExamen.find().populate('user');

    const result = Object.values(reg.reduce((acc, obj) => {
      if (!acc[obj.user] || obj.nota > acc[obj.user].nota) {
        acc[obj.user] = obj;
      }
      return acc;
    }, {})).sort((a, b) => b.nota - a.nota); // Ordena los resultados por nota de mayor a menor

    res.status(200).send({ data: result });  

  } else {
    res.status(500).send({ message: 'NoAccess' });
  }
}

module.exports = {
  registro_resultado_examen,
  obtener_resultados_examen,
  obtener_ranking_usuarios
}