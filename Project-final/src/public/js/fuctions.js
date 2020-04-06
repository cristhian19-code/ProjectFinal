const file_image = document.querySelector('.file-image');
const add_icon_User = document.getElementById('collapsibleNavId');
const avatar_preview = document.querySelector('.avatar-preview');

//funcion para convertir a base 64
function base64(img) {
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    var dataUrl = canvas.toDataURL();
    return dataUrl;
}

//previsualizar la imagen
file_image.addEventListener('change', (e) => {
    avatar_preview.innerHTML = null;
    e.preventDefault();
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function() {
        const img = document.createElement('img');
        img.setAttribute('height', '200px');
        img.setAttribute('width', '250px');
        img.src = reader.result;
        avatar_preview.append(img);
    };
});