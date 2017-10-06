$(window).on("load", function(){
  $('.init-load-screen').hide(0);
  setTimeout(function(){
    $('.back').css('filter', 'blur(2px)');
    $('.front').show(0);
  }, 1500);

  setTimeout(function(){
    $('.header').show(0);
  }, 1700);

  setTimeout(function(){
    $('.row').show(0);
  }, 2500);

});
