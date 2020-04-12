const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const adapter = new FileAsync('db.json');
var db = null;

const parse = new DOMParser();
const createConnection = async() => {
    db = await low(adapter);
}

const getConnection = () => db;

const getStorageProfile = () => {
    const data = Object.keys(localStorage).map(key => localStorage.getItem(key));
    const datos = JSON.parse(data[0]);
    $('#name').val(datos.name);
    $('#email').val(datos.email);
    $('#year').val(datos.year);
    $('#date').val(datos.date);
}

const getStorageEdit = () => {
    const data = Object.keys(localStorage).map(key => localStorage.getItem(key));
    const datos = JSON.parse(data[0]);
    $('#edit-name').val(datos.name);
    $('#edit-email').val(datos.email);
    $('#edit-year').val(datos.year);
    $('#edit-date').val(datos.date);
}

const clearBox = () => {
    $('#password').val('');
    $('#confirm-password').val('');
}

const clearStorage = () => {
    localStorage.clear();
}

getStorageProfile();
createConnection();

const templateUserActive = (email, name, year, date, active, color) => {
    return `
    <a href="#!" class="list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${email}</h5>
            <p class="${color}">${active}</p>
        </div>
        <p class="mb-1">${name}</p>
        <small class="text-muted">${year}</small>
        <small class="text-muted">${date}</small>
    </a>     
    `
}

const parserUser = (templateUser) => {
    const template = parse.parseFromString(templateUser, 'text/html').querySelector('.list-group-item');
    $('.manage-accounts').append(template);
}

$(function() {

    $('#My-profile').click(function(e) {
        getStorageProfile();
        e.preventDefault();
        $('.my-profile').removeAttr('hidden');
        $('.edit-profile').attr('hidden', 'true');
        $('.manage-accounts').attr('hidden', 'true');
    });

    $('#Edit-profile').click(function(e) {
        getStorageEdit();
        e.preventDefault();
        $('.edit-profile').removeAttr('hidden');
        $('.my-profile').attr('hidden', 'true')
        $('.manage-accounts').attr('hidden', 'true');
    });

    $('#Manage-Accounts').click(function(e) {
        getStorageEdit();
        e.preventDefault();
        $('.edit-profile').attr('hidden', 'true');
        $('.my-profile').attr('hidden', 'true')
        $('.manage-accounts').removeAttr('hidden');
    });

    $('#confirm-password').keyup(function(e) {
        const password = $('#password').val();
        if (e.target.value == password) {
            $('#confirm-password').removeClass('btn btn-outline-danger');
            $('#confirm-password').addClass('btn btn-outline-success');
            $('.btn-confirm').removeAttr('disabled');
        } else {
            $('#confirm-password').removeClass('btn btn-outline-success');
            $('#confirm-password').addClass('btn btn-outline-danger');
            $('.btn-confirm').attr('disabled', 'true');
        }
    });

    $('.btn-confirm').click(async function(e) {
        e.preventDefault();
        var name = $('#edit-name').val();
        var email = $('#edit-email').val();
        var year = $('#edit-year').val();
        var date = $('#edit-date').val();
        const password = $('#password').val();
        const email_Storage = await JSON.parse(Object.keys(localStorage).map(key => localStorage.getItem(key))[0]).email;
        const result_password = await getConnection().get('user').find({ email: `${email_Storage}` }).value().password;
        if (result_password == password) {
            swal('Esta seguro de editar ?', {
                icon: 'warning',
                buttons: ['Cancelar', 'Actualizar'],
                closeOnEsc: false,
                closeOnClickOutside: false,
                dangerMode: true
            }).then(async(result) => {
                if (result) {
                    const update = { name, email, date, year };
                    await getConnection().get('user').find({ email: email_Storage }).assign(update).write();
                    clearStorage();
                    localStorage.setItem(email, JSON.stringify(update));
                    await swal('Se edito correctamente', {
                        timer: 2000,
                        icon: 'success',
                        closeOnEsc: false,
                        closeOnClickOutside: false,
                        button: false
                    });
                } else {
                    await swal('Edicion cancelada', {
                        timer: 2000,
                        icon: 'error',
                        closeOnEsc: false,
                        closeOnClickOutside: false,
                        button: false
                    });
                }
                $('.btn-secondary').trigger('click');
            });
        } else {
            await swal('No es la contraseña', {
                timer: 2000,
                icon: 'error',
                closeOnEsc: false,
                closeOnClickOutside: false,
                button: false
            });
        }
        clearBox();
    });

    $('#Manage-Accounts').click(async function(e) {
        e.preventDefault();
        const manage_accounts = document.querySelector('.manage-accounts');
        manage_accounts.innerHTML = null;
        const datos = getConnection().get('user').value();
        const email_storage = await JSON.parse(Object.keys(localStorage).map(key => localStorage.getItem(key))).email
        for (var i = 0; i < datos.length; i++) {
            if (datos[i].email == email_storage) {
                parserUser(templateUserActive(datos[i].email, datos[i].name, datos[i].year, datos[i].date, 'active', 'text-success'))
            } else {
                parserUser(templateUserActive(datos[i].email, datos[i].name, datos[i].year, datos[i].date, 'disabled', 'text-danger'))
            }
        }
    });

    $('#To-return').click(function(e) {
        e.preventDefault()
        location.href = 'index.html'
    })
});