$(document).ready(function() {
    $('#fullpage').fullpage({
        anchor: ['firstPage', 'secondPage', '3rdPage'],
        continuousHorizontal: true,
        navigation: true,
        slidesNavigation: true,
        slidesNavPosition: 'bottom',
        navigationPosition: 'right',
        navigationTooltips: ['First page', 'Second page', 'Third and last page']
    });
    $('.fp-controlArrow').attr('hidden', 'true');
});