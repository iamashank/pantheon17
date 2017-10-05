$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip();
	$("#introRegister").addClass('animated zoomIn');
	setTimeout(function() {
    		$("#introRegister").show();
  	}, 1000);
	$("#successMessage").html("You have successfully completed your individual registration. <br><br> Your Pantheon ID: <b>PAPAAPA</b><br>Your Email: <b>mya.sushant@yahoo.com</b><br><br>Please take a screenshot of this page. Details of the same has also been sent to your email. <br><br>What's next? Register for various events now.<br><br><div class=\"btn btn-success\" style=\"font-size:20px;padding:3%;margin-left:-10px;\" onclick=\"window.location.href='https://www.pantheon17.in/events'\">View Events</div><br>");
});


function showRegForm(){
	$("#introRegister").addClass('animated fadeOutUp');
	setTimeout(function() {
    	$("#introRegister").hide();
  	}, 500);
  	setTimeout(function() {
    	$("#registerForm1").show();
  	}, 500);
	$("#registerForm1").addClass('animated fadeInUp');
}

function validate1(){
	var error = 0;
	var name = $('#name').val();
	var email = $('#email').val();
	var reemail = $('#email1').val();
	var phoneNumber = $("#phoneNumber").val();
	var response = grecaptcha.getResponse();
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if(name==""){
		error = 1;
		$("#name").css({"border":"2px solid red"});
	}
	else{
		$("#name").css({"border":""});
	}
	if(email=="" || re.test(email)==false){
		error = 1;
		$("#email").css({"border":"2px solid red"});
	}
	else{
		$("#email").css("border","");
	}
	if(reemail !== email){
		error = 1;
		$("#email1").css({"border":"2px solid red"});
	}
	if(phoneNumber=="" || isNaN(phoneNumber) || phoneNumber.length!=10){
		error = 1;
		$("#phoneNumber").css({"border":"2px solid red"});
	}
	else{
		$("#phoneNumber").css("border","");
	}
	if(response.length == 0){
		error = 1;
		$(".captcha-error").text("Prove that you are not an Artificial Intelligence");
	}
	else{
	    $(".captcha-error").text("");
	}
	if(error==0){
		$('#confirmOTP').html("An OTP will be sent to +91-"+phoneNumber+". It will be sent only once. Do you wish to continue?");
		$("#registerForm1").removeClass('animated fadeInDown');
		$("#registerForm1").addClass('animated fadeOutUp');
	  	setTimeout(function() {
	    	$("#registerForm1").hide();
	  	}, 250);
	  	setTimeout(function() {
	    	$("#confirmationBox").show();
	  	}, 250);
	  	$("#confirmationBox").removeClass('animated fadeOutDown');
		$("#confirmationBox").addClass('animated fadeInUp');
	}
}

var email1 = document.getElementById('email1');
 email1.onpaste = function(e) {
   e.preventDefault();
 };

function cancelOTP(){
	$("#confirmationBox").removeClass('animated fadeInUp');
	$("#confirmationBox").addClass('animated fadeOutDown');
	setTimeout(function() {
		$("#confirmationBox").hide();
	}, 250);
	setTimeout(function() {
	  	$("#registerForm1").show();
	}, 250);
	$("#registerForm1").removeClass('animated fadeOutUp');
	$("#registerForm1").addClass('animated fadeInDown');
}
function sendOTP(){
	$("#sendOTP").html("<span class=\"glyphicon glyphicon-refresh glyphicon-refresh-animate\"></span> Sending..");
	$("#sendOTP").attr("disabled","disabled");
	$("#cancelOTP").attr("disabled","disabled");
	var name = $('#name').val();
	var email = $('#email').val();
	var phoneNumber = $("#phoneNumber").val();
	var response = grecaptcha.getResponse();
	var startRegister = {
		'name': name,
		'email': email,
		'phoneNumber': phoneNumber,
		'g-recaptcha-response': response
	}
	$.post("https://www.pantheon17.in/api/applicants/verify",startRegister).done(function(data){
	    if(data.success){
			$("#confirmationBox").addClass('animated fadeOutUp');
			setTimeout(function() {
				$("#confirmationBox").hide();
			}, 250);
			setTimeout(function() {
			  	$("#otpForm").show();
			}, 250);
			$("#otpForm").addClass('animated fadeInUp');
	    }
	    else{
	    	$("#sendOTP").html("Send OTP");
			$("#sendOTP").removeAttr("disabled");
			$("#cancelOTP").removeAttr("disabled");
			grecaptcha.reset();
	    	cancelOTP();
	    	if(data.msg=="applicant already registered"){
	    		$("#email").css({"border":"2px solid red"});
				$("#phoneNumber").css({"border":"2px solid red"});
				$(".captcha-error").text("The Email and Phone number is already registered. Please check your Email for your Pantheon ID");
	    	}
	    	else if(data.msg=="Invalid Captcha"){
	    		$(".captcha-error").text("Prove that you are not an Artificial Intelligence");
	    	}
	    	else{
	    		vaidate1();
	    	}
	    }
	});
}


