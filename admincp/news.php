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

// include files

	include("../includes/session.php");
	include("../includes/db.php");
	include("../includes/config.php");
	include("../includes/functions.php");

// check login

	if(!isset($_SESSION['cp_isLoggedIN']) || isset($_SESSION['cp_isLoggedIN']) != md5(md5($CONFIG['cp_prefix']))){

		// header redirect
		// header("Status: 200");
		header("Location: index.php");
		die;

	}

?>

<html> 
<head>
<title>Avatar Chat - Admin Area</title>
<meta http-equiv="X-UA-Compatible" content="IE=7"/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<style>
.body {
color: #CCCCCC;
font-family: Verdana, Arial;
font-size: 12px;
font-style: normal;
background-color: #000000;
}
.table {
color: #CCCCCC;
font-family: Verdana, Arial;
font-size: 12px;
font-style: normal;
background-color: #000000;
}
.iframe {
border-style:dashed;
border-width:1px;
}
a:link {text-decoration: none; color: #CCCCCC;}
a:visited {text-decoration: none; color: #CCCCCC;}
a:active {text-decoration: none; color: #CCCCCC;}
a:hover {text-decoration: underline; color: #CCCCCC;}
</style>

</head>
<body class="body">

<b>News & Welcome</b>

<br><br>

Welcome to the Avatar Chat Control Panel.

<br><br>

Please select an option in the left hand menu.

<br><br>

<br><br>
<b>Installation Details,</b>
<br><br>
<b>&#187; Version</b>: <?php echo $CONFIG['version'];?>
<br><br>
<b>Server Details,</b><br><br>
<b>&#187; Domain Name</b>: <?php echo $_SERVER['SERVER_NAME'];?><br>
<b>&#187; PHP Version</b>: <?php echo phpversion();?> [<a href="phpInfo.php" target="_blank">view details</a>]<br>
<b>&#187; MySQL Version</b>: <?php echo mysql_get_server_info();?><br><br>

<b>Browser Details,</b>
<br><br>
<b>&#187; Browser</b>: <?php echo $_SERVER['HTTP_USER_AGENT'];?><br>
<b>&#187; UserIP</b>: <?php echo getIP();?><br>

</body>
</html>







