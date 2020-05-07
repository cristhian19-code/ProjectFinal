const { Router } = require('express');
const router = Router();

//ruta de la pagina inicial 
router.get('/', (req, res) => {
    res.render('index')
})

//rua de la pagina unete con el recibimiento de los datos del cuestionario
router.route('/unete')
    .get((req, res) => {
        res.render('unete');
    })
    .post((req, res) => {
        console.log(req.body);
        res.redirect('/')
    });


module.exports = router;