$(window).load(function() {

  $('.init-load-screen').hide(0);
  $('#title').show(0);

  $('html').mousemove(function (e) {
      console.log(e.pageX);
      parallax1(e, document.getElementById('stars2'), 4);
      parallax2(e, document.getElementById('stars3'), 5);
  });


  $('.know-more-btn').click(function(){
    $('#title').addClass('animated zoomOut');

    setTimeout(function() {
      $('.events-div').show(0);
      $('#title').hide(0);
    }, 600);

    setTimeout(function() {
      $('.informal-div').show(0);
    },600);

    setTimeout(function() {
      $('.formal-div').show(0);
    },800);

    setTimeout(function() {
      $('.flagship-div').show(0);
    },900);

    setTimeout(function() {
      $('.fugiya-div').show(0);
    },1300);

    setTimeout(function() {
      $('.guestlecture-div').show(0);
    },1500);

    setTimeout(function(){
      $('.flagship-div').removeClass('zoomIn');
    }, 2200);

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
