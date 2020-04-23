const moment = require('moment');
const uuid = require('uuid/v4');
const { getConnection } = require('./database');
var usuarios = {};

module.exports = (io) => {
    io.on('connect', (socket) => {
        console.log(socket.id);

        //almacenando su id y su identificador(correo) del usuario
        socket.on('init',(data)=>{
            usuarios[data.user] =socket.id;
            console.log(usuarios)
        });

        //recibiendo datos del chat
        socket.on('recived-chat', (data) => {
            const {user,receptor,text,name} = data;
            const id_emisor = getConnection().get('user').find({username:user}).value();
            const id_receptor = getConnection().get('user').find({username:receptor}).value();

            const recept = {
              id: id_emisor.id,
              name,
              time: moment().format('LT'),
              text
            }
            const emisor ={
              id: id_receptor.id,
              name,
              time: moment().format('LT'),
              text
            }
            //
            getConnection().get('user').find({username:user}).get('friends').find({email:receptor}).get('chat').push({
              me:name,
              message:text,
              time: moment().format('LT')
            }).write();

            getConnection().get('user').find({username:receptor}).get('friends').find({email:user}).get('chat').push({
              friend:name,
              message:text,
              time: moment().format('LT')
            }).write();

            io.to(socket.id).emit('emisor',emisor);
            io.to(usuarios[receptor]).emit('receptor',recept);
        });

        //enviando la conversacion al usuario actual
        socket.on('chat-friend',(data)=>{
          const {receptor,username} = data;
          const friend = getConnection().get('user').find({username}).get('friends').find({email : receptor}).get('chat').value();
          const val = getConnection().get('user').find({username:receptor}).value();
          io.to(socket.id).emit('send-chat-fiend', {chat: friend,receptor:data.receptor,id:val.id});
        });

        //agregando a la lista de amigos
        socket.on('add-friend',(data)=>{
          console.log(data);
          const {username,user,friend} =data;
          const val = getConnection().get('user').find({username:friend}).value();
          const val1 = getConnection().get('user').find({username}).value();
          var response;
          if(typeof val != 'undefined'){
            const exist = getConnection().get('user').find({username}).get('friends').find({email:friend}).value();
            if(typeof exist == 'undefined'){
              getConnection().get('user').find({username}).get('friends').push({
                avatar:val.avatar,
                id:val.id,
                email:friend,
                name:val.user,
                chat:[]
              }).write();
              getConnection().get('user').find({username:friend}).get('friends').push({
                avatar:val1.avatar,
                id:val1.id,
                email:username,
                name:user,
                chat:[]
              }).write();
              response = true;
            }else{
              response = false;
            }
          }else {
            response = false;
          }
          io.to(socket.id).emit('add-success', {response});
        });
    })
}
