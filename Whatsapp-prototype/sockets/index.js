const express = require('express');
const http = require('http');
const paht = require('path');
const swig = require('swig');
const app = express();
const server = http.createServer(app);
const fs = require('fs');
const json_data = fs.readFileSync('./sockets/datos.json', 'utf-8');
var data = JSON.parse(json_data);


server.listen(2000);
console.log('server on port', 2000);
//Setting
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', 'public');

app.get('/', (req, res) => {
    res.render('index', { data });
});

app.post('/', (req, res) => {
    res.redirect('/');
});
//Sockets
const socket = require('socket.io');
const io = socket.listen(server);

io.on('connect', (socket) => {
    console.log('conectado: ' + socket.id);
    socket.on('entrada', (datos) => {
        const new_data = { user: datos.user, texto: datos.texto };
        data.push(new_data);
        const mensajes = JSON.stringify(data);
        fs.writeFileSync('./sockets/datos.json', mensajes, 'utf-8');
        console.log('user: ' + datos.user + ' || texto: ' + datos.texto);
        io.emit('salida', new_data);
    });
});