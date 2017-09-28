if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 	$("#register").click();
}

$("input").focus(function(){
	$(this).css("opacity","0.6");
});
$("input,select,textarea").focusout(function(){
	if($(this).val()==""){
		$(this).css("opacity","0.6");
	}
	else{
		$(this).css("opacity","0.8");
	}
});
$(document).ready(function () {
    $('input,select,textarea').tooltip({'trigger':'focus'});
});
$('#email').tooltip({'trigger':'focus', 'title': 'Please enter a valid Email'});
$('#name').tooltip({'trigger':'focus', 'title': 'Name is required'});
$('#gender').tooltip({'trigger':'focus', 'title': 'Please select your Gender'});
$('#phoneNumber').tooltip({'trigger':'focus', 'title': 'Please enter a valid phone number without +91'});
$('#collegeName').tooltip({'trigger':'focus', 'title': 'Please enter your School/College name'});
$('#answer1').tooltip({'trigger':'focus', 'title': 'Max. 500 characters'});
$('#answer2').tooltip({'trigger':'focus', 'title': 'Max. 500 characters'});
$('#answer3').tooltip({'trigger':'focus', 'title': 'Max. 500 characters'});
$('#answer4').tooltip({'trigger':'focus', 'title': 'Max. 500 characters'});
$('#answer5').tooltip({'trigger':'focus', 'title': 'Max. 500 characters'});
function validate1(){
	var error = 0;
	var name = document.getElementById("name").value;
	var email = document.getElementById("email").value;
	var phoneNumber = document.getElementById("phoneNumber").value;
	var gender = document.getElementById("gender").value;
	var collegeName = document.getElementById("collegeName").value;
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if(name==""){
		error = 1;
		$("#name").css({"border":"2px solid red","opacity":"0.6"});
	}
	else{
		$("#name").css({"border":""});
	}
	if(email=="" || re.test(email)==false){
		error = 1;
		$("#email").css({"border":"2px solid red","opacity":"0.6"});
	}
	else{
		$("#email").css("border","");
	}
	if(gender!="Male" && gender!="Female" && gender!="Others"){
		error = 1;
		$("#gender").css({"border":"2px solid red","opacity":"0.6"});
	}
	else{
		$("#gender").css("border","");
	}
	if(phoneNumber=="" || isNaN(phoneNumber) || phoneNumber.length!=10){
		error = 1;
		$("#phoneNumber").css({"border":"2px solid red","opacity":"0.6"});
	}
	else{
		$("#phoneNumber").css("border","");
	}
	if(collegeName==""){
		error = 1;
		$("#collegeName").css({"border":"2px solid red","opacity":"0.6"});
	}
	else{
		$("#collegeName").css("border","");
	}
	if(error==0){
		$("#cont1").click();
	}
	return false;
}
function validate2(){
	var error = 0;
	var answer1 = document.getElementById("answer1").value;
	var answer2 = document.getElementById("answer2").value;
	var answer3 = document.getElementById("answer3").value;
	if(answer1==""){
		error = 1;
		$("#answer1").css({"border":"2px solid red","opacity":"0.6"});
	}
	else{
		$("#answer1").css({"border":""});
	}
	if(answer2==""){
		error = 1;
		$("#answer2").css({"border":"2px solid red","opacity":"0.6"});
	}
	else{
		$("#answer2").css({"border":""});
	}
	if(answer3==""){
		error = 1;
		$("#answer3").css({"border":"2px solid red","opacity":"0.6"});
	}
	else{
		$("#answer3").css({"border":""});
	}
	if(error==0){
		$("#cont2").click();
	}
}
function validateFinal(){
	var error = 0;
	var name = document.getElementById("name").value;
	var email = document.getElementById("email").value;
	var phoneNumber = document.getElementById("phoneNumber").value;
	var gender = document.getElementById("gender").value;
	var collegeName = document.getElementById("collegeName").value;
	var answer1 = document.getElementById("answer1").value;
	var answer2 = document.getElementById("answer2").value;
	var answer3 = document.getElementById("answer3").value;
	var answer4 = document.getElementById("answer4").value;
	var answer5 = document.getElementById("answer5").value;
	if(answer4==""){
		error = 1;
		$("#answer4").css({"border":"2px solid red","opacity":"0.6"});
	}
	else{
		$("#answer4").css({"border":""});
	}
	if(answer5==""){
		error = 1;
		$("#answer5").css({"border":"2px solid red","opacity":"0.6"});
	}
	else{
		$("#answer5").css({"border":""});
	}

	if(error==0){
		$("#submitButton").html("<span class=\"glyphicon glyphicon-refresh glyphicon-refresh-animate\"></span> Submitting..");
		var newSap = {
			name: name,
			email: email,
			phoneNumber: phoneNumber,
			gender: gender,
			collegeName: collegeName,
			answer1: answer1,
			answer2: answer2,
			answer3: answer3,
			answer4: answer4,
			answer5: answer5
		}
		$.post( "https://www.pantheon17.in/api/saps/register", newSap)
		  .done(function( data ) {
		    if(data.success){
		    	var id = data.id;
		    	document.getElementById("name").value = "";
		    	document.getElementById("email").value = "";
		    	document.getElementById("phoneNumber").value = "";
		    	document.getElementById("collegeName").value = "";
		    	document.getElementById("answer1").value = "";
		    	document.getElementById("answer2").value = "";
		    	document.getElementById("answer3").value = "";
		    	document.getElementById("answer4").value = "";
		    	document.getElementById("answer5").value = "";
		    	$("#cont3").click();
		    	$("#regSuccessMsg").html("<div class=\"text-area-label\" style=\"text-transform: none; font-size: 14px;\">Thank you! We have received your application.<br><br> Your SAP ID is: <b>"+id+"</b>. A confirmation mail has also been sent to <b>"+email+"</b>. <br><br>Our team will be contacting you soon regarding your application.</div><br><br><div class=\"btn btn-success\" style=\"font-size:12px;padding:3%;margin-left:-10px;\" onclick=\"window.location.href='https://www.pantheon17.in/'\">Back to Home</div><br>");
		    }
		    else{
		    	$("#submitButton").html("Submit My Application");
		    	$('#myModal').modal("show");
		    }
		});
	}
}
