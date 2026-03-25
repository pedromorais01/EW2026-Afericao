const Repair = require('../models/repair');

module.exports.list = () => {
    return Repair.find().exec();
};

module.exports.findById = id => {
    return Repair.findById(id).exec();
};

module.exports.findByYear = year => {
    return Repair.find({ data: { $regex: "^" + year } }).exec();
};

module.exports.findByBrand = brand => {
    return Repair.find({ "viatura.marca": brand }).exec();
};

module.exports.getMatriculas = () => {
    return Repair.distinct("viatura.matricula").then(m => m.sort());
};

module.exports.getInterventions = () => {
    return Repair.aggregate([
        { $unwind: "$intervencoes" },
        { $group: {
            _id: {
                codigo: "$intervencoes.codigo",
                nome: "$intervencoes.nome",
                descricao: "$intervencoes.descricao"
            }
        }},
        { $project: {
            _id: 0,
            codigo: "$_id.codigo",
            nome: "$_id.nome",
            descricao: "$_id.descricao"
        }},
        { $sort: { codigo: 1 } }
    ]).exec();
};

module.exports.insert = repair => {
    return Repair.create(repair);
};

module.exports.remove = id => {
    return Repair.deleteOne({ _id: id });
};
