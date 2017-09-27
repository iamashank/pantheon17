$(function(){
  $('html').mousemove(function (e) {
      console.log(e.pageX);
      parallax1(e, document.getElementById('stars2'), 4);
      parallax2(e, document.getElementById('stars3'), 5);

  });

  $('.event').tilt({
    maxTilt: 20,
    scale: 1.1,
    speed: 500,
  });

  $('.know-more-btn').click(function(){

    $('#title').addClass('animated zoomOut');

    setTimeout(function(){
        $('.events-div').css('display', 'block');
    }, 500);

    setTimeout(function(){
      $('.animateUp').addClass('animated fadeInUp').css('opacity', '1');
    }, 1600);

    setTimeout(function(){
      $('.animateLeft').addClass('animated1 slideInRight').css('opacity', '1');
    }, 800);

    setTimeout(function(){
      $('.animateRight').addClass('animated1 slideInLeft').css('opacity', '1');
    }, 800);

    setTimeout(function(){
      $('.animateUp').removeClass('fadeInUp');
      $('.animateLeft').removeClass('slideInRight');
      $('.animateRight').removeClass('slideInLeft');
    },2500);

  });
});

function parallax1(e, target, layer) {
  var layer_coeff = 10 / layer;
  var x = ($(window).width() - target.offsetWidth) / 2000 - (e.pageX  - ($(window).width() / 2000)) / layer_coeff;
  var y = ($(window).height() - target.offsetHeight) / 2000 - (e.pageY  - ($(window).height() / 2000)) / layer_coeff;
  $(target).offset({ top: y ,left : x });
}

function parallax2(e, target, layer) {
  var layer_coeff = 10 / layer;
  var x = ($(window).width() - target.offsetWidth) / 2000 - (e.pageX - ($(window).width() / 2000)) / layer_coeff;
  var y = ($(window).height() - target.offsetHeight) / 2000 - (e.pageY - ($(window).height() / 2000)) / layer_coeff;
  $(target).offset({ top: y ,left : x });
}

function parallax3(e, target, layer) {
  var layer_coeff = 10 / layer;
  var x = ($(window).width() - target.offsetWidth) / 2000 - (e.pageX - ($(window).width() / 2000)) / layer_coeff;
  var y = ($(window).height() - target.offsetHeight) / 2000 - (e.pageY - ($(window).height() / 2000)) / layer_coeff;
  $(target).offset({ top: y ,left : x });
}
