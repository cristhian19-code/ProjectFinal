var usuarios = {};
const { getConnection } = require('./database');

module.exports = (io) => {
    io.on('connect', (socket) => {
        console.log(socket.id);
        socket.on('login', (data) => {
            var friends;
            const user = data.email;
            usuarios[user] = socket.id;
            console.log(usuarios);
            const val = getConnection().get('user').find({ user }).value();
            if (typeof val == 'undefined') {
                getConnection().get('user').push({
                    user,
                    friends: []
                }).write();
            }
            friends = getConnection().get('user').find({ user }).get('friends').value();
            io.to(socket.id).emit('friends', { friends });
        });
        socket.on('recived', (data) => {
            console.log(data);
            //verificando si existen
            const receptor = getConnection().get('user').find({
                user: data.email
            }).get('friends').find({
                friend: data.recept
            }).value();

            const emisor = getConnection().get('user').find({
                user: data.recept
            }).get('friends').find({
                friend: data.email
            }).value();

            if (typeof receptor == 'undefined' && typeof emisor == 'undefined') {
                //guardando al usuario emisor si no existe en la lista del usuario receptop
                getConnection().get('user').find({
                    user: data.recept
                }).get('friends').push({
                    friend: data.email,
                    chat: []
                }).write();
                getConnection().get('user').find({
                    user: data.email
                }).get('friends').push({
                    friend: data.recept,
                    chat: []
                }).write();
                //almacenando el chat del usuaior emisor
                getConnection().get('user').find({
                    user: data.email
                }).get('friends').find({
                    friend: data.recept
                }).get('chat').push({
                    yo: data.email,
                    texto: data.text
                }).write();
                //almacenando en el chat del usuario receptop
                getConnection().get('user').find({
                    user: data.recept
                }).get('friends').find({
                    friend: data.email
                }).get('chat').push({
                    amigo: data.email,
                    texto: data.text
                }).write();
            } else {
                //almacenando el chat del usuaior emisor
                getConnection().get('user').find({
                    user: data.email
                }).get('friends').find({
                    friend: data.recept
                }).get('chat').push({
                    yo: data.email,
                    texto: data.text
                }).write();
                //almacenando en el chat del usuario receptop
                getConnection().get('user').find({
                    user: data.recept
                }).get('friends').find({
                    friend: data.email
                }).get('chat').push({
                    amigo: data.email,
                    texto: data.text
                }).write();
            }
            var recept_id = usuarios[data.recept];
            //receptor
            io.to(recept_id).emit('receptor', data);
            //emisor
            io.to(socket.id).emit('emisor', data);
        })
    })
}