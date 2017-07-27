
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


    // call phone button animation
    var callMeButton = $('.get-callback-call__button');
    callMeButton.addClass('right-deg-transform');

    // callback button
    setInterval(function() {
      callMeButton.toggleClass('right-deg-transform');
      callMeButton.toggleClass('left-deg-transform');
    }, 1000);

    //animation
    var blockPos = document.getElementsByClassName('our-advantages-of-work')[0].getBoundingClientRect().top;
    var startAnimate = function() {
      $('.block-images-list__list-item').each(function (k, el) {
        var $el = $(el);
        if($el.hasClass('animate-from-left')) {
          $el.addClass('come-inner-from-left');
        } else if($el.hasClass('animate-from-right')) {
          $el.addClass('come-inner-from-right');
        } else if($el.hasClass('animate-from-top')) {
          $el.addClass('come-inner-from-top');
        } else if($el.hasClass('animate-from-bottom')) {
          $el.addClass('come-inner-from-bottom');
        }
      });
    };

    window.onscroll = function() {
      console.log(window.pageYOffset, blockPos);

      if(window.pageYOffset >= blockPos) {
        startAnimate();
      }
    };

});