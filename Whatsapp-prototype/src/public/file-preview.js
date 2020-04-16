const img_preview = document.querySelector('.img-preview');

$('.avatar').change(function(e) {
    e.preventDefault();
    const formregister = document.querySelector('.form-register');
    const formData = new FormData(formregister);
    const img = formData.get('avatar');
    const url = URL.createObjectURL(img);
    img_preview.removeAttribute('height');
    img_preview.removeAttribute('width');
    if (url != '') {
        img_preview.setAttribute('height', '150px');
        img_preview.setAttribute('width', '200px');
        img_preview.setAttribute('src', url);
    } else {
        img_preview.setAttribute('src', '');
    }
});