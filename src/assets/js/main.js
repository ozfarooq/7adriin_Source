/*------------------------------------------------------------------------
MAIN NAV MENU
MENU SCROLLING
SLIDE NAV - MAIN NAV MENU
SPACE TOP ON MOBILE

/**/
$(document).ready(function () {








    /* --------------------------------------------------------------------- */
    /* TEXT ON A CIRCLE
    /* --------------------------------------------------------------------- */
    (function ($) {
        if (!$(".gr-text-circle").length) return;

        $('.gr-text-circle').each(function () {
            var letter = $(this).find("li");
            var degree = 0;

            letter.each(function () {
                $(this).css("transform", "translate(-50%, 0) rotate(" + degree + "deg)");
                degree += 7;
            });
        });
    })(jQuery);



    /* --------------------------------------------------------------------- */
    /* APPEAR
    /* --------------------------------------------------------------------- */
    (function ($) {
        if (!$(".gr-animated").length) return;

        $(".gr-animated").appear();

        $(document.body).on("appear", ".gr-animated", function () {
            $(this).addClass("go");
        });

        $(document.body).on("disappear", ".gr-animated", function () {
            $(this).removeClass("go");
        });
    })(jQuery);



    /* --------------------------------------------------------------------- */
    /* COUNTER
    /* --------------------------------------------------------------------- */
    (function ($) {
        if (!$(".gr-number-counter").length) return;

        $(".gr-number-counter").appear(); // require jquery-appear

        $(document.body).on("appear", ".gr-number-counter", function () {
            var counter = $(this);

            if (!counter.hasClass("count-complete")) {
                counter.countTo({
                    speed: 1500,
                    refreshInterval: 100,
                    onComplete: function () {
                        counter.addClass("count-complete");
                    }
                });
            }
        });

        $(document.body).on("disappear", ".gr-number-counter", function () {
            $(this).removeClass("count-complete");
        });
    })(jQuery);


   

});
