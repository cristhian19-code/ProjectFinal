$(document).ready(function() {

    $('#fullpage').fullpage({
        menu: '#menu',
        anchor: ['firstPage', 'secondPage', '3rdPage'],
        continuousHorizontal: true,
        navigation: true,
        slidesNavigation: true,
        slidesNavPosition: 'bottom',
        navigationPosition: 'right',
        parallax: true,
        parallaxKey: 'YWx2YXJvdHJpZ28uY29tXzlNZGNHRnlZV3hzWVhnPTFyRQ==',
        parallaxOptions: {
            type: 'reveal',
            percentage: 62,
            property: 'translate'
        },
        navigationTooltips: ['First page', 'Second page', 'Third and last page']
    });
    fullpage_api.parallax.init();
});
$(function() {
    $('.fp-controlArrow').attr('hidden', 'true');
})