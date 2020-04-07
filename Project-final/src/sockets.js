const uuid = require('uuid/v4');
const { getConnection } = require('./databases');
//lectura y escritura de un archivo
const fs = require('fs');
fs.readFileSync(__dirname + '/public/db/user.json', 'utf-8');

module.exports = io => {
    io.on('connection', (socket) => {

        //socket de chat global
        console.log(socket.id);
        socket.on('recived', (data) => {
            getConnection().get('chat').push(data).write()
            io.emit('send', data);
        });

        //socket de registro
        socket.on('register-recived', (data) => {
            const { name, email, password } = data;
            const newUser = {
                id: uuid(),
                name,
                email,
                password,
                data: []
            };
            getConnection().get('user').push(newUser).write();
            var user = getConnection().get('user').value();
            fs.writeFileSync(__dirname + '/public/db/user.json', JSON.stringify({ user }), 'utf-8');
        });
    });
}