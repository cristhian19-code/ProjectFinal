$(document).ready(function() {
    $(window).scroll(function() {
        //obteniendo la posicion verticar del scroll
        var barra = $(window).scrollTop();

        //haciendo que el movimiento de la imagen se redusca respoecto a del scroll
        var position = barra * 0.1;
        $('body').css({
            'backgroundPosition': `0 -${position}px`
        });
    });
});