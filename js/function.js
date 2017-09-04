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

    var slideout = new Slideout({
        'panel': document.getElementById('panel'),
        'menu': document.getElementById('menu'),
        'padding': 260,
        'touch': false,
        'tolerance': 70
    });
    document.querySelector('.navbar-toggle').addEventListener('click', function() {
        slideout.toggle();
    });
    function close(eve) {
        eve.preventDefault();
        slideout.close();
    }

    slideout
        .on('beforeopen', function() {
            this.panel.classList.add('panel-open');
        })
        .on('open', function() {
            this.panel.addEventListener('click', close);
        })
        .on('beforeclose', function() {
            this.panel.classList.remove('panel-open');
            this.panel.removeEventListener('click', close);
        });
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
});