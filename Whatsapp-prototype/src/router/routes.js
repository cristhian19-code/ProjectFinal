const { Router } = require('express');
const LocalStrategy = require('passport-local').Strategy;
const uuid = require('uuid/v4');
const path = require('path');
const multer = require('multer');
const { getConnection } = require('../database');
const passport = require('passport');
const router = Router();
var url;
var email;

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename: (req, file, cb) => {
        const URL = uuid() + path.extname(file.originalname);
        url = URL;
        cb(null, URL)
    }
});
//alamacenamieto de la imagen
const upload = multer({
    dest: path.join(__dirname, '../public/uploads'),
    storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter: (res, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif|ico/
        const mimetypes = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));
        if (mimetypes && extname) {
            respo = true;
            return cb(null, true);
        }
        respo = false;
        return cb(null, false);
    }
}).single('avatar');
//------------------

//restriccion de rutas , solo ingresan a /chat si el usuario se logue
passport.use(new LocalStrategy(
    function(username, password, done) {
        const datos = getConnection().get('user').find({ username }).value();
        if (datos != undefined) {
            if (username == datos.username && password == datos.password) {
                return done(null, { id: datos.id, username: datos.username });
            }
        }
        done(null, false);
    }
));
//serializando los datos
passport.serializeUser(function(user, done) {
    done(null, { id: user.id });
});

//deserializando los datos
passport.deserializeUser(function(id, done) {
    const data = getConnection().get('user').find(id).value();
    done(null, data);
});


router.get('/', (req, res) => {
    res.render('index');
});

//ruta protegida
router.get('/chat', (req, res, next) => {
    if (req.isAuthenticated()) { //verificando si se logue el usuario
        next();
    } else {
        res.redirect('/');
    }
}, (req, res) => {
    const datos = getConnection().get('user').find({ username: email }).value();
    const chat = getConnection().get('chat').value();
    const Chat = {
        user: datos.user,
        avatar: datos.avatar,
        chat
    }
    res.render('chat', { Chat });
});


router.post('/register', upload, (req, res) => {
    const { username, user, password } = req.body;
    const val = getConnection().get('user').find({ username }).value();
    if (typeof val == "undefined") {
        const newData = {
            id: uuid(),
            avatar: url,
            user,
            username, //username == email
            password
        }
        getConnection().get('user').push(newData).write();
    }
    res.redirect('/');
});


//ruta de logeo y verificacion de datos
router.post('/login', passport.authenticate('local', { //autenticando
    failureRedirect: '/' //redireccionar si los datos son erroneos
}), (req, res) => {
    email = req.body.username;
    res.redirect('/chat');
});

module.exports = router;