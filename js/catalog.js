$(document).ready(function () {

    $('.accordion-tabs').children('li').first().children('a').addClass('is-active').next().addClass('is-open').show();
    $('.accordion-tabs').on('click', 'li > a', function(event) {
        if (!$(this).hasClass('is-active')) {
            event.preventDefault();
            $('.accordion-tabs .is-open').removeClass('is-open').hide();
            $(this).next().toggleClass('is-open').toggle();
            $('.accordion-tabs').find('.is-active').removeClass('is-active');
            $(this).addClass('is-active');
        } else {
            event.preventDefault();
        }
    });

    $("#id_multi_size_selector").change(function () {

        if ($(this).is(":checked")) {
            $("#id_single_size").hide();
            $("#id_multi_size_1").show();
            $("#id_multi_size_2").show();

        } else {
            $("#id_single_size").show();
            $("#id_multi_size_1").hide();
            $("#id_multi_size_2").hide();
        }
    });
});
