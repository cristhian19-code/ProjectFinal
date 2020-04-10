//limpiando cajas registro

const ClearBoxRegister = () => {
    $('#signup-name').val('');
    $('#signup-email').val('');
    $('#signup-password').val('');
    $('#signup-confirm-password').val('');
}

//limpiando cajas login

const ClearBoxLogin = () => {
    $('#login-email').val('');
    $('#login-password').val('');
}

//verificando si hay datos en el localStorage

const getStorage = () => {
    const data = Object.keys(localStorage).map(key => localStorage.getItem(key));
    if (data[0] != undefined) {
        const user = JSON.parse(data[0]);

        if (user) {
            const name = document.querySelector('.name-user')
            name.textContent = user.name;
            $('#btn-login-signup').attr('hidden', 'true');
        } else {
            $('#btn-login-signup').attr('hidden', 'false');
            console.log('Aun no esta logueado');
        }
    }
}

getStorage();

//limpiando el localStorage
const clearLocalStorage = () => {
    localStorage.clear();
}

//Eventos
$(function() {
    //modulos de connexion a db con json y alert estilizados
    const swit = require('sweetalert');
    const low = require('lowdb');

    const FileAsync = require('lowdb/adapters/FileAsync');
    const adapter = new FileAsync('db.json');

    let db = null;

    const createConnection = async() => {
        db = await low(adapter);
        db.defaults({ user: [] }).write();
    }

    //creando la base de dato en formato json
    createConnection();
    const getConnection = () => db;

    //objeto que contiene la funcion swit para reutilizar el codigo
    const alertsStyle = {
        alert: function(text, alert) {
            swit(text, {
                icon: alert,
                button: false,
                closeOnEsc: false,
                closeOnClickOutside: false,
                timer: 3000
            });
        },
        alertConfirm: function() {
            swit({
                    title: 'Esta seguro de finalizar la sesion?',
                    icon: 'warning',
                    buttons: true,
                    closeOnEsc: false,
                    closeOnClickOutside: false,
                    dangerMode: true
                })
                .then((result) => {
                    if (!result) {
                        swit("Sesion no finalizada", {
                            button: false,
                            timer: 3000,
                            closeOnEsc: false,
                            closeOnClickOutside: false,
                            icon: 'success'
                        });
                    } else {
                        clearLocalStorage();
                        swit("Sesion finalizada", {
                            button: false,
                            icon: 'error',
                            closeOnEsc: false,
                            closeOnClickOutside: false,
                            timer: 3000
                        });
                        setTimeout(() => {
                            location.reload();
                        }, 2000)
                    }
                });
        }
    }

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

                    alertsStyle.alert('REGISTRO EXITOSO', 'success');
                    setTimeout(() => {
                        location.reload();
                    }, 2000);
                    ClearBoxRegister();
                } else {
                    alertsStyle.alert('EL USUARIO YA SE ENCUENTRA REGISTRADO', 'warning');
                }
            } else {
                alertsStyle.alert('LAS CONTRASEÑAS NO COINCIDEN', 'error');
            }
        } else {
            alertsStyle.alert('CAJAS VACIAS', 'warning');
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
                    localStorage.setItem(email, JSON.stringify({ email, name: usuarios[0].name }));
                    veri = false;
                    break;
                }
            }
            if (!veri) {
                alertsStyle.alert('INICIO DE SESION EXITOSO', 'success');
                ClearBoxLogin();
                setTimeout(() => {
                    location.reload();
                }, 2000);
            } else {
                alertsStyle.alert('ACCESO DENEGADO', 'error');
            }
        } else {
            alertsStyle.alert('CAJAS VACIAS', 'warning');
        }
    });

    $('.send-datos').click(function(e) {
        e.preventDefault();
        user = $('#name').val();
        url = $('#url').val();
        getConnection().get('user').push({ user, url }).write();
    });

    $('#signup-confirm-password').keyup(function(e) {
        const password = $('#signup-password').val();
        if (e.target.value == password) {
            $('#signup-confirm-password').removeClass('btn btn-outline-danger');
            $('#signup-confirm-password').addClass('btn btn-outline-success');
        } else {
            $('#signup-confirm-password').addClass('btn btn-outline-danger');

        }
    });

    $('.btn-exit').click(function() {
        alertsStyle.alertConfirm();
    });
});