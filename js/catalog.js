$(document).ready(function () {

    function switchToggle(elem) {
        if ($(elem).is(":checked")) {
            $("#id_single_size").hide().removeClass('active');
            $("#id_multi_size_1").show().addClass('active');
            $("#id_multi_size_2").show().addClass('active');

        } else {
            $("#id_single_size").show().addClass('active');
            $("#id_multi_size_1").hide().removeClass('active');
            $("#id_multi_size_2").hide().removeClass('active');
        }
    }

    function accordionHeight() {
        if (window.matchMedia("(min-width: 768px)").matches) {
            var height = 0;
            $('.accordion-tabs .section').css('height','');
            $('.accordion-tabs .section').each(function () {
                if (height < $(this)[0].clientHeight) {
                    height = $(this)[0].clientHeight;
                }
            });
            $('.accordion-tabs .section').css('height', height);
        } else {
            $('.accordion-tabs .section').css('height','');
        }
    }

    $(window).on('resize', function () {
        accordionHeight();
    });
    accordionHeight();

    if (window.matchMedia("(max-width: 767px)").matches && $('.is-open').length) {
        $('.is-open').show();
    }
    $('.accordion-tabs').on('click', 'li > a', function (event) {
        event.stopPropagation();
        event.preventDefault();
        if (window.matchMedia("(max-width: 767px)").matches) {
            if (!$(this).hasClass('is-active')) {
                var $this = $(this);
                if ($('.is-open').length) {
                    $('.accordion-tabs .is-open').removeClass('is-open').slideUp(200,
                        function () {
                            var pos = $this.offset().top;
                            $('html, body').animate({scrollTop: pos});
                            $this.next().addClass('is-open').slideDown();
                        });
                } else {
                    var pos = $this.offset().top;
                    $('html, body').animate({scrollTop: pos});
                    $this.next().addClass('is-open').slideDown();
                }

                $('.accordion-tabs .is-active').removeClass('is-active');
                $(this).addClass('is-active');

            } else {
                $(this).removeClass('is-active');
                $(this).siblings('.section').removeClass('is-open').slideUp();
            }
        } else {
            if (!$(this).hasClass('is-active')) {
                $('.accordion-tabs .is-open').removeClass('is-open');
                $(this).next().addClass('is-open');
                $('.accordion-tabs').find('.is-active').removeClass('is-active');
                $(this).addClass('is-active');
            }
        }

    });


    $("#id_multi_size_selector").change(function () {
        switchToggle($(this));
    });


    /* слайдер цен */
    //$('#minCost').val($('#minCost').val().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 '));
    //$('#maxCost').val($('#maxCost').val().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 '));
    var min = +$('#minCost').val().replace(/\D+/g, "");
    var max = +$('#maxCost').val().replace(/\D+/g, "");
    $("#slider").slider({
        min: min,
        max: max,
        values: [min, max],
        range: true,
        step: 1000,
        stop: function (event, ui) {
            $("input#minCost").val($("#slider").slider("values", 0));
            $("input#maxCost").val($("#slider").slider("values", 1));

        },
        slide: function (event, ui) {
            $("input#minCost").val($("#slider").slider("values", 0));
            $("input#maxCost").val($("#slider").slider("values", 1));
        }
    });

    $(".slider__min-val").text(String($("#slider").slider("values", 0)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 '));
    $(".slider__max-val").text(String($("#slider").slider("values", 1)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 '));


    $("input#minCost").change(function () {

        var value1 = $("input#minCost").val();
        var value2 = $("input#maxCost").val();

        if (parseInt(value1) > parseInt(value2)) {
            value1 = value2;
            $("input#minCost").val(value1);
        }
        $("#slider").slider("values", 0, value1);
    });


    $("input#maxCost").change(function () {

        var value1 = $("input#minCost").val();
        var value2 = $("input#maxCost").val();

        if (value2 > max) {
            value2 = max;
            $("input#maxCost").val(max)
        }

        if (parseInt(value1) > parseInt(value2)) {
            value2 = value1;
            $("input#maxCost").val(value2);
        }
        $("#slider").slider("values", 1, value2);
    });


    $('#widget').draggable();
});
