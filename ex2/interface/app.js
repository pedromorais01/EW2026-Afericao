const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

const api_url = process.env.API_URL || "http://localhost:16025/repairs";

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    axios.get(api_url)
        .then(response => {
            const sortedList = response.data.sort((a, b) => b.data.localeCompare(a.data));
            res.render('index', { list: sortedList, date: new Date().toISOString() });
        })
        .catch(err => {
            res.render('error', { error: err });
        });
});

// Lógica para tratar /:id e /:marca na mesma rota base como pedido no PDF
app.get('/:idOrBrand', (req, res) => {
    const p = req.params.idOrBrand;
    
    // Se for numérico (ID 1, 2, 3...), tratamos como Registo
    if (/^\d+$/.test(p)) {
        axios.get(api_url + "/" + p)
            .then(response => {
                if (response.data) {
                    res.render('record', { r: response.data });
                } else {
                    res.render('error', { error: { stack: "Registo não encontrado" } });
                }
            })
            .catch(err => res.render('error', { error: err }));
    } else {
        // Caso contrário, tratamos como Marca
        axios.get(api_url + "?marca=" + p)
            .then(response => {
                const list = response.data;
                const models = [...new Set(list.map(r => r.viatura.modelo))].sort();
                res.render('brand', { list: list, brand: p, models: models });
            })
            .catch(err => res.render('error', { error: err }));
    }
});

const PORT = 16026;
app.listen(PORT, () => {
    console.log(`Interface is running on port ${PORT}`);
});
