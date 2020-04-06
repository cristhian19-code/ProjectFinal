const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
//Initializations
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

//Setting 
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Routes
app.use(require('./routes/routes'));
app.use(express.static(path.join(__dirname, 'public')));

//Socket
require('./sockets')(io); //pasando el parametro io

//server
server.listen(3000, () => {
    console.log('Server on port ', 3000);
})