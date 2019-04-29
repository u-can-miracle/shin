$( document ).ready(function() {
  $('.gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Загрузка #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">Не удалось загрузить #%curr%</a>.',
      titleSrc: function(item) {
        return item.el.attr('title') + '<small>Шинторгсервис</small>';
      }
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
    });
  });

  toggleSpecOffers();
});

function toggleSpecOffers(){
  // add smoth scroll for mobile devices

  $('.feature-item .feature-item-content').on('click', function() {
    const clickedItem = $(this);
    const className = 'opened';
    const itemIndex = clickedItem.parent().index();
    const descriptions = $('.features-descriptions > div');

    if(clickedItem.hasClass(className)){
      clickedItem.removeClass(className);
    } else {
      clickedItem.addClass(className);
    }

    descriptions.eq(itemIndex).slideToggle();
  });
}
