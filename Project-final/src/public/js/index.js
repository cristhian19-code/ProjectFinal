const socket = io();
const chat = document.querySelector('.chat');
const alert_container = document.querySelector('.alert');
const alert_login = document.querySelector('.alert-login');
const usuario = document.querySelector('.usuario');

//initialization
const parseh = new DOMParser();

//guandando los key del localStorage
const viewData = () => {
    return Object.keys(localStorage).map(key => key);
};

// verificando si es un correo los datos de localStorage
function correoValidation() {
    var path = /@/;
    for (var i = 0; i < viewData().length; i++) {
        if (path.test(viewData()[i])) {
            return viewData()[i];
            break;
        }
    }
}

//eliminar datos del localStorage
const clearStorage = () => {
    localStorage.clear();
}

//mostrar datos del localStorage

const viewStorage = () => {
    if (correoValidation()) {
        const data = JSON.parse(localStorage.getItem(correoValidation()));
        usuario.textContent = data.name;
        $('.btn-group').removeAttr('hidden');
        $('.gallery').removeAttr('hidden');
        $('.save-photos').removeAttr('hidden');
        $('.avatar-user').attr('src', '/uploads/' + data.avatar);
        $('#user').val(data.name);
    } else {
        $('.btn-group').attr('hidden', 'true');
        $('.gallery').attr('hidden', 'true');
        $('.save-photos').attr('hidden', 'true');
        alert('Aun no esta logueado');
    }
}

viewStorage();


//template send chat
const templateChat = (user, msg) => {
    return `
    <div class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
            <strong class="mr-auto">${user}</strong>
        </div>
        <div class="toast-body">
            ${msg}
        </div>
    </div>
    `
}

//parse chatHtml
const parsechatHTML = (chat) => {
    const chattemplate = parseh.parseFromString(chat, 'text/html').querySelector('.toast');
    return chattemplate;
}

//recibiendo los datos escuchados por el servidor
socket.on('send', (data) => {
    chat.appendChild(parsechatHTML(templateChat(data.user, data.texto)));
});

//funcion para limpiar las cajas del registro
const clearBoxRegister = () => {
    $('#name').val('');
    $('#email-register').val('');
    $('#password-register').val('');
    $('#password-confirm-register').val('');
};
//funciton para limpiar las cajas del login
const clearBoxLogin = () => {
    $('#login-email').val('');
    $('#login-password').val('');
}

//almacenamiento en el localStorage
const setLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

//sweetAlert

const alertSwee = (text, tipe) => {
    swal(text, {
        icon: tipe,
        button: false,
        timer: 4000,
        button: false,
        closeOnEsc: false,
        closeOnClickOutside: false,
    })
}

//Objeto para las validaciones del loin y el register
const Validation = {
    validationLogin: function(email, password) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = async function() {
            if (this.readyState == 4 && this.status == 200) {
                var validation = false;
                const response = JSON.parse(xhttp.responseText);
                const users = response.user;
                for (var i = 0; i < users.length; i++) {
                    if (users[i].email == email && users[i].password == password) {
                        validation = true;
                        datos = { email: users[i].email, name: users[i].name, avatar: users[i].avatar };
                        break;
                    }
                }
                if (validation) {
                    clearStorage();
                    setLocalStorage(datos.email, datos);
                    clearBoxLogin();
                    $('.btn-group').removeAttr('hidden');
                    $('.gallery').removeAttr('hidden');
                    $('.save-photos').removeAttr('hidden');
                    $('.avatar-user').attr('src', '/uploads/' + datos.avatar);
                    usuario.textContent = datos.name;
                    $('#user').val(datos.name);
                    await alertSwee('INICIO DE SESION EXITOSO', 'success');
                    $('.close').trigger('click');
                } else {
                    await alertSwee('NO ESTA REGISTRADO', 'error');
                }
            }
        };
        xhttp.open("GET", "/db/user.json", true);
        xhttp.send();
    }
}

//ejecutar al iniciar
$(function() {
    $('.btnchat').click(function(e) {
        e.preventDefault();
        var user = $('#user').val();
        var texto = $('#texto').val();
        if (user != "" && texto != "") {
            //enviando los datos
            socket.emit('recived', { user, texto });
            $('#texto').val('');
        }
    });

    $('.btn-login').click(async function(e) {
        e.preventDefault();
        var email = $('#login-email').val();
        var password = $('#login-password').val();
        if (email != "" && password != "") {
            await Validation.validationLogin(email, password);
        } else {
            await alertSwee('CAJAS VACIAS', 'warning');
        }
    });

    $('.btnexit').click(async function(e) {
        e.preventDefault();
        await swal({
                title: "SEGURO DE SALIR?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then(async function(exit) {
                if (exit) {
                    $('.btn-group').attr('hidden', 'true');
                    clearStorage();
                    await alertSwee('SESSION FINALIZADA', 'error')
                    setTimeout(() => {
                        location.reload();
                    }, 3000);
                } else {
                    await alertSwee('CERRAR SESION CANCELADA', 'success');
                }
            });
    });
});