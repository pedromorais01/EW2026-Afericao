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
            // Ordenar por data (descendente - mais recente primeiro)
            const sortedList = response.data.sort((a, b) => b.data.localeCompare(a.data));
            res.render('index', { list: sortedList, date: new Date().toISOString() });
        })
        .catch(err => {
            res.render('error', { error: err });
        });
});

app.get('/marcas/:marca', (req, res) => {
    axios.get(api_url + "?marca=" + req.params.marca)
        .then(response => {
            const list = response.data;
            // Extrair modelos únicos daquela marca
            const models = [...new Set(list.map(r => r.viatura.modelo))].sort();
            res.render('brand', { list: list, brand: req.params.marca, models: models });
        })
        .catch(err => {
            res.render('error', { error: err });
        });
});

app.get('/:id', (req, res) => {
    axios.get(api_url + "/" + req.params.id)
        .then(response => {
            res.render('record', { r: response.data });
        })
        .catch(err => {
            res.render('error', { error: err });
        });
});

const PORT = 16026;
app.listen(PORT, () => {
    console.log(`Interface is running on port ${PORT}`);
});
