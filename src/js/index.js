
jQuery(function($){

    // Main banner
    $('.js-main-slider').slick({
      arrows: true,
      prevArrow: '.main-banner-slider__prev',
      nextArrow: '.main-banner-slider__next',
      autoplay: true
    });

    // small galery slider  
    $('.small-gallery__current-slide').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplaySpeed: 2000,
      asNavFor: '.small-gallery__slider'
    });
    // small galery slider navigetion
    $('.small-gallery__slider').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      //autoplay: true,
      autoplaySpeed: 2000,
      asNavFor: '.small-gallery__current-slide',
      prevArrow: '.small-gallery__slide__prev',
      nextArrow: '.small-gallery__slide__next',
      centerMode: true,
      focusOnSelect: true
    });
    
    // left-menu
    $(document).on('click', '.job-activities-catalog__item--with-children > a', function() {
        $(this).parent().toggleClass('active');
    });

});