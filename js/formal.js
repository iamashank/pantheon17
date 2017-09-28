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

  setTimeout(function(){
    $('.col-sm-2').removeClass('rollIn');
  }, 4000);

  $('.col-sm-2').tilt({
    maxTilt: 20,
    scale: 1.1,
    speed: 500,
  });

  $('.event').click(function(){
    $('.modal-title').html('<i class="fa fa-spinner fa-pulse fa-fw"></i> Fetching Data From Memory');
    $('.modal-body').html('...');
    $('#myModal').modal('show');
    $.post("https://pantheon17.in/api/events/getEventById", { id: $(this).attr('eventId') })
      .done(function( data ) {
        console.log(data);
        setTimeout(function(){
          $('.modal-title').html(data.name);
          $('.modal-body').html(`
            <p>${data.description}</p>
            <p><span style="color: rgba(52, 152, 219,1.0);">Team Size -</span> ${data.teamSize}<br>
            <span style="color: rgba(52, 152, 219,1.0);">Date and Venue</span> - To Be Announced
            </p>
            <h3 align="center" style="color: rgba(52, 152, 219,1.0);">
            - Event Coordinators -
            </h3>
            <div class="row" style="text-align: center; display: block;">
              <div class="col-sm-6">
                <p>${data.eventCoordinator1.name }<br>
                ${data.eventCoordinator1.phoneNumber }
                </p>
              </div>
              <div class="col-sm-6">
                <p>${data.eventCoordinator2.name }<br>
                ${data.eventCoordinator2.phoneNumber }
                </p>
              </div>
            </div>
            `);
        },300);
      });
    });
});
