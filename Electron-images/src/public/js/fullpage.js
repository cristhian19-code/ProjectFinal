$(document).ready(function() {
    $('#fullpage').fullpage({
        anchor: ['firstPage', 'secondPage', 'thirdPage'],
        continuousHorizontal: true,
        navigation: true,
        slidesNavigation: true,
        slidesNavPosition: 'bottom',
        navigationPosition: 'right',
        // navigationTooltips: ['First page', 'Second page', 'Third and last page']   texto que se le agrega a os puntos de las secciones parecido a un poppup
    });
    $('.fp-controlArrow').attr('hidden', 'true');
});