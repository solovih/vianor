$(document).ready(function () {

    $('.navbar-toggle').on('click', function () {
        $('#page').toggleClass('opened');
    });

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
    $('#id_popup_login_phone').mask('+7 000 000 00 00');
    $('#id_popup_login_phone_1').mask('+7 000 000 00 00');
    $('.shop-tabs__nav li:not(:first)').on('click', function () {
        $('.shop-tabs__nav').addClass('translate');
    });
    $('.shop-tabs__nav li:first').on('click', function () {
        $('.shop-tabs__nav').removeClass('translate');
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



    $('.js_season_btns .main-param input[type="checkbox"]').on('change', function () {
        changeSeason();
    });
    changeSeason();
    function changeSeason() {
        if($('#season_winter').prop('checked')) {
            $('.add-param').addClass('visible');
        } else {
            $('.add-param').removeClass('visible');
        }
    }
    $('[data-toggle="tooltip"]').tooltip();
    if($('body').attr('data-location') == 'none') {
        $('#cityModalSmall').modal('show');
    }

    var scrollPos = 0;

    $('.modal')
        .on('show.bs.modal', function (){
            scrollPos = $('body').scrollTop();
            $('body').css({
                overflow: 'hidden',
                position: 'fixed',
                top : -scrollPos
            });
        })
        .on('hide.bs.modal', function (){
            $('body').css({
                overflow: '',
                position: '',
                top: ''
            }).scrollTop(scrollPos);
        });

    var catalog_item_1 = $('.catalog-nav > li:eq(4)');
    var catalog_item_2 = $('.catalog-nav > li:eq(5)');
    function catalogNav_replace() {
        if (window.matchMedia("(min-width: 768px) and (max-width: 1024px)").matches) {
            $('.catalog-nav .last .dropdown-menu').prepend($(catalog_item_2));
            $('.catalog-nav .last .dropdown-menu').prepend($(catalog_item_1));
        } else if (window.matchMedia("(min-width: 1025px) and (max-width: 1199px)").matches) {
            $('.catalog-nav .last .dropdown-menu').prepend($(catalog_item_1));
            $(catalog_item_2).insertBefore($('.catalog-nav .last'));
        } else if (window.matchMedia("(min-width: 1200px)").matches) {
            $(catalog_item_2).insertBefore($('.catalog-nav .last'));
            $(catalog_item_2).insertBefore($('.catalog-nav .last'));
        }
    }
    catalogNav_replace();
    $(window).on('resize', function () {
        catalogNav_replace();
        var footerHeight = $('footer').outerHeight(true);
        $('#container > .content').css('min-height', 'calc(100vh - '+footerHeight+'px)');
    });
});

$(window).on('load', function(){
    setTimeout(function(){
        var footerHeight = $('footer').outerHeight(true);
        $('#container > .content').css('min-height', 'calc(100vh - '+footerHeight+'px)');
    },1);

});