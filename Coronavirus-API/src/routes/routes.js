const { Router } = require('express');
const router = Router();

//modulos APIRest

const axios = require("axios");

// var data = require('./country');

const { getConnection } = require('../database');
const fs = require('fs');

//leyendo el archivo donde contiens los paises y su datos



router.get('/', (req, res) => {
    const country = getConnection().get('country').value();
    getConnection().get('data').remove().write();
    country.forEach((data) => {
        axios({
                "method": "GET",
                "url": "https://covid-19-data.p.rapidapi.com/country",
                "headers": {
                    "content-type": "application/octet-stream",
                    "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
                    "x-rapidapi-key": "c750f476e6mshf8d1c90e5b2142bp17510cjsn09f1faa45bb3"
                },
                "params": {
                    "format": "undefined",
                    "name": `${data}`
                }
            })
            .then((response) => {
                if (response.data[0] != undefined) {
                    getConnection().get('data').push(response.data[0]).write();
                }
            })
            .catch((error) => {
                //console.log(error)
            })
    });
    var datos_json = fs.readFileSync('./db.json', 'utf-8');
    var datosCoronaJ = JSON.parse(datos_json);
    var datosCoronaS = JSON.stringify(datosCoronaJ);
    fs.writeFileSync('./src/public/db.json', datosCoronaS, 'utf-8');
    const datos = getConnection().get('data').value();

    res.render('index', { datos });
});

module.exports = router;