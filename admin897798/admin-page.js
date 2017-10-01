$(function(){
  $.get('https://pantheon17.in/api/announcements/getAnnouncemnts', function(data) {
    for( var i = 0; i < data.length; i++) {
      $('.list-group').append(`
        <h3 align="center">${ data[i].title }</h3>
        <p>${ data[i].message }</p>
        <h5>${ moment(data[i].date).format("Do MMM, h:mm a") }</h5>
      `);
    }
  });
});
