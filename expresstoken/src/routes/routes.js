const { Router } = require('express');
const jwt = require('jsonwebtoken');
const router = Router();

router.get('/', (req, res) => {
    res.render('index');
})

router.get('/login', (req, res) => {
    res.render('login');
});


router.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const newData = {
        email,
        password
    }
    jwt.sign(newData, 'my_secret_token', (err, token) => {
        if (err) {
            console.log(err);
        } else {
            console.log();
        }
    });
    res.redirect('/api/files');
});


router.get('/api/files', verification, (req, res) => {
    jwt.verify(req.token, 'my_secret_token', (err, data) => {
        if (err) {
            res.redirect('/');
        } else {
            res.redirect('/files');
        }
    })
});


function verification(req, res, next) {
    console.log(req.body);
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
    if (bearerHeader === undefined) {
        res.redirect('/login');
    } else {
        const bearer = bearerHeader.split(" ");
        const beareToken = bearer[1];
        req.token = beareToken;
        next();
    }
}

// app.listen(3000, () => {
//     console.log('server on port 3000');
// });

// app.post('/api/login', (req, res) => {
//     const user = { id: 3 }
//     const token = jwt.sign({ user }, 'my_secret_token');
//     res.json({ token });
// });

// app.get('/protected', ensureToken, (req, res) => {
//     jwt.verify(req.token, 'my_secret_token', (err, data) => {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             res.json({
//                 text: 'protected'
//             })
//         }
//     })
// });

// function ensureToken(req, res, next) { //middleware para verificar si el usario se logio primero y proteger las rotas siguintes
//     const bearerHeader = req.headers['authorization'];
//     if (typeof bearerHeader == 'undefined') {
//         res.redirect('/login');
//     } else {
//         const bearer = bearerHeader.split(" ");
//         const bearerToken = bearer[1];
//         req.token = bearerToken;
//         next()
//     }
// }
// app.get('/login', (req, res) => {
//     res.json({
//         text: 'tienes que logearte primero'
//     })
// })

// app.get('/', (req, res) => {
//     res.json({
//         text: 'hola que tal'
//     });
// });
module.exports = router;