<?php
  session_start();
  if((!isset($_SESSION['adminKey'])) || $_SESSION['adminKey']!="8abd5b6492cdad380d53dd2f5b9112b4"){
    header('location: adminPage.php');
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <title>Payment Update | Pantheon 17</title>
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
              <input class="inputMaterial" type="text" id="id" data-toggle="tooltip" title="Enter the Pantheon ID" data-placement="bottom">
              <span class="highlight"></span>
              <label>Pantheon ID</label>
            </div>
            <div class="group"></div>
             <div class="group">
              <input type="checkbox" class="inputMaterial" value="1" id="day1">
              <span class="highlight"></span>
              <label>Day 1</label>
            </div>
            <div class="group"></div>
             <div class="group">
              <input type="checkbox" class="inputMaterial" value="2" id="day2">
              <span class="highlight"></span>
              <label>Day 2</label>
            </div>
            <div class="group"></div>
             <div class="group">
              <input type="checkbox" class="inputMaterial" value="3" id="day3">
              <span class="highlight"></span>
              <label>Day 3</label>
            </div>
            
            <div class="btn btn-primary" style="font-size: 14px;margin-top:10px;padding:3%;color:#FFF;" id="updatePayment" onclick="updatePayment()">Update Payment</div>
          <br><br>  
        </form>
          <div id="recordBoxDiv" style="font-size:16px; display: none;">
            
          </div>
        </div>

    </div>
    <div class="col-sm-4">
    </div>
  </div>
</div>
<script>
function updatePayment(){
  $("#updatePayment").html("<span class=\"glyphicon glyphicon-refresh glyphicon-refresh-animate\"></span> Updating..");
  $("#updatePayment").attr("disabled","disabled");
  var id = $('#id').val();
  if(id==""){
    $("#id").css({"border":"3px solid red"});
    $("#updatePayment").html("Update Payment");
    $("#updatePayment").removeAttr("disabled");
    return;
  }
  else{
    $("#id").css({"border":""});
  }
  var day1 = document.getElementById('day1').checked;
  var day2 = document.getElementById('day2').checked;
  var day3 = document.getElementById('day3').checked;
  var iddata = {
    'id': id,
    'day1':day1,
    'day2':day2,
    'day3':day3
  }
  $.post("https://www.pantheon17.in/api/applicants/updatePayment",iddata).done(function(data){
    console.log(iddata);
    if(data.success){
      alert("Update Successful");
      window.location.href = "";
    }
    else{
      alert("Update Failed. Check again");
      window.location.href = "";
    }
  });
}
</script>
</body>
</html>
