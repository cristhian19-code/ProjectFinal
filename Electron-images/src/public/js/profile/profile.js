$(function() {
    $('#My-profile').click(function(e) {
        e.preventDefault();
        $('.my-profile').removeAttr('hidden');
        $('.edit-profile').attr('hidden', 'true');
    });
    $('#Edit-profile').click(function(e) {
        e.preventDefault();
        $('.edit-profile').removeAttr('hidden');
        $('.my-profile').attr('hidden', 'true');
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

    $('.btn-confirm').click(function(e) {
        e.preventDefault();
        swal('Esta seguro de editar ?', {
            icon: 'warning',
            buttons: ['Cancelar', 'Actualizar'],
            closeOnEsc: false,
            closeOnClickOutside: false,
            dangerMode: true
        }).then(async(result) => {
            if (result) {
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
    });
    $('#To-return').click(function(e) {
        e.preventDefault()
        location.href = 'index.html'
    })
});