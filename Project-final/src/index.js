const express = require('express');
const swig = require('swig');
const path = require('path');
const http = require('http');
const morgan = require('morgan');
const socketIO = require('socket.io');
const { createConnection } = require('./databases');

//Initialization
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

createConnection();

//Setting
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

//Middleware 
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

//Routes
app.use(require('./routes/routes'));
app.use(express.static(path.join(__dirname, 'public')));

//Sockets
require('./sockets')(io); //importando la funcion para usar socket

server.listen(5000, () => {
    console.log('Server on port ', 5000);
});