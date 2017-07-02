
jQuery(function($){

    $('.js-main-slider').slick({
      arrows: true,
      prevArrow: '.main-banner-slider__prev',
      nextArrow: '.main-banner-slider__next',
      autoplay: true
    });

    $(document).on('click', '.job-activities-catalog__item--with-children > a', function() {
        $(this).parent().toggleClass('active');
    });

});