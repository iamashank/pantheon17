
$(window).on("load", function(){

  $('.init-load-screen').hide(0);
  setTimeout(function(){
    $('.back').css('filter', 'blur(2px)');
    $('.front').show(0);
  }, 1500);

  $.get('https://pantheon17.in/api/announcements/getAnnouncements', function(data) {
    console.log(data);
    for( var i = 0; i < data.length; i++) {
      $('.announcements').append(`
        <h3 align="center">${ data[i].title }</h3>
        <p style="font-size: 120%;">${ data[i].message }</p>
        <h6 align="right" style="font-size: 110%;">${ moment(data[i].date).format("Do MMM, h:mm a") }</h6>
        <hr>
      `);
    }
  });

  $.get('https://pantheon17.in/api/teams/getLeaderboard', function(data) {
    console.log(data);
    for(var i = 0; i < data.length; i++) {
      $('.table').append(`
        <div class="row">
          <div class="col-sm-4" align="center"><h4>${ i }</h4></div>
          <div class="col-sm-4" align="center"><h4>${ data[i].teamName }</h4></div>
          <div class="col-sm-4" align="center"><h4>${ data[i].points }</h4></div>
        </div>
      `);
    }
  });

  setTimeout(function(){
    $('.header').show(0);
  }, 1700);

  setTimeout(function(){
    $('.row').show(0);
  }, 2500);

});
