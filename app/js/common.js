$(function() {

  // Carousel
  $('.carousel').owlCarousel({
    loop: true,
    items: 2,
    nav: true,
    margin: 10,
    smartSpeed: 700,
    navText: ['',''],
    responsive: {
      0: {
        items: 2
      },
    },
  });

  // maskedinput
  $('[name=tel]').inputmask({
    mask: '+7 (999) 999-99-99',
    showMaskOnHover: true,
    showMaskOnFocus: true,
  });
  
  // img not drag
  $("img, a").on("dragstart", function(event) { event.preventDefault(); });

});

$(window).on('load', function() {

  window.onresize = function() {
    onResize();
  };

  function onResize() {
    $('.card').equalHeights();
  }onResize();

});

$(document).ready(function() {
  /*
   * Эта функция отправляет заполненную форму PHP-скрипту mail.php
   * mail.php отправит заявку на нужную почту
   *
   * Так же тут есть валидация обязательного заполнения формы.
   * Обязательные поля должны иметь атрибут required
   * Если заполнены не все обязательные поля, то форма не отправится,
   * а незаполненные обязательные поля получат класс .error (что бы
   * можно было их специально стилизовать в CSS).
   * Если браузер не поддерживает HTML5 валидацию, то сработает наша
   */
  $("form").submit(function() { //Change
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php", //Change
      data: th.serialize()
    }).done(function() {
      $(th).find('.success').addClass('active').css('display', 'flex').hide().fadeIn();
      setTimeout(function() {
        $(th).find('.success').removeClass('active').fadeOut();
        th.trigger("reset");
        $.fancybox.close();
      }, 2000);
    });
    return false;
  });

  /*
   * Эта функция определяет с какого поисковика пришел человек
   * Результаты подставляются в значения атрибута value для
   * всех input[name="search"] и input[name="referrer"] соответственно
   */
  function referrer() {
    var srch = [
      [/^https:\/\/(?:\w+\.)?google\.[a-z]+/, /q=([^&]+)/],
      [/^http:\/\/(?:\w+\.)?yahoo\.[a-z]+/, /p=([^&]+)/],
      [/^http:\/\/(?:\w+\.)?yandex\.[a-z]+/, /text=([^&]+)/],
      [/^http:\/\/(?:\w+\.)?rambler\.[a-z]+/, /query=([^&]+)/]
    ]
    
    var tem;
    for (var key in srch) {
      tem = srch[key];
      if (document.referrer.match(tem[0])){
        var ref = document.referrer.match(tem[1]);
        return decodeURIComponent(ref.length ? ref[1] : 'Пришли по ссылке. Или через неизвестный поисковик.');
      }
    }
    return 'Пришли не с поисковика';
  }
  $('input[name="search"]').val(referrer());
  $('input[name="referrer"]').val(document.referrer ? document.referrer : 'Пришли сразу на сайт');
});
