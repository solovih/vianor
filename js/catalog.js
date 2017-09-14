$(document).ready(function () {

    $('.accordion-tabs').children('li').first().children('a').addClass('is-active').next().addClass('is-open');
    $("#id_single_size").hide();
    $("#id_multi_size_1").show();
    $("#id_multi_size_2").show();
    function switchToggle(elem) {
        if ($(elem).is(":checked")) {
            $("#id_single_size").hide();
            $("#id_multi_size_1").show();
            $("#id_multi_size_2").show();

        } else {
            $("#id_single_size").show();
            $("#id_multi_size_1").hide();
            $("#id_multi_size_2").hide();
        }
    }

    function accordionHeight() {
        if (window.matchMedia("(min-width: 768px)").matches) {
            var height = 0;
            $('.accordion-tabs section').css('height','');
            $('.accordion-tabs section').each(function () {
                if (height < $(this)[0].clientHeight) {
                    height = $(this)[0].clientHeight;
                }
            });
            $('.accordion-tabs section').css('height', height);
        } else {
            $('.accordion-tabs section').css('height','');
        }
    }

    $(window).on('resize', function () {
        accordionHeight();
    });
    accordionHeight();

    switchToggle($("#id_multi_size_selector"));

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
                $(this).siblings('section').removeClass('is-open').slideUp();
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
    $('#minCost').val($('#minCost').val().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 '));
    $('#maxCost').val($('#maxCost').val().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 '));
    var min = +$('#minCost').val().replace(/\D+/g, "");
    var max = +$('#maxCost').val().replace(/\D+/g, "");
    $("#slider").slider({
        min: min,
        max: max,
        values: [min, max],
        range: true,
        step: 1000,
        stop: function (event, ui) {
            $("input#minCost").val(String($("#slider").slider("values", 0)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 '));
            $("input#maxCost").val(String($("#slider").slider("values", 1)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 '));

        },
        slide: function (event, ui) {
            $("input#minCost").val(String($("#slider").slider("values", 0)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 '));
            $("input#maxCost").val(String($("#slider").slider("values", 1)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 '));
        }
    });

    $(".slider__min-val").text(String($("#slider").slider("values", 0)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 '));
    $(".slider__max-val").text(String($("#slider").slider("values", 1)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 '));


    $("input#minCost").change(function () {

        var value1 = $("input#minCost").val().replace(/\D+/g, "");
        var value2 = $("input#maxCost").val().replace(/\D+/g, "");

        if (parseInt(value1) > parseInt(value2)) {
            value1 = value2;
            $("input#minCost").val(value1);
        }
        $("#slider").slider("values", 0, value1);
    });


    $("input#maxCost").change(function () {

        var value1 = $("input#minCost").val().replace(/\D+/g, "");
        var value2 = $("input#maxCost").val().replace(/\D+/g, "");

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


// фильтрация ввода в поля
    $('.form-cost input').keypress(function (event) {
        var key, keyChar;
        if (!event) var event = window.event;

        if (event.keyCode) key = event.keyCode;
        else if (event.which) key = event.which;

        if (key == null || key == 0 || key == 8 || key == 13 || key == 9 || key == 46 || key == 37 || key == 39) return true;
        keyChar = String.fromCharCode(key);

        if (!/\d/.test(keyChar))    return false;

    });
    $('.form-cost input').on('keyup', function (event) {
        format_price(event);
    });
    $('#widget').draggable();

    function clear_value(obj_id, event) {
        var code = (event.charCode) ? event.charCode : event.keyCode;
        if (code != 9 && code != 16) {
            document.getElementById(obj_id).value = '';
        }
    }


    function format_price(e) {
        var target = e.target || e.srcElement;

        var cursorPos = get_cursor_position(target);
        if (cursorPos == -1) {
            cursorPos = 0;
        }
        var deltaPos = 0;

        var lengthBefore = target.value.length;
        target.value = target.value.replace(/\s+/g, '').replace(/\s+$/, '');
        target.value = format_num(target.value);
        if (!deltaPos && (target.value.length - lengthBefore) > 0) {
            deltaPos = target.value.length - lengthBefore;
        }
        if (!deltaPos && target.value[cursorPos + deltaPos] == ' ' && target.value[cursorPos + deltaPos - 1] == ' ') {
            deltaPos += 2;
        }
        set_cursor_position(target, cursorPos + deltaPos);
        return true;
    }


    function get_cursor_position(inputEl) {
        if (document.selection && document.selection.createRange) {
            var range = document.selection.createRange().duplicate();
            if (range.parentElement() == inputEl) {
                range.moveStart('textedit', -1);
                return range.text.length;
            }
        }
        else if (inputEl.selectionEnd) {
            return inputEl.selectionEnd;
        }
        else
            return -1;
    }


    function set_cursor_position(inputEl, position) {
        if (inputEl.setSelectionRange) {
            inputEl.focus();
            inputEl.setSelectionRange(position, position);
        }
        else if (inputEl.createTextRange) {
            var range = inputEl.createTextRange();
            range.collapse(true);
            range.moveEnd('character', position);
            range.moveStart('character', position);
            range.select();
        }
    }


    function format_num(str) {
        var retstr = '';
        var now = 0;
        for (var i = str.length - 1; i >= 0; i--) {
            if (now < 3) {
                now++;
                retstr = str.charAt(i) + retstr;
            } else {
                now = 1;
                retstr = str.charAt(i) + ' ' + retstr;
            }
        }
        return retstr;
    }
});
