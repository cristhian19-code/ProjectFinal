const container = document.querySelector('.container-fluid');

const viewData = () => {
    return Object.keys(localStorage).map(key => key);
};
const parse = new DOMParser();
// verificando si es un correo los datos de localStorage
function correoValidation() {
    var path = /@/;
    for (var i = 0; i < viewData().length; i++) {
        if (path.test(viewData()[i])) {
            return viewData()[i];
        }
    }
    return false;
}

const viewStorage = () => {
    if (correoValidation()) {
        container.innerHTML = null;
        const data = JSON.parse(localStorage.getItem(correoValidation()));
        $('.btn-group').removeAttr('hidden');
        $('.gallery').removeAttr('hidden');
        $('.save-photos').removeAttr('hidden');
        $('.avatar-user').attr('src', '/uploads/' + data.avatar);
        $('#email').val(data.email);
        $('#user').val(data.name);
        extract_data(data.email);
    } else {
        $('.btn-group').attr('hidden', 'true');
        alert('Aun no esta logueado');
    }
}

viewStorage();

function datos(title, url, description) {
    return `
    <div class="card">
        <img class="card-img-top" src="/uploads/${url}" alt="">
        <div class="card-body">
            <h5 class="card-title text-center">${title}</h5>
            <p class="card-text">${description}</p>
        </div>
    </div>`
}

const template = (title, url, description) => {
    const div = parse.parseFromString(datos(title, url, description), 'text/html').querySelector('.card');
    container.appendChild(div);
}

function extract_data(email) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = async function() {
        if (this.readyState == 4 && this.status == 200) {
            const response = JSON.parse(xhttp.responseText);
            const users = response.user;
            for (var i = 0; i < users.length; i++) {
                if (users[i].email == email) {
                    const images = users[i].images;
                    for (var j = 0; j < images.length; j++) {
                        template(images[j].title, images[j].url, images[j].description)
                    }
                }
            }
        }
    }
    xhttp.open("GET", "/db/user.json", true);
    xhttp.send();
}