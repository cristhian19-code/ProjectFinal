const { Router } = require('express');
const router = Router();
const { getConnection } = require('../databases');

router.get('/', (req, res) => {
    var datos = getConnection().get('chat').value();
    res.render('index', { datos });
});


module.exports = router;