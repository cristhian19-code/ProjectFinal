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
        $('#user').val(data.name);
    } else {
        alert('Aun no esta logueado');
    }
}

viewStorage();

//TEMPLATES

//template contraseñas no coinciden
const templatePasswortNoyMatch = () => {
    return `
    <div class="alert alert-warning my-2" role="alert">
        <strong>Passwords do not match</strong>
    </div>
    `
}

//template casilleros vacios
const templateEmptyLockers = () => {
    return `
    <div class="alert alert-warning my-2" role="alert">
        <strong>Please fill in all the boxes</strong>
    </div>
    `
}

//template registro exitoso
const templateSuccessfulRegistration = () => {
    return `
    <div class="alert alert-success my-2" role="alert">
        <strong>Successful registration</strong>
    </div>
    `
}

//template logueo exitoso
const templateSuccessfulLogin = () => {
    return `
    <div class="alert alert-success my-2" role="alert">
        <strong>Successful login</strong>
    </div>
    `
}

//template registro exitoso
const templateExistingUser = () => {
    return `
    <div class="alert alert-danger my-2" role="alert">
        <strong>The user is already registered please enter another email</strong>
    </div>
    `
}

//template no registrado
const templateNotRegistered = () => {
    return `
    <div class="alert alert-danger my-2" role="alert">
        <strong>You are not registered</strong>
    </div>
    `
}

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

//parse Html
const parseHTML = (plane) => {
    const alert = parseh.parseFromString(plane, 'text/html').querySelector('.alert');
    return alert;
}

//-----------funciones adicionales---------
const alertPassword = (alert) => {
    const passwordNotMath = parseHTML(templatePasswortNoyMatch());
    alert.appendChild(passwordNotMath);
    setInterval(() => {
        alert.innerHTML = null;
    }, 6000);
}

const alertRegistered = (alert) => {
    const userRegistered = parseHTML(templateNotRegistered());
    alert.appendChild(userRegistered);
    setInterval(() => {
        alert.innerHTML = null;
    }, 6000);
}

const alertRegistration = (alert) => {
    const successful = parseHTML(templateSuccessfulRegistration());
    alert.appendChild(successful);
    setInterval(() => {
        alert.innerHTML = null;
    }, 6000);
}

const alertLogueoSucce = (alert) => {
    const successful = parseHTML(templateSuccessfulLogin());
    alert.appendChild(successful);
    setInterval(() => {
        alert.innerHTML = null;
    }, 6000);
}

const alertExistingUser = (alert) => {
    const existing = parseHTML(templateExistingUser());
    alert.appendChild(existing);
    setInterval(() => {
        alert.innerHTML = null;
    }, 6000);
}

const alertBox = (alert) => {
    const emptyBox = parseHTML(templateEmptyLockers());
    alert.appendChild(emptyBox);
    setInterval(() => {
        alert.innerHTML = null;
    }, 6000);
};
//-------------------------

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

//escuchando el regreso de el register
socket.on('register-send', (data) => {
    if (data.validation) {
        clearStorage();
        setLocalStorage(data.email, { email: data.email, name: data.name });
        alertRegistration(alert_container);
        clearBoxRegister();
        usuario.textContent = data.name;
        $('#user').val(data.name);
    } else {
        alertExistingUser(alert_container);
    }
});

//escuchando el regreso de el login
socket.on('login-send', (data) => {
    if (data.confirm) {
        clearStorage();
        setLocalStorage(data.email, { email: data.email, name: data.name });
        alertLogueoSucce(alert_login);
        clearBoxLogin();
        usuario.textContent = data.name;
        $('#user').val(data.name);
    } else {
        alertRegistered(alert_login);
    }
});

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
    //boton de registro mediante socket
    $('.btn-register').click(async function(e) {
        e.preventDefault();
        alert_container.innerHTML = null;
        var name = $('#name').val();
        var email_register = $('#email-register').val();
        var password_register = $('#password-register').val();
        var password_confirm_register = $('#password-confirm-register').val();
        if (name != "" && email_register != "" && password_register != "" && password_confirm_register != "") {
            if (password_register === password_confirm_register) {
                await socket.emit('register-recived', { name, email: email_register, password: password_register });
            } else {
                alertPassword(alert_container);
            }
        } else {
            alertBox(alert_container);
        }
    });

    $('.btn-login').click(async function() {
        var email = $('#login-email').val();
        var password = $('#login-password').val();
        if (email != "" && password != "") {
            await socket.emit('login-recived', { email, password });
        } else {
            alertBox(alert_login);
        }
    });

    $('.btnexit').click(function() {
        clearStorage();
        location.reload();
    });
});