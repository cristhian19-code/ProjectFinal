const express = require('express');
const app = express();
const swig = require('swig');
const morgan = require('morgan');
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const socket = require('socket.io')
const { createConnection } = require('./database');
const io = socket.listen(server);

//Setting
app.set('port', 2000);
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

//Routes
app.use(require('./routes/routes'));
app.use(express.static(path.join(__dirname, 'public')));

//Socket
require('./sockets')(io);

//initialization
createConnection();

//Server
server.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});