
<!DOCTYPE html>
<html class="no-js">
  <head
    <link rel="icon" href="favicon.ico" type="image/icon" sizes="16x16">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>CodeZilla Prelims | Pantheon</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="all,follow">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Pacifico">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,700">
    <link rel="stylesheet" href="style.css" id="theme-stylesheet">
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  </head>
  <body>
    <div style="background-image: url('https://www.pantheon17.in/assets/images/codezilla-cover1.jpg')" class="main"> 
      <div class="overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <h1 class="cursive" style="font-family: Arial">CodeZilla Prelims</h1>
          </div>
        </div>
        <!-- countdown-->
        <div id="countdown" class="countdown">
          <div class="row">
            <div class="countdown-item col-sm-3 col-xs-6">
              <div id="countdown-days" class="countdown-number">&nbsp;</div>
              <div class="countdown-label">DAYS</div>
            </div>
            <div class="countdown-item col-sm-3 col-xs-6">
              <div id="countdown-hours" class="countdown-number">&nbsp;</div>
              <div class="countdown-label">HOURS</div>
            </div>
            <div class="countdown-item col-sm-3 col-xs-6">
              <div id="countdown-minutes" class="countdown-number">&nbsp;</div>
              <div class="countdown-label">MINUTES</div>
            </div>
            <div class="countdown-item col-sm-3 col-xs-6">
              <div id="countdown-seconds" class="countdown-number">&nbsp;</div>
              <div class="countdown-label">SECONDS</div>
            </div>
          </div>
        </div>
        <!-- /.countdown-->
        <div class="mailing-list">
          <h3 class="mailing-list-heading"></h3>
          <a href="codezilla"><button class="btn btn-light"> Register Now </button></a>
        </div>
      </div>
      <div class="footer">
        <div class="container">
          <div class="row">
              <p style="text-align: center;"><a href="https://www.pantheon17.in/">Developed by Pantheon Web Team, BIT Mesra</a></p>
          </div>
        </div>
      </div>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="javascripts/vendor/jquery-1.11.0.min.js"><\/script>')</script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
    <script src="jquery.cookie.js"></script>
    <script src="jquery.countdown.min.js"></script>
    <script>
    if ($.cookie("theme_csspath")) {
    $('link#theme-stylesheet').attr("href", $.cookie("theme_csspath"));
}

config = {
    countdown: {
        year: 2017,
        month: 10,
        day: 7,
        hour: 18,
        minute: 00,
        second: 00
    }
}

$(function () {

    countdown();
    utils();
    demo();

});
function demo() {

    if ($.cookie("theme_csspath")) {
	$('link#theme-stylesheet').attr("href", $.cookie("theme_csspath"));
    }

    $("#colour").change(function () {

	if ($(this).val() !== '') {

	    var theme_csspath = 'css/style.' + $(this).val() + '.css';

	    $('link#theme-stylesheet').attr("href", theme_csspath);

	    $.cookie("theme_csspath", theme_csspath, {expires: 365, path: '/'});
	}

	return false;
    });
}
    </script>
  </body>
</html>
