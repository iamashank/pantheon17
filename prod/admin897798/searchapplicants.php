<?php
  session_start();
  if((!isset($_SESSION['adminKey'])) || $_SESSION['adminKey']!="8abd5b6492cdad380d53dd2f5b9112b4"){
    header('location: index.php');
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Applicants | Pantheon 17</title>
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
              <select class="inputMaterial" style="width: 30%;" id="key" onchange="changeKey()">
                <option value="1">Search By Name</option>
                <option value="2">Search By College Name</option>
              </select>
              <span class="highlight"></span>
              <label>Select the key</label>
            </div>
            <div class="group"  style="text-align: center;" id="nameField">      
              <input class="inputMaterial" type="text" id="name" data-toggle="tooltip" title="Enter Text to Search" data-placement="bottom" onkeyup="searchName()" required autocomplete="off" style="width: 30%;">
              <span class="highlight"></span>
              <label>Enter the name to search for</label>
            </div>
            <div class="group"  style="text-align: center; display: none;" id="collegeField">      
              <select class="inputMaterial" style="width: 30%;" id="collegeName" onchange="searchCollegeName()">
                <option value="">Select School/College</option>
              </select>
              <span class="highlight"></span>
              <label>Select the School / College to view data</label>
            </div>
            <br><br>
          </form>
          <br><br>
          <div id="recordBoxDiv" style="color: #FFF; font-size:16px;">
          
          </div>
          <br><br>
        </div>
        
    </div>
    <div class="col-sm-2">
    </div>
  </div>
</div>
<script>
function changeKey(){
  if($("#key").val()==2){
    $("#nameField").hide();
    $("#collegeField").show();
  }
  else{
    $("#collegeField").hide();
    $("#nameField").show();
  }
  $("#recordBoxDiv").html("");
}
function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
var applicants = [];
var colleges = {};
var college_array = [];
$.get("https://www.pantheon17.in/api/applicants/getAllApplicants").done(function(data){
    for(var i=0;i<data.length;i++){
      if(data[i].registered==true){
        obj = {'name':toTitleCase(data[i].name),'collegeName':data[i].collegeName.toUpperCase(),'pantheonId':data[i].id};
        if(!(data[i].collegeName.toUpperCase() in colleges)){
          colleges[data[i].collegeName.toUpperCase()] = true;
        }
        applicants.push(obj);
      }
    }
    for(key in colleges){
      college_array.push(key);
    }
    applicants.sort(compare);
    college_array.sort(compare);
    for(var i=0;i<college_array.length;i++){
      $('#collegeName').append($('<option>', {
          value: college_array[i],
          text: college_array[i]
      }));

    }
});
function searchName(){
  var name = $("#name").val();
  if(name.length<2){
    $("#recordBoxDiv").html("<font color='#ff9a72'>Minimum two characters to initiate search</font>");
    $("#name").css({"border":"3px solid red"});
    return;
  }
  else{
    $("#name").css({"border":""});
    var found = [];
    var pattern = new RegExp(name,"i");
    text = "";
    var tot = 0;
    for(var i=0;i<applicants.length;i++){
        if(applicants[i].name.match(pattern)){
          found.push(i);
          tot += 1;
        }
    }
    if(tot==0){
      $("#recordBoxDiv").html("<font color='#ff9a72'>No records found for the given name</font>");
      return;
    }
    text += "<table class='table table-responsive'><thead><tr style='margin:0px auto;color: #fff789;'><th style='text-align: center;'>Name</th><th style='text-align: center;'>College</th><th style='text-align: center;'>Pantheon ID</th></tr></thead><tbody>";
    for(var i=0;i<found.length;i++){
      text += "<tr><td>"+applicants[found[i]].name+"</td><td>"+applicants[found[i]].collegeName+"</td><td><a href='applicant.php?id="+applicants[found[i]].pantheonId+"' style='color: #FFF; text-decoration: underline;' target='new'>"+applicants[found[i]].pantheonId+"</a></td></tr>";
    }
    text += "</tbody></table>";
    $("#recordBoxDiv").html(text);
  }
}
function searchCollegeName(){
  var name = $("#collegeName").val();
  if(name.length==0){
    $("#recordBoxDiv").html("<font color='#ff9a72'>Select a School/College to view data</font>");
    $("#collegeName").css({"border":"3px solid red"});
    return;
  }
  else{
    $("#collegeName").css({"border":""});
    var found = [];
    var pattern = new RegExp(name,"i");
    text = "";
    var tot = 0;
    for(var i=0;i<applicants.length;i++){
        if(applicants[i].collegeName.match(pattern)){
          found.push(i);
          tot += 1;
        }
    }
    if(tot==0){
      $("#recordBoxDiv").html("<font color='#ff9a72'>No records found for the given name</font>");
      return;
    }
    text += "<table class='table table-responsive'><thead><tr style='margin:0px auto;color: #fff789;'><th style='text-align: center;'>Name</th><th style='text-align: center;'>College</th><th style='text-align: center;'>Pantheon ID</th></tr></thead><tbody>";
    for(var i=0;i<found.length;i++){
      text += "<tr><td>"+applicants[found[i]].name+"</td><td>"+applicants[found[i]].collegeName+"</td><td><a href='applicant.php?id="+applicants[found[i]].pantheonId+"' style='color: #FFF; text-decoration: underline;' target='new'>"+applicants[found[i]].pantheonId+"</a></td></tr>";
    }
    text += "</tbody></table>";
    $("#recordBoxDiv").html(text);
  }
}
function compare(a,b) {
  if (a.name<b.name)
    return -1;
  if (a.name>b.name)
    return 1;
  return 0;
}
</script>
</body>
</html>
