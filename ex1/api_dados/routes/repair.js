const express = require('express');
const router = express.Router();
const Repair = require('../controllers/repair');

// Rota robusta para 'matriculas' e 'matrículas' (com e sem encoding)
router.get(['/matriculas', '/matrículas', '/matr%C3%ADculas'], (req, res) => {
    Repair.getMatriculas()
        .then(data => res.json(data))
        .catch(err => res.status(500).json({ error: err.message }));
});

router.get('/interv', (req, res) => {
    Repair.getInterventions()
        .then(data => res.json(data))
        .catch(err => res.status(500).json({ error: err.message }));
});

router.get('/:id', (req, res) => {
    Repair.findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => res.status(500).json({ error: err.message }));
});

router.get('/', (req, res) => {
    if (req.query.ano) {
        Repair.findByYear(req.query.ano)
            .then(data => res.json(data))
            .catch(err => res.status(500).json({ error: err.message }));
    } else if (req.query.marca) {
        Repair.findByBrand(req.query.marca)
            .then(data => res.json(data))
            .catch(err => res.status(500).json({ error: err.message }));
    } else {
        Repair.list()
            .then(data => res.json(data))
            .catch(err => res.status(500).json({ error: err.message }));
    }
});

router.post('/', (req, res) => {
    Repair.insert(req.body)
        .then(data => res.status(201).json(data))
        .catch(err => res.status(500).json({ error: err.message }));
});

router.delete('/:id', (req, res) => {
    Repair.remove(req.params.id)
        .then(data => res.json(data))
        .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
