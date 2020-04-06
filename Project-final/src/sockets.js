const uuid = require('uuid/v4');
const { getConnection } = require('./databases');

//funcion de validacion de correo existente
function validation(datos, email) {
    if (datos.length > 0) {
        for (var i = 0; i < datos.length; i++) {
            if (datos[i].email == email) {
                return true;
            }
        }
    }
    return false;
}
//funcion de validacion de datos correctos
function validationExisting(datos, email, password) {
    if (datos.length > 0) {
        for (var i = 0; i < datos.length; i++) {
            if (datos[i].email == email && datos[i].password == password) {
                return true;
            }
        }
    }
    return false;
}

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
            const existingMail = getConnection().get('user').value();
            const { name, email, password } = data;
            if (validation(existingMail, email)) {
                io.emit('register-send', { validation: false });
            } else {
                const newUser = {
                    id: uuid(),
                    name,
                    email,
                    password,
                    data: []
                };
                getConnection().get('user').push(newUser).write();
                io.emit('register-send', { validation: true, name, email });
            }
        });

        //socket de login
        socket.on('login-recived', (data) => {
            const existingMail = getConnection().get('user').value();
            if (validationExisting(existingMail, data.email, data.password)) {
                io.emit('login-send', { confirm: true, email: data.email, password: data.password });
            } else {
                io.emit('login-send', { confirm: false, email: data.email, password: data.password });
            }
        });
    });
}