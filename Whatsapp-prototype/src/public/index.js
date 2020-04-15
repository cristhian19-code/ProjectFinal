const socket = io.connect();
const container_chat = document.querySelector('.container-chat')
const parser = new DOMParser();
const templateChat = (user, texto, time) => {
    return `
    <div class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
            <strong class="mr-auto">${user}</strong>
            <small>${time}</small>
        </div>
        <div class="toast-body">
            ${texto}
        </div>
    </div>
    `
}
const parserTemplate = (template) => {
    const parse = parser.parseFromString(template, 'text/html').querySelector('.toast');
    container_chat.appendChild(parse);
}

socket.on('send-chat', (data) => {
    const template = templateChat(data.user, data.text, data.time);
    parserTemplate(template);
    $('#text').val('');
});

$('.btn').click(function(e) {
    e.preventDefault();
    const user = $('#user').val();
    const text = $('#text').val();
    if (text != '') {
        socket.emit('recived-chat', { user, text });
    }
});