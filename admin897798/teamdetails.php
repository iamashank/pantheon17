<?php
  session_start();
  if((!isset($_SESSION['adminKey'])) || $_SESSION['adminKey']!="8abd5b6492cdad380d53dd2f5b9112b4"){
    header('location: index.php');
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Team Details | Pantheon 17</title>
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
  <div class="row content" id="adminApplicantsForm">
    <div class="col-sm-2">
    </div>
    <div class="col-sm-8">
      <div class="box">
           <form method="post">
            <div class="group"></div>
            <div class="group"  style="text-align: center;">      
              <select class="inputMaterial" id="eventName" style="width: 30%;">
                <option value="">Select Event</option>
                <option value="formalinformal">Formal/Informal</option>
                <option value="illuminati">Illuminati</option>
                <option value="droidtrooper">Droid Trooper</option>
                <option value="codezilla">CodeZilla</option>
                <option value="cyberbrigeton">CyberBridgeton</option>
                 <option value="eureka">Eureka</option>
              </select>
              <span class="highlight"></span>
              <label>Select events to view teams</label>
            </div>
             <div class="group">
              <input class="inputMaterial" type="text" id="teamName" data-toggle="tooltip" title="Enter the Team Name" data-placement="bottom" required  style="width: 30%;">
              <span class="highlight"></span>
              <label>Team Name</label>
            </div>
            <div class="btn btn-primary" style="font-size: 14px;margin-top:10px;padding:1%;color:#FFF;" id="showRecords" onclick="showRecords()">View Records &nbsp;<span class="glyphicon glyphicon-arrow-right"></span></div>
            <br><br>
          </form>
          <div id="recordBoxDiv" style="color: #FFF; font-size:16px;">

          </div>
        </div>

    </div>
    <div class="col-sm-2">
    </div>
  </div>
</div>
<script>
var name = getUrlVars()["name"];
var event = getUrlVars()["event"];
if(name!=undefined && event!=undefined){
  document.getElementById('teamName').value = name;
  document.getElementById('eventName').value = event;
  showRecords();
}
function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
function showRecords(){
  var eventName = $('#eventName').val();
  var teamName = $('#teamName').val();
  if(eventName==""){
    $("#eventName").css({"border":"3px solid red"});
    $("#recordBoxDiv").html("");
    return;
  }
  else{
    $("#eventName").css({"border":""});
  }
  if(teamName==""){
    $("#teamName").css({"border":"3px solid red"});
    $("#recordBoxDiv").html("");
    return;
  }
  else{
    $("#teamName").css({"border":""});
  }
  $("#showRecords").html("<span class=\"glyphicon glyphicon-refresh glyphicon-refresh-animate\"></span> Fetching..");
  $("#showRecords").attr("disabled","disabled");
  var iddata = {
    'eventName': eventName,
    'teamName': teamName
  }
  $.post("https://www.pantheon17.in/api/applicants/getApplicantsByTeam",iddata).done(function(data){
      $("#showRecords").html("Show Records");
      $("#showRecords").removeAttr("disabled");
      console.log(data);
      if(data.success){
        text = "<table class='table table-responsive'><thead><tr style='margin:0px auto;color: #fff789;'><th style='text-align: center;'>Name</th><th style='text-align: center;'>Email</th><th style='text-align: center;'>Pantheon ID</th></tr></thead><tbody>";
        for(var i=0;i<data.members.length;i++){
          text += "<tr><td>"+toTitleCase(data.members[i].name)+"</td><td>"+data.members[i].email.toLowerCase()+"</td><td><a href='applicant.php?id="+data.members[i].id+"' style='color: #FFF;' target='new'>"+data.members[i].id+"</a></td></tr>";
        }
        text += "</tbody></table>";
        $("#recordBoxDiv").html(text);
        $("#teamName").css({"border":""});
      }
      else{
        $("#teamName").css({"border":"3px solid red"});
        $("#recordBoxDiv").html("");
      }
  });
}
function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
  });
  return vars;
}
</script>
</body>
</html>
