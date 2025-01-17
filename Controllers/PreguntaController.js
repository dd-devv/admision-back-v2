'use strict';

var Algebra = require('../Models/Algebra');
var Anatomia = require('../Models/Anatomia');
var Aritmetica = require('../Models/Aritmetica');
var Biologia = require('../Models/Biologia');
var Economia = require('../Models/Economia');
var EdCivica = require('../Models/EdCivica');
var Fisica = require('../Models/Fisica');
var Geografia = require('../Models/Geografia');
var Geometria = require('../Models/Geometria');
var HistoriaPeru = require('../Models/HistoriaPeru');
var HistoriaUniversal = require('../Models/HistoriaUniversal');
var Lenguaje = require('../Models/Lenguaje');
var Literatura = require('../Models/Literatura');
var Quimica = require('../Models/Quimica');
var RazMatematico = require('../Models/RazMatematico');
var RazVerbal = require('../Models/RazVerbal');
var Trigonometria = require('../Models/Trigonometria');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../Helpers/jwt');

//Público PRUEBA-GRATIS
const obtener_preguntas_prueba_gratis = async function (req, res) {

    var regAlg = await Algebra.find().sort({ createdAt: 1 }).limit(3);
    var regAnat = await Anatomia.find().sort({ createdAt: 1 }).limit(3);
    var regArit = await Aritmetica.find().sort({ createdAt: 1 }).limit(3);
    var regBio = await Biologia.find().sort({ createdAt: 1 }).limit(3);
    var regEco = await Economia.find().sort({ createdAt: 1 }).limit(3);
    var regEdCiv = await EdCivica.find().sort({ createdAt: 1 }).limit(3);
    var regFis = await Fisica.find().sort({ createdAt: 1 }).limit(3);
    var regGeog = await Geografia.find().sort({ createdAt: 1 }).limit(2);
    var regGeom = await Geometria.find().sort({ createdAt: 1 }).limit(2);
    var regHP = await HistoriaPeru.find().sort({ createdAt: 1 }).limit(3);
    var regHU = await HistoriaUniversal.find().sort({ createdAt: 1 }).limit(3);
    var regLeng = await Lenguaje.find().sort({ createdAt: 1 }).limit(3);
    var regLit = await Literatura.find().sort({ createdAt: 1 }).limit(3);
    var regQuim = await Quimica.find().sort({ createdAt: 1 }).limit(3);
    var regRM = await RazMatematico.find().sort({ createdAt: 1 }).limit(4);
    var regRV = await RazVerbal.find().sort({ createdAt: 1 }).limit(4);
    var regTrig = await Trigonometria.find().sort({ createdAt: 1 }).limit(2);
    var reg = [regAlg, regAnat, regArit, regBio, regEco, regEdCiv, regFis, regGeog, regGeom, regHP, regHU,
        regLeng, regLit, regQuim, regRM, regRV, regTrig];
    res.status(200).send({ data: reg });
}

