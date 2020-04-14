const { getConnection } = require('./databases');
//lectura y escritura de un archivo


module.exports = io => {
    io.on('connection', (socket) => {
        //socket de chat global
        console.log(socket.id);
        socket.on('recived', (data) => {
            getConnection().get('chat').push(data).write()
            io.emit('send', data);
        });
    });
}