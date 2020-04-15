const moment = require('moment');
const { getConnection } = require('./database');
module.exports = (io) => {
    io.on('connect', (socket) => {
        console.log(socket.id);
        socket.on('recived-chat', (data) => {
            const newData = {
                user: data.user,
                text: data.text,
                time: moment().format('LT')
            }
            getConnection().get('chat').push(newData).write();
            io.emit('send-chat', newData);
        });
    })
}