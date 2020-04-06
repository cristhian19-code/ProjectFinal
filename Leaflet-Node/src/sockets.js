module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('new user connected');
        socket.on('recived', (coords) => {
            console.log(coords);
            socket.broadcast.emit('send', coords);
        })
    });
};
//exportando la funcion que va a escuchar el servidor