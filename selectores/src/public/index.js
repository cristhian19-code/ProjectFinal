const socket = io.connect();
const container_chat = document.querySelector('.container-chat');
const container_friends = document.querySelector('.container-friends');

//socket de los chats
socket.on('emisor', (data) => {
    const container = document.getElementById(`${data.recept}`);
    const p = document.createElement('p');
    p.className = 'text-success';
    p.textContent = data.email + ': ' + data.text;
    container.appendChild(p)
});

socket.on('receptor', (data) => {
    const container = document.getElementById(`${data.email}`);
    const p = document.createElement('p');
    p.className = 'text-primary';
    p.textContent = data.email + ': ' + data.text;
    container.appendChild(p)
});

//llenado de los datos del emisor , receptor y el mensaje
$('.btn-chat').click(function(e) {
    e.preventDefault();
    var text = $('#text').val();
    var email = $('#email').val();
    var recept = $('#dest').val();
    if (text != '' && email != '') {
        socket.emit('recived', ({ recept, text, email }));
    }
});

//socket de los amigos y logueo
socket.on('friends', (data) => {
    //obteniendo todos los datos del usuario
    const chat_friend = data.friends;
    //vaciando todo el contenido dentro del contenedor
    container_chat.innerHTML = null;
    container_friends.innerHTML = null;
    //recorriendo el chat con los amigos en particulares
    chat_friend.forEach(element => {
        //creando un contenedor para cada amigo
        const container_chat_friend = document.createElement('div');
        container_chat_friend.className = "border border-danger";
        //poniendo un identificador (nombre del amigo como id)
        container_chat_friend.id = element.friend;
        const p = document.createElement('p');
        p.textContent = element.friend;
        container_friends.appendChild(p);
        element.chat.forEach(conversation => {
            if (conversation.amigo != undefined) {
                const p_amigo = document.createElement('p');
                p_amigo.className = 'text-primary';
                p_amigo.textContent = conversation.amigo + ': ' + conversation.texto;
                container_chat_friend.appendChild(p_amigo);
            }
            if (conversation.yo) {
                const p_yo = document.createElement('p');
                p_yo.className = 'text-success';
                p_yo.textContent = conversation.yo + ': ' + conversation.texto;
                container_chat_friend.appendChild(p_yo);
            }
        });
        container_chat.appendChild(container_chat_friend);
    });
});

$('.btn-send').click(function(e) {
    e.preventDefault();
    var email = $('#email').val();
    if (email != '') {
        socket.emit('login', ({ email }));
    }
});