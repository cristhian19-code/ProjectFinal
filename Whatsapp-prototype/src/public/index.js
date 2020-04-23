const socket = io.connect();
const container_chat = document.querySelector('.container-chat')
const parser = new DOMParser();
//enviando email al servidor
$(document).ready(function(){
  const user = $('#user').val();
  socket.emit('init',{user});

  //localtizando las conversaciones con el amigo en especifico
  $('.btn-friend').click(function(e){
      e.preventDefault();
      $('#receptor').val('');
      $('#receptor').val(e.target.id);
      const username = $('#user').val();
      socket.emit('chat-friend',{receptor: e.target.id,username});
  });
});

//mostrando los datos encontrados
socket.on('send-chat-fiend',(data)=>{
    const {receptor,chat,id} = data;
    $('.container-chat').removeAttr('id');
    $('.container-chat').attr('id',`${id}`);
    container_chat.innerHTML = null;
    chat.forEach((item, i) => {
        if(typeof item.me != 'undefined'){
            $('.container-chat').append(templateChat(item.me,item.message,item.time));
        }
        if(typeof item.friend != 'undefined'){
            $('.container-chat').append(templateChat(item.friend,item.message,item.time));
        }
    });
    container_chat.scrollTop = container_chat.scrollHeight;
});

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

//cpmvertir el template string a html
const parserTemplate = (container,template) => {
    const parse = parser.parseFromString(template, 'text/html').querySelector('.toast');
    container.appendChild(parse);
}

//enviando conversacion al emisor y receptor en tiempo real
$('.btn-chat').click(function(e) {
    e.preventDefault();
    const user = $('#user').val();
    const text = $('#text').val();
    const name = $('#name').val();
    const receptor = $('#receptor').val();
    if (text != '' && receptor !='') {
        socket.emit('recived-chat', {user ,receptor ,text ,name });
    }
});

//llenado de dato para el emisor
socket.on('emisor',(data)=>{
  try {
    $('#text').val('');
    const id =''+data.id;
    const container = document.getElementById(id);
    const template =templateChat(data.name,data.text,data.time);
    parserTemplate(container,template);
    container.scrollTop = container.scrollHeight;
  } catch (error) {
      console.log('');
  }
})
//llenado de dato para el receptor
socket.on('receptor',(data)=>{
  try {
    const id =''+data.id;
    const container = document.getElementById(id);
    const template =templateChat(data.name,data.text,data.time);
    parserTemplate(container,template);
    container.scrollTop = container.scrollHeight;
  } catch (error) {
    console.log('');
  }
})

//
$('.btn-add-friend').click(function(e) {
    e.preventDefault();
    const friend = $('#add-friend').val();
    const username =  $('#user').val();
    const user =  $('#name').val();
    console.log(friend,username)
    if (username!='') {
        socket.emit('add-friend', {username,user,friend});
    }
});

socket.on('add-success',async (data)=>{
    if(data.response){
        await SweetAlert.alert('Usuario agregado exitosamente','success');
        $('.close').toggle('click');
        location.reload();
    }else{
        await SweetAlert.alert('el usuario no existe o ya se encuentra agregado','error');
    }
    $('.close').toggle('click');
    $('#add-friend').val('');
});

const SweetAlert = {
  alert:async (text,type)=>{
    await swal(text,{
      button:false,
      timer:3000,
      icon:type
    });
  }
}
