const express = require('express');
const app = express();
const morgan = require('morgan');
const http = require('http');
const server = http.createServer(app)
const path = require('path');
const swig = require('swig');
const passport = require('passport')
const cookie = require('cookie-parser');
const { createConnection } = require('./database');
const session = require('express-session');
const socket = require('socket.io');
const io = socket(server);

//Settings
app.set('port', 4000);
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cookie('cristhianqwerty'));

app.use(session({
    secret: 'cristhianqwerty',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

//Routes

app.use(require('./router/routes'));
app.use(express.static(path.join(__dirname, 'public')));

//Socket

require('./sockets')(io);
createConnection();

server.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});