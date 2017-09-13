var loadArray = [
  "Running Power-ON Self test...",
  "Scanning devices..",
  "Found Trionium Octacore Processor..",
  "Clocking speed - 4.65 GHz..",
  "Found 65536MB DRR3..",
  "Initializing ROM..",
  "Searching for OS..",
  "Found Pantheon 17.0 BS..",
  "Loading System Image..",
  "Loading Kernel..",
  "Loading Intelligent System..",
  "Scannig User Profiles..",
  "Generating UI..",
  "Complete...."
];

$(function() {

  initCanvas();
  var curr_panel = ".home";

  $(".main-heading").css('opacity', '0');

  setTimeout(function() {
    $(".main-heading").addClass('animated fadeInUp');
  }, 3000);

  addLoadText(0, 225);

  setTimeout(function() {
    $(".loading-stuff").hide(500);
  }, 3500);

  setTimeout(function() {
    $(".home").addClass('animated fadeInUp');
    $(".nav").addClass('animated fadeIn');
    $(".nav2").addClass('animated fadeIn');
  }, 4000);

  $('.nav__link').click(function() {
    setTimeout(function() {
        $(curr_panel).scrollTop(0);
    }, 1000);
    $(curr_panel).hide(500);
    if ($(curr_panel).attr('background') !== $($(this).attr('panel-class')).attr('background')) {
      $($(curr_panel).attr('background')).fadeOut(500);
    }
    $current_link = $(this);
    setTimeout(function() {
      if ($current_link.attr('panel-class') === '.home') {
        $($current_link.attr('panel-class')).show(0);
      } else {
          $($current_link.attr('panel-class')).show(0);
      }
      $($($current_link.attr('panel-class')).attr('background')).fadeIn(500);
      if ($(curr_panel).attr('background') !== $($current_link.attr('panel-class')).attr('background')) {
        particlesJS.load('particle-div', 'assets/particles.json', function() {
           console.log('callback - particles.js config loaded');
        });
      }
      curr_panel = $current_link.attr('panel-class');
    }, 700);
  });
});

function addLoadText(i, interval) {
  setTimeout(function() {
    $('.loading-text').append(`<p><span class='loadPrefix'>#~> </span><font face='courier'>${ loadArray[i] }</font></p>`);
    $('.loading-text').scrollTop($(".loading-text")[0].scrollHeight);
    if (i+1 < loadArray.length) {
      addLoadText(i+1, interval);
    }
  }, interval);
}

var canvasInterval;


function initCanvas() {

  $("#DateCountdown").TimeCircles({
    circle_bg_color: "#2c3e50",
    time: {
       Days: { color: "#2980b9" },
       Hours: { color: "#2980b9" },
       Minutes: { color: "#2980b9" },
       Seconds: { color: "#2980b9" }
   },
   number_size: 0.20,
   bg_width: 0.5,
   fg_width: 0.05,

  });


  clearInterval(canvasInterval);
  var c = document.getElementById("canvas-01");
  var ctx = c.getContext("2d");
  c.height = window.innerHeight;
  c.width = window.innerWidth;

  var binaries = "10";

  binaries = binaries.split("");

  var font_size = 16;
  var columns = c.width/font_size;

  var drops = [];


  for(var x = 0; x < columns; x++)
  	drops[x] = 1;

  function draw()
  {
  	ctx.fillStyle = "rgba(44, 62, 80, 0.1)";
  	ctx.fillRect(0, 0, c.width, c.height);

  	ctx.fillStyle = "rgb(115, 162, 239)";
  	ctx.font = font_size + "px arial";
  	for(var i = 0; i < drops.length; i++)
  	{
  		var text = binaries[Math.floor(Math.random()*binaries.length)];
  		ctx.fillText(text, i*font_size, drops[i]*font_size);
  		if(drops[i]*font_size > c.height && Math.random() > 0.975)
  			drops[i] = 0;
  		drops[i]++;
  	}
  }
  canvasInterval = setInterval(draw, 75);

}
