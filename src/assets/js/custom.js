
/* =========================  Move to Top  =========================== */

(function ($) {
    'use strict';

    jQuery(document).ready(function () {


$(window).on("scroll", function () {
    if ($(this).scrollTop() > 250) {
        $('.scrollup').fadeIn();
    } else {
        $('.scrollup').fadeOut();
    }
});
$('.scrollup').on("click", function () {
    $("html, body").animate({
        scrollTop: 0
    }, 800);
    return false;
});

    });

})(jQuery);