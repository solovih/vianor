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

    $('.view-toggler').on('click', function () {
        $(this).toggleClass('active');
        var type = $(this).siblings('input').attr('type') == "text" ? "password" : 'text';
        $(this).siblings('input').prop('type', type);
    });

    $('#selection-tabs form').each(function () {
        $(this).find('select').on('change', function () {
            paramSelection($(this).closest('form'));
        });
    });
    function paramSelection(form) {
        form.find('select').each(function () {
            if ($(this).val() != null) {
                $(this).closest('form').find('.btn-black').removeAttr('disabled');
                var $this = $(this).closest('form').find('.btn-black');
                $this.button('loading');
                setTimeout(function () {
                    $this.button('reset');
                }, 5000);
            } else {
                $(this).closest('form').find('.btn-black').attr('disabled', true);
            }
        });
    }
});
