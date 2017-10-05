$(function(){
  $.get("https://pantheon17.in/api/events/getAllEvents", function(data) {
    $('.loading').hide(0);
    for( var i = 0; i < data.length; i++) {
      $('.list-group').append(`
      <div class="list-group-item" style="cursor: pointer" eventId="${ data[i].eventId }">
        <h3 align="center" class="page-header">${ data[i].name }</h3>
        <div class="row" style="text-align: center">
        <div class="col-sm-4">
          <p>Event Id:- ${ data[i].eventId }</p>
        </div>
          <div class="col-sm-4">
            <p>Status:- ${ data[i].status }</p>
          </div>
          <div class="col-sm-4">
            <p>Day ${ data[i].day }, Time - ${ data[i].time }, Venue - ${ data[i].venue }</p>
          </div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="eventClick(${ data[i].eventId })">View or edit</button>
      </div>
      `);
    }
  });
});

function eventClick(id) {
  $.post( "https://pantheon17.in/api/events/getEventById", { id: id })
  .done(function( data ) {
    $('#id').val(id);
    $("#name").val(data.name);
    $("#club").val(data.club);
    $("#teamSize").val(data.teamSize);
    $("#description").val(data.description);
    $("#day").val(data.day);
    $("#time").val(data.time);
    $("#venue").val(data.venue);
    $("#status").val(data.status);
    $("#eventCoordinator1Name").val(data.eventCoordinator1.name);
    $("#eventCoordinator1PhoneNumber").val(data.eventCoordinator1.phoneNumber);
    $("#eventCoordinator2Name").val(data.eventCoordinator2.name);
    $("#eventCoordinator2PhoneNumber").val(data.eventCoordinator2.phoneNumber);
    $('.event-form').css('display', 'block');
    $('.list-group').hide(0);
  });

}
