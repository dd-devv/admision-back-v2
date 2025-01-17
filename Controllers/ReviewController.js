var Reviews = require('../Models/Reviews');

//Resultado de esxámenes
const registro_review_user = async function (req, res) {
    if (req.user) {
        let data = req.body;
        let reg = await Reviews.create(data);

        res.status(200).send({ data: reg });
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const obtener_reviews = async function (req, res) {
    try {
        // Utilizamos select para especificar los campos que queremos del usuario
        const reg = await Reviews.find()
            .sort({ createdAt: -1 })
            .populate('user', [
                'nombres',
                'apellidos', 
                'genero',
                'universidad',
                'area',
                'perfil',
                'carrera'
            ]);

        // Validamos si hay registros
        if (reg.length > 0) {
            res.status(200).send({ data: reg });
        } else {
            res.status(200).send({ data: undefined });
        }
    } catch (error) {
        // Manejo de errores
        console.error('Error al obtener reviews:', error);
        res.status(500).send({ 
            message: 'Error al obtener las reviews',
            error: error.message 
        });
    }
}

const destacar_review_admin = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'ADMIN') {
            let id = req.params['id'];

            let reg = await Reviews.findByIdAndUpdate({ _id: id }, {
                destacado: true
            });

            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const eliminar_review_admin = async function (req, res) {
    if (req.user) {
        if (req.user.role === 'ADMIN') {

            var id = req.params['id'];
            let reg = await Reviews.findByIdAndRemove({ _id: id });
            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

module.exports = {
    registro_review_user,
    obtener_reviews,
    destacar_review_admin,
    eliminar_review_admin
}