const btn = document.querySelector('.send-datos');
const name = document.querySelector('#name');
const url = document.querySelector('#url');
const addItems = document.querySelector('.items');


//instanciando el objeto para hacer conversion de string a formato html
const parse = new DOMParser();

//poniendo datos a la cadena con contenido html
const createCard = (name, url) => {
    return `
        <div class="card">
            <div class="card-body display-4 text-center">${name.value}</div>
            <img class="card-img-bottom" src="${url.value}" alt="Card image cap">
        </div>
    `
};

url.addEventListener('keyup', () => {
    btn.disabled = !url.validity.valid;
});

btn.addEventListener('click', (e) => {
    e.preventDefault();

    if (url.value != "") {
        const item = parsehtml(createCard(name, url));
        addItems.appendChild(item);
    }

    clearForm();
});

//button para agregar el avatar
const container_user = document.querySelector('.container-user');

//boton para obtener el valor de la images (nombre)
const file_image = document.querySelector('.file-image')

//formulario de login
const login = document.querySelector('.login');
const login_email = document.querySelector('#login-email');
const login_password = document.querySelector('#login-password');

//formulario de registro
const register = document.querySelector('.register')
const register_name = document.querySelector('#register-name');
const register_email = document.querySelector('#register-email');
const register_password = document.querySelector('#register-password');
const register_confirm_password = document.querySelector('#register-confirm-password');

//leyendo y agregando datos al json
function saveData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const response = JSON.parse(xhttp.responseText);
            const user = response.user;
        }
    };
    xhttp.open("GET", "../public/db/db.json", true);
    xhttp.send();
}
//inicializando
saveData();

//creando template de el avatar del usuario
const createAvatar = (img) => {
    return `
    <div>
        <button class="button-user dropdown-toggle p-0 button-avatar" type="button" id="dropdownMenu4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img src="${img}" alt="" height="50px" width="50px">
        </button>
        <div class="dropdown-menu">
            <a class="dropdown-item" href=""></a>
            <a class="dropdown-item" href="">Action</a>
            <a class="dropdown-item" href="">Another action</a>
        </div>
    <div>
    `;
}

//tranformar texto htlm a formato html y extrayendo el div
const parsehtml = (textHtml) => {
    const html = parse.parseFromString(textHtml, 'text/html').querySelector('div');
    return html;
};

//convirtiendo imagen a base 64
function base64(img) {
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    var dataUrl = canvas.toDataURL();
    return dataUrl;
}

//Events
login.addEventListener('click', (e) => {
    e.preventDefault();
    if (login_email.val != '' && login_password.value != '') {
        const email = login_email.value;
        if (getStorage(email)) {
            const datos = getStorage(email);
            if (datos.password == login_password.value) {
                console.log('Acceso aceptado')
                container_user.appendChild(parsehtml(createAvatar('cristhianprozqwety@gmail.com')));
            } else {
                alert('Acceso denegado(email o password not found)');
                window.location.href = 'index.html'
            }
        } else {
            alert('Usuario no registrado');
            window.location.href = 'index.html'
        }
    } else {
        alert('Cajas vacia/s');
        window.location.href = 'index.html'
    }
    login_email.value = '';
    login_password.value = '';
});


register.addEventListener('click', (e) => {
    e.preventDefault();
    const img = document.querySelector('.image-avatar-user');

    if ((register_confirm_password.value === register_password.value) && register_email.value != '' && register_name.value != '') {
        if (!getStorage(register_email.value)) {
            const email = register_email.value;
            const base64_data = base64(img);
            const datos = {
                name: register_name.value,
                email: register_email.value,
                password: register_password.value,
                avatar: base64_data,
                photos: []
            };
            storeStorage(email, datos);
        } else {
            alert('Usuario ya esta registrado');
            window.location.href = 'index.html'
        }
    } else {
        alert('la contraseña no coincide o falta llenar los casilleros');
        window.location.href = 'index.html'
    }

    register_name.value = '';
    register_email.value = '';
    register_password.value = '';
    register_confirm_password.value = '';
});

const form = document.querySelector('.form');
const image_preview = document.querySelector('.image-preview');

file_image.addEventListener('change', () => {
    image_preview.innerHTML = null;
    //obteniendo la direccion del archivo
    const formData = new FormData(form);
    const image = formData.get('url').path;
    console.log(image);
    if (image) {
        //creando un elemento img
        const img = document.createElement('img');
        img.setAttribute('src', image);
        img.className = 'image-avatar-user'
        img.setAttribute('height', '100px');
        img.setAttribute('width', '100px');
        image_preview.appendChild(img);
    }
});