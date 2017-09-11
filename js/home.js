$(document).ready(function () {

    $('#myCarousel').on('init', function(event, slick, direction){
        $(this).addClass('visible');
    });

    $('.comment-carousel').on('init', function(event, slick, direction){
        $(this).addClass('visible');
    });
    $('#myCarousel').slick({
        dots: true,
        arrows: true
    });
    $('.comment-carousel').slick({
        dots: true,
        arrows: true,
        adaptiveHeight: true
    });

    $('.selection-tabs__toggler').on('change', function () {
        var cur = $(this).val();
        $('#selection-tabs #tabs-nav a[href="#' + cur + '"]').click();
    });


});
