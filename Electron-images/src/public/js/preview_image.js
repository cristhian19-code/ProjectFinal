const preview_avatar = document.querySelector('.preview-avatar');
const form = document.querySelector('#signup');

$('.avatar').change(function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const val = formData.get('avatar');
    const url = URL.createObjectURL(val);
    preview_avatar.setAttribute('src', url);
});