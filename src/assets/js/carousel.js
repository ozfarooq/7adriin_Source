

//adriin var
var adriin = {};

(function ($) {
    "use strict";


    /*************************
      Predefined Variables
*************************/
    var $window = $(window),
         $document = $(document);

    //Check if function exists
    $.fn.exists = function () {
        return this.length > 0;
    };

    /*************************
          Owl carousel 
    *************************/
    adriin.carousel = function () {
        if ($(".owl-carousel-1").exists()) {
            $('.owl-carousel-1').owlCarousel({
                items: 7,
                responsive: {
                    0: {
                        items: 2
                    },
                    600: {
                        items: 4
                    },
                    1000: {
                        items: 7
                    }
                },
                margin: 15,
                loop: true,
                autoplay: true,
                autoplayTimeout: 2000,
                smartSpeed: 1000,
                autoplayHoverPause: true,
                dots: false,
                
               
            });
        }

        if ($(".owl-carousel-2").exists()) {
            $('.owl-carousel-2').owlCarousel({
                items: 3,
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 2
                    },
                    1000: {
                        items: 3
                    }
                },
                margin: 15,
                loop: true,
                autoplay: true,
                autoplayTimeout: 2000,
                smartSpeed: 1000,
                autoplayHoverPause: true,
                dots: false,
                nav: true
            });
        }
        if ($(".owl-carousel-3").exists()) {
            $('.owl-carousel-3').owlCarousel({
                items: 1,
                margin: 30,
                loop: true,
                autoplay: false,
                autoplayTimeout: 1500,
                smartSpeed: 1000,
                transitionStyle: true,
                autoplayHoverPause: true,
                dots: true,
                nav: false
            });
        }
        if ($(".owl-carousel-4").exists()) {
            $('.owl-carousel-4').owlCarousel({
                items: 3,
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 2
                    },
                    1000: {
                        items: 3
                    }
                },
                margin: 15,
                loop: true,
                autoplay: true,
                autoplayTimeout: 2000,
                smartSpeed: 1000,
                autoplayHoverPause: true,
                dots: false,
                nav: true,
                navText: [
                       "<i class='fa fa-angle-left fa-2x'></i>",
                       "<i class='fa fa-angle-right fa-2x'></i>"
                ]
            });
        }
        if ($(".owl-carousel-5").exists()) {
            $('.owl-carousel-5').owlCarousel({
                items: 1,
                margin: 0,
                loop: true,
                autoplay: true,
                autoplayTimeout: 1500,
                smartSpeed: 1000,
                autoplayHoverPause: true,
                dots: false,
                nav: true,
                navText: [
                       "<i class='fa fa-angle-left fa-2x'></i>",
                       "<i class='fa fa-angle-right fa-2x'></i>"
                ]
            });
        }
        if ($(".owl-carousel-6").exists()) {
            $('.owl-carousel-6').owlCarousel({
                items: 5,
                responsive: {
                    0: {
                        items: 1
                    },
                    400: {
                        items: 2
                    },
                    600: {
                        items: 3
                    },
                    1000: {
                        items: 5
                    }
                },
                margin: 0,
                loop: true,
                autoplay: true,
                autoplayTimeout: 2000,
                smartSpeed: 1000,
                autoplayHoverPause: true,
                dots: false,
                nav: true
            });
        }
    }



    /****************************************************
         adriin Window load and functions
    ****************************************************/


    //Document ready functions
    $document.ready(function () {
        adriin.carousel();
    });

})(jQuery);