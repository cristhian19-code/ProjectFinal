const form = document.querySelector('.form');
var range;
$('.btn-send').click(function() {
    const formData = new FormData(form);
    const email = formData.get('email');
    console.log(email);
});

$('.form-control-range').change(function(e) {
    e.preventDefault();
});