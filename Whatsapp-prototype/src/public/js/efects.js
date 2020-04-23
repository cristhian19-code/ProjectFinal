$(document).ready(function(){
    $('.cont-friend').hover(function (e) {
        $('.btn-friend').animate({
            left: '30',
            opacity:'1'
        },1100);
        $('.avatar-friend').animate({left: '0'},1000);
    }, function () {
        $('.btn-friend').animate({
            left: '176',
            opacity:'0.4'
        },1000);
        $('.avatar-friend').animate({left: '85'},1000);
    }
    );
});