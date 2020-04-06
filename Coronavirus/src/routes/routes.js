const { Router } = require('express');
const router = Router();
const fs = require('fs');
const uuid = require('uuid/v4');
const { getConnection } = require('../database');

//mostrando el mapa en la ruta principal y actualizando casos por departamentos
router.get('/', (req, res) => {
    var datos = getConnection().get('Departamentos').value();
    var casos = 0;
    for (var i = 0; i < datos.length; i++) {
        casos += parseInt(datos[i].positivos, 10);
    }
    //actualizado los casos totales
    getConnection().update('CasosTotales', n => casos).write();
    //copiardo el archivo db.json de src al de public mediando copia y sobreescritura
    var coronaUpdate = fs.readFileSync('db.json', 'utf-8');
    fs.writeFileSync('./src/public/db.json', coronaUpdate, 'utf-8');
    res.render('index', { casos });
});


//mostrar los datos para modificar o eliminar
router.get('/list', (req, res) => {
    var datos = getConnection().get('Departamentos').value();
    res.render('datos', { datos });
});

//actualizar datos de archivo json
router.post('/list', (req, res) => {
    var datos = getConnection().get('Departamentos').value();
    const { departamento, positivos, recuperados, fallecidos } = req.body;
    for (var i = 0; i < datos.length; i++) {
        if (datos[i].departamento == departamento) {
            getConnection().update(`Departamentos[${i}].positivos`, n => positivos).write();
            getConnection().update(`Departamentos[${i}].recuperados`, n => recuperados).write();
            getConnection().update(`Departamentos[${i}].fallecidos`, n => fallecidos).write();
            break;
        }
    }
    res.redirect('/list')
});

//ingresando a la pagina para almacenar
router.get('/save', (req, res) => {
    res.render('saveData');
});

//almacenamiento de los datos COVID-19
router.post('/save', (req, res) => {
    const { departamento, lng, lat, positivos, recuperados, fallecidos } = req.body;
    //validando cajas con datos
    if (departamento != "" && lng != "" && lat != "" && positivos != "" && recuperados != "" && fallecidos != "") {
        const newData = {
            id: uuid(),
            position: {
                lng,
                lat
            },
            departamento,
            positivos,
            recuperados,
            fallecidos,
        };
        getConnection().get('Departamentos').push(newData).write();
    }
    res.redirect('/');
});

module.exports = router;