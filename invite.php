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

// install file is present

	if(file_exists("install/index.php")){

		die("Please delete the 'install' folder to continue.");
	}

// software licence is not found

	if(!file_exists("software_licence.txt")){

		die("Please upload the 'software_licence.txt' file.");
	}

// include files

	include("includes/session.php");

// set referral ID

	if($_GET['ref'])
	{
		$_SESSION['referralID'] = $_GET['ref'];
	}

	header('Location: index.php');

?>