function confirmOTP(){
	$("#confirmOTPBtn").html("<span class=\"glyphicon glyphicon-refresh glyphicon-refresh-animate\"></span> Confirming..");
	$("#confirmOTPBtn").attr("disabled","disabled");
	var name = $('#name').val();
	var email = $('#email').val();
	var phoneNumber = $("#phoneNumber").val();
	var otp = $("#otp").val();
	if(otp=="" || isNaN(otp) || otp.length!=6){
		$("#confirmOTPBtn").html("Confirm");
		$("#confirmOTPBtn").removeAttr("disabled");
		$("#otp").css({"border":"2px solid red"});
		return;
	}
	else{
		$("#otp").css("border","");
	}
	var otpData = {
		'name': name,
		'email': email,
		'phoneNumber': phoneNumber,
		'otp': otp
	}
	$.post("https://www.pantheon17.in/api/applicants/verifyOtp",otpData).done(function(data){
	    if(data.success){
	    	$("#otp").css({"border":"false"});
	    	$("#otpForm").addClass('animated fadeOutUp');
			setTimeout(function() {
				$("#otpForm").hide();
			}, 250);
			setTimeout(function() {
			  	$("#registerForm2").show();
			}, 250);
			$("#registerForm2").addClass('animated fadeInUp');
	    }
	    else{
	    	$("#confirmOTPBtn").html("Confirm");
			$("#confirmOTPBtn").removeAttr("disabled");
			$("#otp").css({"border":"2px solid red"});
	    }
	});
}


function validateFinal(){
	var error = 0;
	var name = $('#name').val();
	var email = $('#email').val();
	var phoneNumber = $("#phoneNumber").val();
	var gender = $('#gender').val();
	var year = $('#year').val();
	var rollNumber = $('#rollNumber').val();
	var city = $('#city').val();
	var state = $("#state").val();
	var collegeName = $("#collegeName").val();
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if(gender!="Male" && gender!="Female" && gender!="Others"){
		error = 1;
		$("#gender").css({"border":"2px solid red"});
	}
	else{
		$("#gender").css({"border":""});
	}
	if(year!="0" && year!="1" && year!="2" && year!="3" && year!="4" && year!="5"){
		error = 1;
		$("#year").css({"border":"2px solid red"});
	}
	else{
		$("#year").css({"border":""});
	}
	if(rollNumber==""){
		error = 1;
		$("#rollNumber").css({"border":"2px solid red"});
	}
	else{
		$("#rollNumber").css({"border":""});
	}
	if(city==""){
		error = 1;
		$("#city").css({"border":"2px solid red"});
	}
	else{
		$("#city").css({"border":""});
	}
	if(state==""){
		error = 1;
		$("#state").css({"border":"2px solid red"});
	}
	else{
		$("#state").css({"border":""});
	}
	if(collegeName=="Others"){
		collegeName = $("#otherCollegeField").val();
		if(collegeName==""){
			error = 1;
			$("#otherCollegeField").css({"border":"2px solid red"});
		}
		else{
			$("#otherCollegeField").css({"border":""});
		}
	}
	else{
		if(collegeName==""){
			error = 1;
			$("#collegeName").css({"border":"2px solid red"});
		}
		else{
			$("#collegeName").css({"border":""});
		}
	}
	var finalRegister = {
		'name': name,
		'email': email,
		'phoneNumber': phoneNumber,
		'gender': gender,
		'year': year,
		'rollNumber': rollNumber,
		'city': city,
		'state': state,
		'collegeName': collegeName
	}
	if(error==0){
		$("#registerButton").html("<span class=\"glyphicon glyphicon-refresh glyphicon-refresh-animate\"></span> Registering..");
		$("#registerButton").attr("disabled","disabled");
		$.post("https://www.pantheon17.in/api/applicants/register",finalRegister).done(function(data){
		    if(data.success){
		    	$("#successMessage").html("You have successfully completed your individual registration. <br><br> Your Pantheon ID: <b>"+data.id+"</b><br>Your Email: <b>"+email+"</b><br><br>Please take a screenshot of this page. Details of the same has also been sent to your email. <br><br>What's next? Register for various events now.<br><br><div class=\"btn btn-success\" style=\"font-size:20px;padding:3%;margin-left:-10px;\" onclick=\"window.location.href='https://www.pantheon17.in/events'\">View Events</div><br>");
				$("#registerForm2").addClass('animated fadeOutUp');
				setTimeout(function() {
					$("#registerForm2").hide();
				}, 250);
				setTimeout(function() {
				  	$("#successDiv").show();
				}, 250);
				$("#successDiv").addClass('animated fadeInUp');
		    }
		    else{
		    	alert("An unknown error occured. We are trying to correct it. Please try again later.")
		    }
		});
	}
}

function collegeSelect(){
	if($("#collegeName").val()=="Others"){
		$("#otherCollege").show();
	}
	else{
		$("#otherCollege").hide();
	}
}
