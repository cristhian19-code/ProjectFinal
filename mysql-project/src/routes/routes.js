const { Router } = require('express');
const router = Router();
const uuid = require('uuid/v4');
const mysqlConnection = require('../databases');

//metodo get del indice
router.get('/', (req, res) => {
    res.render('index');
});

//metodo post del indice
router.post('/', (req, res) => {
    var { name } = req.body;
    if (name == '') {
        mysqlConnection.query('SELECT * FROM user', (err, rows, field) => {
            if (!err) {
                res.render('index', { rows });
            } else {
                console.log(err);
            }
        });
    } else {
        mysqlConnection.query('SELECT * FROM user WHERE MATCH (codigo,name,phone) AGAINST (? IN BOOLEAN MODE)', [`${name}`], (err, rows, field) => {
            if (!err) {
                res.render('index', { rows });
            } else {
                console.log(err);
                res.redirect('/');
            }
        });
    }
});

//metodo get del formulario
router.get('/form', (req, res) => {
    res.render('form');
});

//metodo post del formulario
router.post('/form', (req, res) => {
    const { name, phone } = req.body;
    console.log(req.body);
    mysqlConnection.query('INSERT INTO user VALUES(?,?,?)', [uuid(), name, phone], (err, result, fields) => {
        if (!err) {
            console.log('register successful ' + result.insertId);
            res.redirect('/');
        } else {
            console.log(err);
        }
    });
});

//editando los datos
router.post('/edit', (req, res) => {
    const { nameChange, phoneChange, codigo } = req.body;
    mysqlConnection.query('UPDATE user SET name =? ,phone =? WHERE codigo =?', [nameChange, phoneChange, codigo], (err, results, field) => {
        if (err) throw err;
        res.redirect('/');
    });
});


//consultando
router.get('/edit/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM user WHERE codigo = ?', [id], (err, rows, field) => {
        if (!err) {
            res.status(200).send({ rows });
        } else {
            console.log(err);
        }
    })
});

//eliminando
router.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM user where codigo =?', [id], (err, results, field) => {
        if (!err) {
            console.log('deleted ' + results.affectedRows + ' rows');
            res.redirect('/');
        } else {
            console.log(err);
        }
    })
});

module.exports = router;