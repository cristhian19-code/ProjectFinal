const container_preview = document.querySelector('.container-preview');

$('#customFile').change(function(e) {
    e.preventDefault();
    container_preview.innerHTML = null;
    const img = document.createElement('img');
    img.setAttribute('height', '200px');
    img.setAttribute('width', '250px');
    const form = document.querySelector('.form');
    const formData = new FormData(form);
    const file = formData.get('avatar');
    if (file.name != "") {
        const url = URL.createObjectURL(file);
        img.setAttribute('src', url);
        container_preview.appendChild(img);
    } else {
        container_preview.innerHTML = null;
    }
});


const viewData = () => {
    return Object.keys(localStorage).map(key => key);
};

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
        const data = JSON.parse(localStorage.getItem(correoValidation()));
        $('.btn-group').removeAttr('hidden');
        $('.gallery').removeAttr('hidden');
        $('.save-photos').removeAttr('hidden');
        $('.avatar-user').attr('src', '/uploads/' + data.avatar);
        $('#email').val(data.email);
        $('#user').val(data.name);
    } else {
        $('.btn-group').attr('hidden', 'true');
        alert('Aun no esta logueado');
    }
}

viewStorage();