//Preguntas examen
const obtener_preguntas_examen = async function (req, res) {
    if (req.user) {
        let regAlg = await Algebra.aggregate([{$sample: {size: 3}}]);
        let regAnat = await Anatomia.aggregate([{$sample: {size: 3}}]);
        let regArit = await Aritmetica.aggregate([{$sample: {size: 3}}]);
        let regBio = await Biologia.aggregate([{$sample: {size: 3}}]);
        let regEco = await Economia.aggregate([{$sample: {size: 3}}]);
        let regEdCiv = await EdCivica.aggregate([{$sample: {size: 3}}]);
        let regFis = await Fisica.aggregate([{$sample: {size: 3}}]);
        let regGeog = await Geografia.aggregate([{$sample: {size: 2}}]);
        let regGeom = await Geometria.aggregate([{$sample: {size: 2}}]);
        let regHP = await HistoriaPeru.aggregate([{$sample: {size: 3}}]);
        let regHU = await HistoriaUniversal.aggregate([{$sample: {size: 3}}]);
        let regLeng = await Lenguaje.aggregate([{$sample: {size: 3}}]);
        let regLit = await Literatura.aggregate([{$sample: {size: 3}}]);
        let regQuim = await Quimica.aggregate([{$sample: {size: 3}}]);
        let regRM = await RazMatematico.aggregate([{$sample: {size: 4}}]);
        let regRV = await RazVerbal.aggregate([{$sample: {size: 4}}]);
        let regTrig = await Trigonometria.aggregate([{$sample: {size: 2}}]);
        var reg = [regAlg, regAnat, regArit, regBio, regEco, regEdCiv, regFis, regGeog, regGeom, regHP, regHU,
            regLeng, regLit, regQuim, regRM, regRV, regTrig];
        res.status(200).send({ data: reg });
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

//Álgebra
const agregar_pregunta_algebra = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'ADMIN') {
            let data = req.body;

            let reg = await Algebra.create(data);

            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const listar_preguntas_filtro_algebra = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'ADMIN') {

            let filtro = req.params['filtro'];

            let reg = await Algebra.find({ pregunta: new RegExp(filtro, 'i') }).sort({ createdAt: -1 });
            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};

const obtener_pregunta_algebra = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'ADMIN') {

            var id = req.params['id'];

            try {
                var reg = await Algebra.findById({ _id: id });
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

const actualizar_pregunta_algebra = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'ADMIN') {

            var id = req.params['id'];
            var data = req.body;

            var reg = await Algebra.findByIdAndUpdate({ _id: id }, {
                pregunta: data.pregunta,
                alt_a: data.alt_a,
                alt_b: data.alt_b,
                alt_c: data.alt_c,
                alt_d: data.alt_d,
                alt_e: data.alt_e,
                solucionario: data.solucionario
            });

            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const eliminar_pregunta_algebra = async function (req, res) {
    if (req.user) {
        if (req.user.role === 'ADMIN') {

            var id = req.params['id'];
            let reg = await Algebra.findByIdAndRemove({ _id: id });
            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

// Usuario
const obtener_preguntas_practica_algebra = async function (req, res) {
    if (req.user) {
        let reg = await Algebra.aggregate([{$sample: {size: 10}}]);
        res.status(200).send({ data: reg });
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

//Anatomía
const agregar_pregunta_anatomia = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'ADMIN') {
            let data = req.body;

            let reg = await Anatomia.create(data);

            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const listar_preguntas_filtro_anatomia = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'ADMIN') {

            let filtro = req.params['filtro'];

            let reg = await Anatomia.find({ pregunta: new RegExp(filtro, 'i') }).sort({ createdAt: -1 });
            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};

const obtener_pregunta_anatomia = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'ADMIN') {

            var id = req.params['id'];

            try {
                var reg = await Anatomia.findById({ _id: id });
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

const actualizar_pregunta_anatomia = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'ADMIN') {

            var id = req.params['id'];
            var data = req.body;

            var reg = await Anatomia.findByIdAndUpdate({ _id: id }, {
                pregunta: data.pregunta,
                alt_a: data.alt_a,
                alt_b: data.alt_b,
                alt_c: data.alt_c,
                alt_d: data.alt_d,
                alt_e: data.alt_e,
                solucionario: data.solucionario
            });

            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const eliminar_pregunta_anatomia = async function (req, res) {
    if (req.user) {
        if (req.user.role === 'ADMIN') {

            var id = req.params['id'];
            let reg = await Anatomia.findByIdAndRemove({ _id: id });
            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

// Usuario
const obtener_preguntas_practica_anatomia = async function (req, res) {
    if (req.user) {
        let reg = await Anatomia.aggregate([{$sample: {size: 10}}]);
        res.status(200).send({ data: reg });
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

//Aritmética
const agregar_pregunta_aritmetica = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'ADMIN') {
            let data = req.body;

            let reg = await Aritmetica.create(data);

            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const listar_preguntas_filtro_aritmetica = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'ADMIN') {

            let filtro = req.params['filtro'];

            let reg = await Aritmetica.find({ pregunta: new RegExp(filtro, 'i') }).sort({ createdAt: -1 });
            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};

const obtener_pregunta_aritmetica = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'ADMIN') {

            var id = req.params['id'];

            try {
                var reg = await Aritmetica.findById({ _id: id });
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

const actualizar_pregunta_aritmetica = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'ADMIN') {

            var id = req.params['id'];
            var data = req.body;

            var reg = await Aritmetica.findByIdAndUpdate({ _id: id }, {
                pregunta: data.pregunta,
                alt_a: data.alt_a,
                alt_b: data.alt_b,
                alt_c: data.alt_c,
                alt_d: data.alt_d,
                alt_e: data.alt_e,
                solucionario: data.solucionario
            });

            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const eliminar_pregunta_aritmetica = async function (req, res) {
    if (req.user) {
        if (req.user.role === 'ADMIN') {

            var id = req.params['id'];
            let reg = await Aritmetica.findByIdAndRemove({ _id: id });
            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

// Usuario
const obtener_preguntas_practica_aritmetica = async function (req, res) {
    if (req.user) {
        let reg = await Aritmetica.aggregate([{$sample: {size: 10}}]);
        res.status(200).send({ data: reg });
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

//Biología
const agregar_pregunta_biologia = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'ADMIN') {
            let data = req.body;

            let reg = await Biologia.create(data);

            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const listar_preguntas_filtro_biologia = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'ADMIN') {

            let filtro = req.params['filtro'];

            let reg = await Biologia.find({ pregunta: new RegExp(filtro, 'i') }).sort({ createdAt: -1 });
            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};

const obtener_pregunta_biologia = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'ADMIN') {

            var id = req.params['id'];

            try {
                var reg = await Biologia.findById({ _id: id });
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

const actualizar_pregunta_biologia = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'ADMIN') {

            var id = req.params['id'];
            var data = req.body;

            var reg = await Biologia.findByIdAndUpdate({ _id: id }, {
                pregunta: data.pregunta,
                alt_a: data.alt_a,
                alt_b: data.alt_b,
                alt_c: data.alt_c,
                alt_d: data.alt_d,
                alt_e: data.alt_e,
                solucionario: data.solucionario
            });

            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const eliminar_pregunta_biologia = async function (req, res) {
    if (req.user) {
        if (req.user.role === 'ADMIN') {

            var id = req.params['id'];
            let reg = await Biologia.findByIdAndRemove({ _id: id });
            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

// Usuario
const obtener_preguntas_practica_biologia = async function (req, res) {
    if (req.user) {
        let reg = await Biologia.aggregate([{$sample: {size: 10}}]);
        res.status(200).send({ data: reg });
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

//Economía
const agregar_pregunta_economia = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'ADMIN') {
            let data = req.body;

            let reg = await Economia.create(data);

            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const listar_preguntas_filtro_economia = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'ADMIN') {

            let filtro = req.params['filtro'];

            let reg = await Economia.find({ pregunta: new RegExp(filtro, 'i') }).sort({ createdAt: -1 });
            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};

const obtener_pregunta_economia = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'ADMIN') {

            var id = req.params['id'];

            try {
                var reg = await Economia.findById({ _id: id });
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

const actualizar_pregunta_economia = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'ADMIN') {

            var id = req.params['id'];
            var data = req.body;

            var reg = await Economia.findByIdAndUpdate({ _id: id }, {
                pregunta: data.pregunta,
                alt_a: data.alt_a,
                alt_b: data.alt_b,
                alt_c: data.alt_c,
                alt_d: data.alt_d,
                alt_e: data.alt_e,
                solucionario: data.solucionario
            });

            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const eliminar_pregunta_economia = async function (req, res) {
    if (req.user) {
        if (req.user.role === 'ADMIN') {

            var id = req.params['id'];
            let reg = await Economia.findByIdAndRemove({ _id: id });
            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

// Usuario
const obtener_preguntas_practica_economia = async function (req, res) {
    if (req.user) {
        let reg = await Economia.aggregate([{$sample: {size: 10}}]);
        res.status(200).send({ data: reg });
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

//Educación Cívica
const agregar_pregunta_ed_civica = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'ADMIN') {
            let data = req.body;

            let reg = await EdCivica.create(data);

            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const listar_preguntas_filtro_ed_civica = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'ADMIN') {

            let filtro = req.params['filtro'];

            let reg = await EdCivica.find({ pregunta: new RegExp(filtro, 'i') }).sort({ createdAt: -1 });
            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};

const obtener_pregunta_ed_civica = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'ADMIN') {

            var id = req.params['id'];

            try {
                var reg = await EdCivica.findById({ _id: id });
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

const actualizar_pregunta_ed_civica = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'ADMIN') {

            var id = req.params['id'];
            var data = req.body;

            var reg = await EdCivica.findByIdAndUpdate({ _id: id }, {
                pregunta: data.pregunta,
                alt_a: data.alt_a,
                alt_b: data.alt_b,
                alt_c: data.alt_c,
                alt_d: data.alt_d,
                alt_e: data.alt_e,
                solucionario: data.solucionario
            });

            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const eliminar_pregunta_ed_civica = async function (req, res) {
    if (req.user) {
        if (req.user.role === 'ADMIN') {

            var id = req.params['id'];
            let reg = await EdCivica.findByIdAndRemove({ _id: id });
            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

// Usuario
const obtener_preguntas_practica_ed_civica = async function (req, res) {
    if (req.user) {
        let reg = await EdCivica.aggregate([{$sample: {size: 10}}]);
        res.status(200).send({ data: reg });
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

//Física
const agregar_pregunta_fisica = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'ADMIN') {
            let data = req.body;

            let reg = await Fisica.create(data);

            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const listar_preguntas_filtro_fisica = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'ADMIN') {

            let filtro = req.params['filtro'];

            let reg = await Fisica.find({ pregunta: new RegExp(filtro, 'i') }).sort({ createdAt: -1 });
            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};

const obtener_pregunta_fisica = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'ADMIN') {

            var id = req.params['id'];

            try {
                var reg = await Fisica.findById({ _id: id });
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

const actualizar_pregunta_fisica = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'ADMIN') {

            var id = req.params['id'];
            var data = req.body;

            var reg = await Fisica.findByIdAndUpdate({ _id: id }, {
                pregunta: data.pregunta,
                alt_a: data.alt_a,
                alt_b: data.alt_b,
                alt_c: data.alt_c,
                alt_d: data.alt_d,
                alt_e: data.alt_e,
                solucionario: data.solucionario
            });

            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const eliminar_pregunta_fisica = async function (req, res) {
    if (req.user) {
        if (req.user.role === 'ADMIN') {

            var id = req.params['id'];
            let reg = await Fisica.findByIdAndRemove({ _id: id });
            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

// Usuario
const obtener_preguntas_practica_fisica = async function (req, res) {
    if (req.user) {
        let reg = await Fisica.aggregate([{$sample: {size: 10}}]);
        res.status(200).send({ data: reg });
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

//Geografía
const agregar_pregunta_geografia = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'ADMIN') {
            let data = req.body;

            let reg = await Geografia.create(data);

            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const listar_preguntas_filtro_geografia = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'ADMIN') {

            let filtro = req.params['filtro'];

            let reg = await Geografia.find({ pregunta: new RegExp(filtro, 'i') }).sort({ createdAt: -1 });
            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};

const obtener_pregunta_geografia = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'ADMIN') {

            var id = req.params['id'];

            try {
                var reg = await Geografia.findById({ _id: id });
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

const actualizar_pregunta_geografia = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'ADMIN') {

            var id = req.params['id'];
            var data = req.body;

            var reg = await Geografia.findByIdAndUpdate({ _id: id }, {
                pregunta: data.pregunta,
                alt_a: data.alt_a,
                alt_b: data.alt_b,
                alt_c: data.alt_c,
                alt_d: data.alt_d,
                alt_e: data.alt_e,
                solucionario: data.solucionario
            });

            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const eliminar_pregunta_geografia = async function (req, res) {
    if (req.user) {
        if (req.user.role === 'ADMIN') {

            var id = req.params['id'];
            let reg = await Geografia.findByIdAndRemove({ _id: id });
            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

// Usuario
const obtener_preguntas_practica_geografia = async function (req, res) {
    if (req.user) {
        let reg = await Geografia.aggregate([{$sample: {size: 10}}]);
        res.status(200).send({ data: reg });
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

//Geometría
const agregar_pregunta_geometria = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'ADMIN') {
            let data = req.body;

            let reg = await Geometria.create(data);

            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const listar_preguntas_filtro_geometria = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'ADMIN') {

            let filtro = req.params['filtro'];

            let reg = await Geometria.find({ pregunta: new RegExp(filtro, 'i') }).sort({ createdAt: -1 });
            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};

const obtener_pregunta_geometria = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'ADMIN') {

            var id = req.params['id'];

            try {
                var reg = await Geometria.findById({ _id: id });
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

const actualizar_pregunta_geometria = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'ADMIN') {

            var id = req.params['id'];
            var data = req.body;

            var reg = await Geometria.findByIdAndUpdate({ _id: id }, {
                pregunta: data.pregunta,
                alt_a: data.alt_a,
                alt_b: data.alt_b,
                alt_c: data.alt_c,
                alt_d: data.alt_d,
                alt_e: data.alt_e,
                solucionario: data.solucionario
            });

            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const eliminar_pregunta_geometria = async function (req, res) {
    if (req.user) {
        if (req.user.role === 'ADMIN') {

            var id = req.params['id'];
            let reg = await Geometria.findByIdAndRemove({ _id: id });
            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

// Usuario
const obtener_preguntas_practica_geometria = async function (req, res) {
    if (req.user) {
        let reg = await Geometria.aggregate([{$sample: {size: 10}}]);
        res.status(200).send({ data: reg });
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

//Historia del perú
const agregar_pregunta_historia_peru = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'ADMIN') {
            let data = req.body;

            let reg = await HistoriaPeru.create(data);

            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const listar_preguntas_filtro_historia_peru = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'ADMIN') {

            let filtro = req.params['filtro'];

            let reg = await HistoriaPeru.find({ pregunta: new RegExp(filtro, 'i') }).sort({ createdAt: -1 });
            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};

const obtener_pregunta_historia_peru = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'ADMIN') {

            var id = req.params['id'];

            try {
                var reg = await HistoriaPeru.findById({ _id: id });
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

const actualizar_pregunta_historia_peru = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'ADMIN') {

            var id = req.params['id'];
            var data = req.body;

            var reg = await HistoriaPeru.findByIdAndUpdate({ _id: id }, {
                pregunta: data.pregunta,
                alt_a: data.alt_a,
                alt_b: data.alt_b,
                alt_c: data.alt_c,
                alt_d: data.alt_d,
                alt_e: data.alt_e,
                solucionario: data.solucionario
            });

            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const eliminar_pregunta_historia_peru = async function (req, res) {
    if (req.user) {
        if (req.user.role === 'ADMIN') {

            var id = req.params['id'];
            let reg = await HistoriaPeru.findByIdAndRemove({ _id: id });
            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

// Usuario
const obtener_preguntas_practica_historia_peru = async function (req, res) {
    if (req.user) {
        let reg = await HistoriaPeru.aggregate([{$sample: {size: 10}}]);
        res.status(200).send({ data: reg });
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

//Historia universal
const agregar_pregunta_historia_universal = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'ADMIN') {
            let data = req.body;

            let reg = await HistoriaUniversal.create(data);

            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const listar_preguntas_filtro_historia_universal = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'ADMIN') {

            let filtro = req.params['filtro'];

            let reg = await HistoriaUniversal.find({ pregunta: new RegExp(filtro, 'i') }).sort({ createdAt: -1 });
            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};

const obtener_pregunta_historia_universal = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'ADMIN') {

            var id = req.params['id'];

            try {
                var reg = await HistoriaUniversal.findById({ _id: id });
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

const actualizar_pregunta_historia_universal = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'ADMIN') {

            var id = req.params['id'];
            var data = req.body;

            var reg = await HistoriaUniversal.findByIdAndUpdate({ _id: id }, {
                pregunta: data.pregunta,
                alt_a: data.alt_a,
                alt_b: data.alt_b,
                alt_c: data.alt_c,
                alt_d: data.alt_d,
                alt_e: data.alt_e,
                solucionario: data.solucionario
            });

            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const eliminar_pregunta_historia_universal = async function (req, res) {
    if (req.user) {
        if (req.user.role === 'ADMIN') {

            var id = req.params['id'];
            let reg = await HistoriaUniversal.findByIdAndRemove({ _id: id });
            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

// Usuario
const obtener_preguntas_practica_historia_universal = async function (req, res) {
    if (req.user) {
        let reg = await HistoriaUniversal.aggregate([{$sample: {size: 10}}]);
        res.status(200).send({ data: reg });
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

//Lenguaje
const agregar_pregunta_lenguaje = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'ADMIN') {
            let data = req.body;

            let reg = await Lenguaje.create(data);

            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const listar_preguntas_filtro_lenguaje = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'ADMIN') {

            let filtro = req.params['filtro'];

            let reg = await Lenguaje.find({ pregunta: new RegExp(filtro, 'i') }).sort({ createdAt: -1 });
            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};

const obtener_pregunta_lenguaje = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'ADMIN') {

            var id = req.params['id'];

            try {
                var reg = await Lenguaje.findById({ _id: id });
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

const actualizar_pregunta_lenguaje = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'ADMIN') {

            var id = req.params['id'];
            var data = req.body;

            var reg = await Lenguaje.findByIdAndUpdate({ _id: id }, {
                pregunta: data.pregunta,
                alt_a: data.alt_a,
                alt_b: data.alt_b,
                alt_c: data.alt_c,
                alt_d: data.alt_d,
                alt_e: data.alt_e,
                solucionario: data.solucionario
            });

            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const eliminar_pregunta_lenguaje = async function (req, res) {
    if (req.user) {
        if (req.user.role === 'ADMIN') {

            var id = req.params['id'];
            let reg = await Lenguaje.findByIdAndRemove({ _id: id });
            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

// Usuario
const obtener_preguntas_practica_lenguaje = async function (req, res) {
    if (req.user) {
        let reg = await Lenguaje.aggregate([{$sample: {size: 10}}]);
        res.status(200).send({ data: reg });
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

//Literatura
const agregar_pregunta_literatura = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'ADMIN') {
            let data = req.body;

            let reg = await Literatura.create(data);

            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const listar_preguntas_filtro_literatura = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'ADMIN') {

            let filtro = req.params['filtro'];

            let reg = await Literatura.find({ pregunta: new RegExp(filtro, 'i') }).sort({ createdAt: -1 });
            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};

const obtener_pregunta_literatura = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'ADMIN') {

            var id = req.params['id'];

            try {
                var reg = await Literatura.findById({ _id: id });
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

const actualizar_pregunta_literatura = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'ADMIN') {

            var id = req.params['id'];
            var data = req.body;

            var reg = await Literatura.findByIdAndUpdate({ _id: id }, {
                pregunta: data.pregunta,
                alt_a: data.alt_a,
                alt_b: data.alt_b,
                alt_c: data.alt_c,
                alt_d: data.alt_d,
                alt_e: data.alt_e,
                solucionario: data.solucionario
            });

            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const eliminar_pregunta_literatura = async function (req, res) {
    if (req.user) {
        if (req.user.role === 'ADMIN') {

            var id = req.params['id'];
            let reg = await Literatura.findByIdAndRemove({ _id: id });
            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

// Usuario
const obtener_preguntas_practica_literatura = async function (req, res) {
    if (req.user) {
        let reg = await Literatura.aggregate([{$sample: {size: 10}}]);
        res.status(200).send({ data: reg });
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

//Química
const agregar_pregunta_quimica = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'ADMIN') {
            let data = req.body;

            let reg = await Quimica.create(data);

            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const listar_preguntas_filtro_quimica = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'ADMIN') {

            let filtro = req.params['filtro'];

            let reg = await Quimica.find({ pregunta: new RegExp(filtro, 'i') }).sort({ createdAt: -1 });
            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};

const obtener_pregunta_quimica = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'ADMIN') {

            var id = req.params['id'];

            try {
                var reg = await Quimica.findById({ _id: id });
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

const actualizar_pregunta_quimica = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'ADMIN') {

            var id = req.params['id'];
            var data = req.body;

            var reg = await Quimica.findByIdAndUpdate({ _id: id }, {
                pregunta: data.pregunta,
                alt_a: data.alt_a,
                alt_b: data.alt_b,
                alt_c: data.alt_c,
                alt_d: data.alt_d,
                alt_e: data.alt_e,
                solucionario: data.solucionario
            });

            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const eliminar_pregunta_quimica = async function (req, res) {
    if (req.user) {
        if (req.user.role === 'ADMIN') {

            var id = req.params['id'];
            let reg = await Quimica.findByIdAndRemove({ _id: id });
            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

// Usuario
const obtener_preguntas_practica_quimica = async function (req, res) {
    if (req.user) {
        let reg = await Quimica.aggregate([{$sample: {size: 10}}]);
        res.status(200).send({ data: reg });
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

//Razonamiento matemático
const agregar_pregunta_raz_matematico = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'ADMIN') {
            let data = req.body;

            let reg = await RazMatematico.create(data);

            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const listar_preguntas_filtro_raz_matematico = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'ADMIN') {

            let filtro = req.params['filtro'];

            let reg = await RazMatematico.find({ pregunta: new RegExp(filtro, 'i') }).sort({ createdAt: -1 });
            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};

const obtener_pregunta_raz_matematico = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'ADMIN') {

            var id = req.params['id'];

            try {
                var reg = await RazMatematico.findById({ _id: id });
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

const actualizar_pregunta_raz_matematico = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'ADMIN') {

            var id = req.params['id'];
            var data = req.body;

            var reg = await RazMatematico.findByIdAndUpdate({ _id: id }, {
                pregunta: data.pregunta,
                alt_a: data.alt_a,
                alt_b: data.alt_b,
                alt_c: data.alt_c,
                alt_d: data.alt_d,
                alt_e: data.alt_e,
                solucionario: data.solucionario
            });

            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const eliminar_pregunta_raz_matematico = async function (req, res) {
    if (req.user) {
        if (req.user.role === 'ADMIN') {

            var id = req.params['id'];
            let reg = await RazMatematico.findByIdAndRemove({ _id: id });
            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

// Usuario
const obtener_preguntas_practica_raz_matematico = async function (req, res) {
    if (req.user) {
        let reg = await RazMatematico.aggregate([{$sample: {size: 10}}]);
        res.status(200).send({ data: reg });
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

//Razonamiento verbal
const agregar_pregunta_raz_verbal = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'ADMIN') {
            let data = req.body;

            let reg = await RazVerbal.create(data);

            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const listar_preguntas_filtro_raz_verbal = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'ADMIN') {

            let filtro = req.params['filtro'];

            let reg = await RazVerbal.find({ pregunta: new RegExp(filtro, 'i') }).sort({ createdAt: -1 });
            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};

const obtener_pregunta_raz_verbal = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'ADMIN') {

            var id = req.params['id'];

            try {
                var reg = await RazVerbal.findById({ _id: id });
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

const actualizar_pregunta_raz_verbal = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'ADMIN') {

            var id = req.params['id'];
            var data = req.body;

            var reg = await RazVerbal.findByIdAndUpdate({ _id: id }, {
                pregunta: data.pregunta,
                alt_a: data.alt_a,
                alt_b: data.alt_b,
                alt_c: data.alt_c,
                alt_d: data.alt_d,
                alt_e: data.alt_e,
                solucionario: data.solucionario
            });

            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const eliminar_pregunta_raz_verbal = async function (req, res) {
    if (req.user) {
        if (req.user.role === 'ADMIN') {

            var id = req.params['id'];
            let reg = await RazVerbal.findByIdAndRemove({ _id: id });
            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

// Usuario
const obtener_preguntas_practica_raz_verbal = async function (req, res) {
    if (req.user) {
        let reg = await RazVerbal.aggregate([{$sample: {size: 10}}]);
        res.status(200).send({ data: reg });
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

//Trigonometría
const agregar_pregunta_trigonometria = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'ADMIN') {
            let data = req.body;

            let reg = await Trigonometria.create(data);

            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const listar_preguntas_filtro_trigonometria = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'ADMIN') {

            let filtro = req.params['filtro'];

            let reg = await Trigonometria.find({ pregunta: new RegExp(filtro, 'i') }).sort({ createdAt: -1 });
            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};

const obtener_pregunta_trigonometria = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'ADMIN') {

            var id = req.params['id'];

            try {
                var reg = await Trigonometria.findById({ _id: id });
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

const actualizar_pregunta_trigonometria = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'ADMIN') {

            var id = req.params['id'];
            var data = req.body;

            var reg = await Trigonometria.findByIdAndUpdate({ _id: id }, {
                pregunta: data.pregunta,
                alt_a: data.alt_a,
                alt_b: data.alt_b,
                alt_c: data.alt_c,
                alt_d: data.alt_d,
                alt_e: data.alt_e,
                solucionario: data.solucionario
            });

            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const eliminar_pregunta_trigonometria = async function (req, res) {
    if (req.user) {
        if (req.user.role === 'ADMIN') {

            var id = req.params['id'];
            let reg = await Trigonometria.findByIdAndRemove({ _id: id });
            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

// Usuario
const obtener_preguntas_practica_trigonometria = async function (req, res) {
    if (req.user) {
        let reg = await Trigonometria.aggregate([{$sample: {size: 10}}]);
        res.status(200).send({ data: reg });
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

module.exports = {

    obtener_preguntas_prueba_gratis,

    obtener_preguntas_examen,

    agregar_pregunta_algebra,
    listar_preguntas_filtro_algebra,
    obtener_pregunta_algebra,
    actualizar_pregunta_algebra,
    eliminar_pregunta_algebra,

    obtener_preguntas_practica_algebra,

    agregar_pregunta_anatomia,
    listar_preguntas_filtro_anatomia,
    obtener_pregunta_anatomia,
    actualizar_pregunta_anatomia,
    eliminar_pregunta_anatomia,

    obtener_preguntas_practica_anatomia,

    agregar_pregunta_aritmetica,
    listar_preguntas_filtro_aritmetica,
    obtener_pregunta_aritmetica,
    actualizar_pregunta_aritmetica,
    eliminar_pregunta_aritmetica,

    obtener_preguntas_practica_aritmetica,

    agregar_pregunta_biologia,
    listar_preguntas_filtro_biologia,
    obtener_pregunta_biologia,
    actualizar_pregunta_biologia,
    eliminar_pregunta_biologia,

    obtener_preguntas_practica_biologia,

    agregar_pregunta_economia,
    listar_preguntas_filtro_economia,
    obtener_pregunta_economia,
    actualizar_pregunta_economia,
    eliminar_pregunta_economia,

    obtener_preguntas_practica_economia,

    agregar_pregunta_ed_civica,
    listar_preguntas_filtro_ed_civica,
    obtener_pregunta_ed_civica,
    actualizar_pregunta_ed_civica,
    eliminar_pregunta_ed_civica,

    obtener_preguntas_practica_ed_civica,

    agregar_pregunta_fisica,
    listar_preguntas_filtro_fisica,
    obtener_pregunta_fisica,
    actualizar_pregunta_fisica,
    eliminar_pregunta_fisica,

    obtener_preguntas_practica_fisica,

    agregar_pregunta_geografia,
    listar_preguntas_filtro_geografia,
    obtener_pregunta_geografia,
    actualizar_pregunta_geografia,
    eliminar_pregunta_geografia,

    obtener_preguntas_practica_geografia,

    agregar_pregunta_geometria,
    listar_preguntas_filtro_geometria,
    obtener_pregunta_geometria,
    actualizar_pregunta_geometria,
    eliminar_pregunta_geometria,

    obtener_preguntas_practica_geometria,

    agregar_pregunta_historia_peru,
    listar_preguntas_filtro_historia_peru,
    obtener_pregunta_historia_peru,
    actualizar_pregunta_historia_peru,
    eliminar_pregunta_historia_peru,

    obtener_preguntas_practica_historia_peru,

    agregar_pregunta_historia_universal,
    listar_preguntas_filtro_historia_universal,
    obtener_pregunta_historia_universal,
    actualizar_pregunta_historia_universal,
    eliminar_pregunta_historia_universal,

    obtener_preguntas_practica_historia_universal,

    agregar_pregunta_lenguaje,
    listar_preguntas_filtro_lenguaje,
    obtener_pregunta_lenguaje,
    actualizar_pregunta_lenguaje,
    eliminar_pregunta_lenguaje,

    obtener_preguntas_practica_lenguaje,

    agregar_pregunta_literatura,
    listar_preguntas_filtro_literatura,
    obtener_pregunta_literatura,
    actualizar_pregunta_literatura,
    eliminar_pregunta_literatura,

    obtener_preguntas_practica_literatura,

    agregar_pregunta_quimica,
    listar_preguntas_filtro_quimica,
    obtener_pregunta_quimica,
    actualizar_pregunta_quimica,
    eliminar_pregunta_quimica,

    obtener_preguntas_practica_quimica,

    agregar_pregunta_raz_matematico,
    listar_preguntas_filtro_raz_matematico,
    obtener_pregunta_raz_matematico,
    actualizar_pregunta_raz_matematico,
    eliminar_pregunta_raz_matematico,

    obtener_preguntas_practica_raz_matematico,

    agregar_pregunta_raz_verbal,
    listar_preguntas_filtro_raz_verbal,
    obtener_pregunta_raz_verbal,
    actualizar_pregunta_raz_verbal,
    eliminar_pregunta_raz_verbal,

    obtener_preguntas_practica_raz_verbal,

    agregar_pregunta_trigonometria,
    listar_preguntas_filtro_trigonometria,
    obtener_pregunta_trigonometria,
    actualizar_pregunta_trigonometria,
    eliminar_pregunta_trigonometria,

    obtener_preguntas_practica_trigonometria
}