$(function(){
  $.get('https://pantheon17.in/api/announcements/getAnnouncements', function(data) {
    for( var i = 0; i < data.length; i++) {
      $('.list-group').append(`
        <h4 align="center">${ data[i].title }</h4>
        <p>${ data[i].message }</p>
        <h6 align="right">${ moment(data[i].date).format("Do MMM, h:mm a") }</h6>
        <hr>
      `);
    }
  });
});
