<?php
  session_start();
  if((!isset($_SESSION['adminKey'])) || $_SESSION['adminKey']!="8abd5b6492cdad380d53dd2f5b9112b4"){
    header('location: adminPage.php');
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <title>Event Result Announcement | Pantheon 17</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <link rel="stylesheet" type="text/css" href="https://www.pantheon17.in/css/register.css">
  <link rel="stylesheet" href="https://www.pantheon17.in/css/animate.css">
  <link href="https://fonts.googleapis.com/css?family=Asap+Condensed" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=PT+Sans+Narrow" rel="stylesheet">
</head>
<body>

<div class="container-fluid text-center">
    <div class="row">
        <div class="col-md-4" style="text-align:right;vertical-align: middle;"></div>
        <div class="col-md-4" style="text-align:center;"><a href="https://www.pantheon17.in/"><img src="https://www.pantheon17.in/assets/images/logo-final.png" width="150px" height="auto" alt="Pantheon 17 BIT Mesra" style="float:center;"></a></div>
        <div class="col-md-4" style="text-align:center;vertical-align: middle;"> </div>
    </div>
  <div class="row content">
    <div class="col-sm-4">
    </div>
    <div class="col-sm-4">
      <div class="box">
           <form method="post">
            <div class="group"></div>
             <div class="group">
              <input class="inputMaterial" type="text" id="id" data-toggle="tooltip" title="Enter the Event ID whose result needs to be announced" data-placement="bottom">
              <span class="highlight"></span>
              <label id="eventIDLabel">Event ID</label>
            </div>
            <div class="btn btn-primary" style="font-size: 14px;margin-top:10px;padding:3%;color:#FFF;" id="fetchEventInfo" onclick="fetchEventInfo()">Fetch Info &nbsp;<span class="glyphicon glyphicon-arrow-right"></span></div>
            <br><br>
          </form>
          <div id="recordBoxDiv" style="font-size:16px; display: none;">
            <div class="group">
              <select class="inputMaterial" id="w1">
                <option value="">---</option>
              </select>
              <span class="highlight"></span>
              <label>Winner 1</label>
            </div>
            <div class="group">
              <select class="inputMaterial" id="w2">
                <option value="">---</option>
              </select>
              <span class="highlight"></span>
              <label>Winner 2</label>
            </div>
            <div class="group">
              <select class="inputMaterial" id="w3">
                <option value="">---</option>
              </select>
              <span class="highlight"></span>
              <label>Winner 3</label>
            </div>
            <div class="group">
              <input class="inputMaterial" type="number" id="p1" data-toggle="tooltip" title="Points 1" data-placement="bottom" required autocomplete="off" style="width: 50%;">
              <span class="highlight"></span>
              <label>Points 1</label>
            </div>
          
            <div class="group">
              <input class="inputMaterial" type="number" id="p2" data-toggle="tooltip" title="Points 2" data-placement="bottom" required autocomplete="off" style="width: 50%;">
              <span class="highlight"></span>
              <label>Points 2</label>
            </div>
            <div class="group">
              <input class="inputMaterial" type="number" id="p3" data-toggle="tooltip" title="Points 3" data-placement="bottom" required autocomplete="off" style="width: 50%;">
              <span class="highlight"></span>
              <label>Points 3</label>
            </div>
            <div class="btn btn-primary" style="font-size: 14px;margin-top:10px;padding:3%;color:#FFF;" id="updateResult" onclick="updateResult()">Update Result</div>
            <br><br>
          </div>
        </div>

    </div>
    <div class="col-sm-4">
    </div>
  </div>
</div>
<script>
var teams = {};
teams['formalinformal'] = [];
teams['codezilla'] = [];
teams['cyberbrigeton'] = [];
teams['illuminati'] = [];
teams['droidtrooper'] = [];
teams['eureka'] = [];
teams[''] = [];
$.get("https://www.pantheon17.in/api/teams/getAllTeams").done(function(data){
    for(var i=0;i<data.length;i++){
      obj = data[i].teamName;
      teams[data[i].eventName].push(obj);
    }
});
function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
function fetchEventInfo(){
  $("#fetchEventInfo").html("<span class=\"glyphicon glyphicon-refresh glyphicon-refresh-animate\"></span> Fetching..");
  $("#fetchEventInfo").attr("disabled","disabled");
  var id = $('#id').val();
  if(isNaN(id) || id<1 || id>50){
    $("#id").css({"border":"3px solid red"});
    $("#fetchEventInfo").html("Fetch Info");
    $("#fetchEventInfo").removeAttr("disabled");
    return;
  }
  else{
    $("#id").css({"border":""});
  }
  var iddata = {
    'id': id
  }
  $.post("https://www.pantheon17.in/api/events/getEventById",iddata).done(function(data){
      $("#fetchEventInfo").html("Fetch Info");
      $("#fetchEventInfo").removeAttr("disabled");
      if(data.position1!=undefined || data.position2!=undefined || data.position3!=undefined){
        $("#recordBoxDiv").html("<font color='red'>Results for this event is already announced..</font><br><br>");
        $("#fetchEventInfo").hide();
        $("#recordBoxDiv").show();
        return;
      }
      var eventType = 0;
      if(id==1){
        eventType = "illuminati";
      }
      else if(id>=2 && id<=46){
        eventType = "formalinformal";
      }
      else if(id==47){
        eventType = "codezilla";
      }
      else if(id==48){
        eventType = "eureka";
      }
      else if(id==49){
        eventType = "droidtrooper";
      }
      else{
        eventType = "cyberbrigeton";
      }
      for(var i=0;i<teams[eventType].length;i++){
        $('#w1').append($('<option>', {
            value: teams[eventType][i],
            text: teams[eventType][i]
        }));
        $('#w2').append($('<option>', {
            value: teams[eventType][i],
            text: teams[eventType][i]
        }));
        $('#w3').append($('<option>', {
            value: teams[eventType][i],
            text: teams[eventType][i]
        }));
      }
      $("#fetchEventInfo").hide();
      $("#recordBoxDiv").show();
      $("#id").attr("readonly","readonly");
      $("#id").removeAttr("required");
      $("#eventIDLabel").text("");

  });
}
function updateResult(){
  $("#updateResult").html("<span class=\"glyphicon glyphicon-refresh glyphicon-refresh-animate\"></span> Updating..");
  $("#updateResult").attr("disabled","disabled");
  var id = $('#id').val();
  var winner1 = $('#w1').val();
  var winner2 = $('#w2').val();
  var winner3 = $('#w3').val();
  var points1 = $('#p1').val();
  var points2 = $('#p2').val();
  var points3 = $('#p3').val();
  if(winner1=="" || winner2=="" || winner3=="" || winner1==winner2 || winner2==winner3 || winner3==winner1){
    $("#w1").css({"border":"3px solid red"});
    $("#w2").css({"border":"3px solid red"});
    $("#w3").css({"border":"3px solid red"});
    $("#updateResult").html("Update Result");
    $("#updateResult").removeAttr("disabled");
    return;
  }
  else{
    $("#w1").css({"border":""});
    $("#w2").css({"border":""});
    $("#w3").css({"border":""});
  }
  if(points1=="" || points2=="" || points3==""){
    $("#p1").css({"border":"3px solid red"});
    $("#p2").css({"border":"3px solid red"});
    $("#p3").css({"border":"3px solid red"});
    $("#updateResult").html("Update Result");
    $("#updateResult").removeAttr("disabled");
    return;
  }
  else{
    $("#p1").css({"border":""});
    $("#p2").css({"border":""});
    $("#p3").css({"border":""});
  }
  if(points1<points2 || points2<points3){
    $("#p1").css({"border":"3px solid red"});
    $("#p2").css({"border":"3px solid red"});
    $("#p3").css({"border":"3px solid red"});
    $("#updateResult").html("Update Result");
    $("#updateResult").removeAttr("disabled");
    return;
  }
  else{
    $("#p1").css({"border":""});
    $("#p2").css({"border":""});
    $("#p3").css({"border":""});
  }
  var iddata = {
    'eventId': id,
    'winner1': winner1,
    'points1': points1,
    'winner2': winner2,
    'points2': points2,
    'winner3': winner3,
    'points3': points3
  }
  $.post("https://www.pantheon17.in/api/events/updateResults",iddata).done(function(data){
      if(data.success){
        alert("Announcement Successful");
        location.href("index.html");
      }
  });
}
</script>
</body>
</html>
