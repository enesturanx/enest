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

	function showTip(id)
	{
		if(id==1)
		{
			var tipLang = 'Tip: 3-16 characters alphanumeric and underscores';
		}
		if(id==2)
		{
			var tipLang = 'Tip: 3-16 characters';
		}
		if(id==3)
		{
			var tipLang = 'Tip: Must be a valid email address';
		}

		document.getElementById('showTip').innerHTML  =	tipLang;	
	}
	// -->
	</script>

	</head>

	<body class="body" marginwidth="0" marginheight="0" leftmargin="0" rightmargin="0" topmargin="0" bottommargin="0">

	<div id="loginscreen" class="loginscreen">

		<form name="login" action="index.php" method="post">

			<div id="infobox" class="infobox">

				Register Your Username

				<br>

				<table class="mediumtext">
				<input type="hidden" name="do" value="register">

				<?php if($reg){ ?>

					<tr><td colspan="3"><span style="color: #FF0000"><?php echo $eMessage;?></span></td></tr>

				<?php }else{ ?>

					<tr><td colspan="3" id="showTip" class="smalltext">&nbsp;</td></tr>

				<?php } ?>

				<tr><td>Choose Username:</td><td><input class="input" type="text" name="nickName" value="<?php echo $_POST['nickName'];?>" maxlength="16" onfocus="showTip('1')"></td><td>&nbsp;</td></tr>
				<tr><td>Choose Password:</td><td><input class="input" type="password" name="nickPass" maxlength="16" onfocus="showTip('2')"></td><td>&nbsp;</td></tr>
				<tr><td>Enter Your Email:</td><td><input class="input" type="text" name="nickEmail" value="<?php echo $_POST['nickEmail'];?>" maxlength="100" onfocus="showTip('3')"></td><td>&nbsp;</td></tr>
				<tr><td>Gender:</td><td colspan="2">
				<input type="radio" name="gender" value="1" checked> <span class="smalltext">Male</span>&nbsp;
				<input type="radio" name="gender" value="2"> <span class="smalltext">Female</span>
				</td></tr>
				<tr><td>&nbsp;</td><td colspan="2"><input type="image" src="templates/login/register.gif" height="24" width="132" border="0" alt="Register Details"></td></tr>
				<tr><td>&nbsp;</td><td colspan="2"><span class="smalltext"><span class="link"><a href="index.php">... no, i've changed my mind!</a></span></span></td></tr>
				</table>

				<span class="smalltext">
				<br>
				YOURSITE knows that our members' privacy is very important.<br>We do NOT spam. Your information is kept private. We will not<br>sell or reveal your email address. Please read our Privacy Policy.
				</span>

			</div>

		</form>

	</div>

	</body>
	</html>