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

	include("../../includes/session.php");
	include("../../includes/db.php");
	include("../../includes/config.php");
	include("../../includes/functions.php");

if(!_numeric($_GET['itemID']))
{
	die("itemID is not valid");
}

if(!_alpha_numeric($_GET['id']))
{
	die("id is not valid");
}

if($_GET['itemID']){

	$tmp = mysql_query("
		SELECT * 
		FROM ".$CONFIG['mysql_prefix']."user 
		WHERE username ='".makeSafe($_GET['id'])."' 
		LIMIT 1
		") or die (mysql_error());


	while($i = mysql_fetch_array($tmp)) {

		if($_GET['itemID']=='1')
		{
			// Path to the requested file
			$path = '../../'.$i['avatara'];
		}

		if($_GET['itemID']=='2')
		{
			// Path to the requested file
			$path = '../../'.$i['avatarb'];
		}

		if($_GET['itemID']=='3')
		{
			// Path to the requested file
			$path = '../../'.$i['avatarc'];
		}

		// Load the requested image
		$image = imagecreatefromstring(file_get_contents($path));

		$w = imagesx($image);
		$h = imagesy($image);

		// Load the watermark image

		$watermark = imagecreatefrompng('60x120.png');

		$ww = imagesx($watermark);
		$wh = imagesy($watermark);

		// Merge watermark upon the original image
		imagecopy($image, $watermark, (($w/2)-($ww/2)), (($h/2)-($wh/2)), 0, 0, $ww, $wh);

		// Send the image
		header('Content-type: image/jpeg');
		imagejpeg($image,null,99);
		exit();

	}


}

?>