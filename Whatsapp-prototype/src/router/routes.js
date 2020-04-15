const { Router } = require('express');
const LocalStrategy = require('passport-local').Strategy;
const uuid = require('uuid/v4');
const { getConnection } = require('../database');
const passport = require('passport');
const router = Router();
var email;
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

passport.serializeUser(function(user, done) {
    done(null, { id: user.id });
});


passport.deserializeUser(function(id, done) {
    const data = getConnection().get('user').find(id).value();
    done(null, data);
});

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/chat', (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
}, (req, res) => {
    const datos = getConnection().get('user').find({ username: email }).value();
    const chat = getConnection().get('chat').value();
    const Chat = {
        user: datos.user,
        chat
    }
    res.render('chat', { Chat });
});

router.post('/register', (req, res) => {
    const { username, user, password } = req.body;
    const val = getConnection().get('user').find({ username }).value();
    if (typeof val == "undefined") {
        const newData = {
            id: uuid(),
            user,
            username,
            password
        }
        getConnection().get('user').push(newData).write();
    }
    res.redirect('/');
});

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/'
}), (req, res) => {
    email = req.body.username;
    res.redirect('/chat');
});

module.exports = router;