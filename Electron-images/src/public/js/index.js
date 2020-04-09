const container_login = document.querySelector('.container-login')
const container_signup = document.querySelector('.container-signup')

//Inicializacion del parseDOM
const parse = new DOMParser();

//TEMPLATES

//alert cajas vacias
const templateCajasVacias = () => {
    return `
    <div class="alert alert-warning" role="alert">
        <strong>Warning!</strong> Llene todos los casilleros.
    </div>
    `
}

const parseCajasVacias = (container) => {
    const alert = parse.parseFromString(templateCajasVacias(), 'text/html').querySelector('.alert');
    container.appendChild(alert);
    setTimeout(() => {
        container.innerHTML = null;
    }, 4000);
}

//alert contraseñas no coinciden

const templateContraNoCoinciden = () => {
    return `
    <div class="alert alert-warning" role="alert">
        <strong>Warning!</strong> Las contraseñas no coinciden.
    </div>
    `
}

const parseContraNoCoinciden = (container) => {
    const alert = parse.parseFromString(templateContraNoCoinciden(), 'text/html').querySelector('.alert');
    container.appendChild(alert);
    setTimeout(() => {
        container.innerHTML = null;
    }, 4000);
}

//registro exitoso
const templateRegistroExitoso = () => {
    return `
    <div class="alert alert-success" role="alert">
        <strong>Well done!</strong> Registro exitoso.
    </div>
    `
}

const parseRegistroExitoso = (container) => {
    const alert = parse.parseFromString(templateRegistroExitoso(), 'text/html').querySelector('.alert');
    container.appendChild(alert);
    setTimeout(() => {
        container.innerHTML = null;
    }, 4000);
}

//usuarios ya registrado
const templateUsuarioYaRegistrado = () => {
    return `
    <div class="alert alert-danger" role="alert">
        <strong>Oh snap!</strong> El usuario ya se encuantra registrado.
    </div>
    `
}

const parseUsuarioYaRegistrado = (container) => {
    const alert = parse.parseFromString(templateUsuarioYaRegistrado(), 'text/html').querySelector('.alert');
    container.appendChild(alert);
    setTimeout(() => {
        container.innerHTML = null;
    }, 4000);
}

//iniciar sesion exitoso
const templateInicioSesionExitoso = () => {
    return `
    <div class="alert alert-success" role="alert">
        <strong>Well done!</strong> Inicio de sesion exitoso.
    </div>
    `
}

const parseInicioSesionExitoso = (container) => {
    const alert = parse.parseFromString(templateInicioSesionExitoso(), 'text/html').querySelector('.alert');
    container.appendChild(alert);
    setTimeout(() => {
        container.innerHTML = null;
    }, 4000);
}

//usuarios ya registrado
const templateInicioSesionDenegada = () => {
    return `
    <div class="alert alert-danger" role="alert">
        <strong>Oh snap!</strong> Email o contraseña incorrecta.
    </div>
    `
}

const parseInicioSesionDenegada = (container) => {
    const alert = parse.parseFromString(templateInicioSesionDenegada(), 'text/html').querySelector('.alert');
    container.appendChild(alert);
    setTimeout(() => {
        container.innerHTML = null;
    }, 4000);
}

//Eventos
$(function() {
    const low = require('lowdb');
    const FileAsync = require('lowdb/adapters/FileAsync');
    const adapter = new FileAsync('db.json');

    let db = null;

    const createConnection = async() => {
        db = await low(adapter);
        db.defaults({ user: [] }).write();
    }
    createConnection();
    const getConnection = () => db;

    $('.btn-signup').click(function(e) {
        var verificacion = true;
        e.preventDefault();
        var name = $('#signup-name').val();
        var email = $('#signup-email').val();
        var password = $('#signup-password').val();
        var confirm_password = $('#signup-confirm-password').val();
        if (name != '' && email !== '' && password != '' && confirm_password != '') {
            if (password == confirm_password) {
                const usuarios = getConnection().get('user').value();
                for (var i = 0; i < usuarios.length; i++) {
                    if (usuarios[i].email == email) {
                        verificacion = false;
                        break;
                    }
                }
                if (verificacion) {
                    const datos = {
                        email,
                        name,
                        password,
                        datos: []
                    }
                    getConnection().get('user').push(datos).write();
                    parseRegistroExitoso(container_signup);
                } else {
                    parseUsuarioYaRegistrado(container_signup);
                }
            } else {
                parseContraNoCoinciden(container_signup);
            }
        } else {
            parseCajasVacias(container_signup);
        }
    });

    $('.btn-login').click(function(e) {
        e.preventDefault();
        var veri = true;
        var email = $('#login-email').val()
        var password = $('#login-password').val()
        if (email != '' && password != '') {
            const usuarios = getConnection().get('user').value();
            for (var i = 0; i < usuarios.length; i++) {
                if (usuarios[i].email == email && usuarios[i].password == password) {
                    localStorage.setItem(email, JSON.stringify({ email, password }));
                    veri = false;
                    break;
                }
            }
            if (!veri) {
                parseInicioSesionExitoso(container_login);
            } else {
                parseInicioSesionDenegada(container_login);
            }
        } else {
            parseCajasVacias(container_login);
        }
    });

    $('.send-datos').click(function(e) {
        e.preventDefault();
        user = $('#name').val();
        url = $('#url').val();
        getConnection().get('user').push({ user, url }).write();
    });
});