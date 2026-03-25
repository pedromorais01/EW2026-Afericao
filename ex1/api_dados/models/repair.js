const mongoose = require('mongoose');

const repairSchema = new mongoose.Schema({
    _id: String,
    nome: String,
    nif: Number,
    data: String,
    viatura: {
        marca: String,
        modelo: String,
        matricula: String
    },
    nr_intervencoes: Number,
    intervencoes: [
        {
            codigo: String,
            nome: String,
            descricao: String
        }
    ]
}, { versionKey: false });

module.exports = mongoose.model('repairs', repairSchema, 'repairs');
