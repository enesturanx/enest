<?php

/**

 Author: Pro Chatrooms
 Software: Avatar Chat
 Url: http://www.prochatrooms.com
 Copyright 2007-2010 All Rights Reserved

 Avatar Chat and all of its source code/files are protected by Copyright Laws. 
 The license for Avatar Chat permits you to install this software on a single domain only (.com, .co.uk, .org, .net, etc.). 
 Each additional installation requires an additional software licence, please contact us for more information.
 You may NOT remove the copyright information and credits for Avatar Chat unless you have been granted permission. 
 Avatar Chat is NOT free software - For more details http://www.prochatrooms.com/software_licence.php

**/


// Send headers to prevent IE cache

	header("Expires: Mon, 26 Jul 1997 05:00:00 GMT" ); 
	header("Last-Modified: " . gmdate( "D, d M Y H:i:s" ) . "GMT" ); 
	header("Cache-Control: no-cache, must-revalidate" ); 
	header("Pragma: no-cache" );
	header("Content-Type: text/html; charset=utf-8");

// unset avatarID

	if($_SESSION['avatarID']){

		unset($_SESSION['avatarID']);

	}

// assign error messages

	if($errorID=='1'){$errorMessage = 'Invalid Username, 3-16 Characters Alphanumeric &amp; Underscore Only';}
	if($errorID=='2'){$errorMessage = 'Error: Incorrect Login Details';}
	if($errorID=='3'){$errorMessage = 'Error: User Already Logged In';}
	if($errorID=='4'){$errorMessage = 'Sorry, You have been banned!';}

?>

	<html> 
	<head>
	<title><?php echo $CONFIG['chatroom_title'];?></title>
	<meta http-equiv="X-UA-Compatible" content="IE=7"/>
	<meta http-equiv="Content-Type" content="text/html; charset=<?php echo $CONFIG['brower_char'];?>" />
	<link type="text/css" rel="stylesheet" href="templates/style.css">

	<script language="javascript" type="text/javascript">
	<!--
	if(window.location == top.location){
		window.location.href="index.html";
	}

	function getPass(){
		document.location.href="index.php?do=password";
	}

	function _showPassword(){
		document.getElementById('showGender').style.visibility="hidden";
		document.getElementById('showPassword').style.visibility="visible";

	}

	function _showGender(){
		document.getElementById('showGender').style.visibility="visible";
		document.getElementById('showPassword').style.visibility="hidden";
		document.getElementById('nickPass').value="";

	}

	function formCheckLogin(form){
		if(!document.getElementById('guest_login').checked && !document.getElementById('member_login').checked) {
  			alert("Please select 'Guest Login' or 'Member Login'");
			return false;
		}
	}
	// -->
	</script>

	</head>

	<body class="body" marginwidth="0" marginheight="0" leftmargin="0" rightmargin="0" topmargin="0" bottommargin="0">

	<div id="loginscreen" class="loginscreen">

		<form onSubmit="return formCheckLogin(this)" action="index.php" method="post">

			<div id="infobox" class="infobox">
	
				Please Enter Your Login Details,

				<table class="mediumtext">
				<?php if($errorID){ ?>
					<tr><td colspan="3" id="login_error"><span style="color: #FF0000"><?php echo $errorMessage;?></span></td></tr>
				<?php }else{ ?>
					<tr><td colspan="3">&nbsp;</td></tr>
				<?php } ?>
				</table>

				<table class="mediumtext">
				<tr><td width="85">Username:</td><td><input class="input" type="text" name="nickName" maxlength="16"></td><td><input type="image" src="templates/login/login.gif" height="24" width="51" border="0" alt="Login" value="Login" onClick="return formCheckLogin(this)"></td></tr>
				</table>

				<table class="mediumtext">

				<?php if($CONFIG['allow_guests']){?>

					<tr><td>&nbsp;</td><td colspan="3">
					<input type="radio" name="loginInfo" value="1" id="guest_login" onClick="_showGender()"><span class="smalltext">Guest Login</span>&nbsp;
					<input type="radio" name="loginInfo" value="2" id="member_login" onClick="_showPassword()"><span class="smalltext">Member Login</span>&nbsp;
					</td></tr>

				<?php }else{?>

					<input type="hidden" name="loginInfo" value="2" id="member_login">

				<?php }?>

				<tr id="showPassword" style="visibility:<?php if($CONFIG['allow_guests']){?>hidden<?php }else{?>visible<?php }?>;"><td width="85">Password:</td><td colspan="2"><input class="input" id="nickPass" type="password" name="nickPass" maxlength="16"></td></tr>
				<tr id="showGender" style="visibility:hidden;" ><td width="85">Gender:</td><td colspan="2">
					<select class="input" name="gender">
						<option value="1">Male</option>
						<option value="2">Female</option>
					</select>
				</td></tr>

				<tr><td colspan="3">&nbsp;</td></tr>
				<tr><td colspan="3">&nbsp;</td></tr>
				<tr><td colspan="3" class="smalltext"><span class="link"><a href="index.php?do=register">Register Your Username For Free!</a></span></td></tr>
				<tr><td colspan="3" class="smalltext"><span class="link"><a href="index.php?do=password">Forgot Your Password?</a></span></td></tr>

				<tr><td colspan="3">&nbsp;</td></tr>
				<tr><td colspan="3">&nbsp;</td></tr>
				<tr><td colspan="3">&nbsp;</td></tr>
				<tr><td colspan="3">&nbsp;</td></tr>
				<tr><td colspan="3"><?php include('bookmark/index.php');?></td></tr>
				<tr><td colspan="3" class="smalltext">Minimum Browser Requirements: <br>IE7, Firefox 3.x.x, Opera 9.x, Safari 4.x.x, Google Chrome 3.0.x</td></tr>
				</table>

			</div>

		</form>
	
	</div>

	</body>
	</html>