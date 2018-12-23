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

// check userid is numeric, contains min 3 chars and max 16 chars

	if(!$_GET['id'][0] || !_alpha_numeric($_GET['id']) || !$_GET['id'][2] ||  $_GET['id'][16])
	{

		die('Invalid Profile ID');

	}

// upload edit/image

	if($_POST && isset($_SESSION['username']))
	{

		if(!is_numeric($_POST['gender']))
		{

			die('Invalid Gender');

		}

		if(!is_numeric($_POST['age']))
		{

			die('Invalid Age');

		}

		//make safe
		$gender = makeSafe($_POST['gender']); 
		$age = makeSafe($_POST['age']); 
		$location = makeSafe($_POST['location']); 
		$hobbies = makeSafe($_POST['hobbies']); 
		$aboutme = makeSafe($_POST['aboutme']); 

		// assign variables
		$uploaddir = "uploads/"; 
		$uploadfile = $uploaddir.md5(basename($_FILES['uploadedfile']['name']).rand(1,99999));

		$file_type = $_FILES['uploadedfile']['type'];
		$file_type_ext = array('image/pjpeg','image/gif','image/jpeg');

		$allowed_ext = array('jpg','gif');

		if(basename($_FILES['uploadedfile']['name']))
		{ // image is being uploaded

			if(in_array(strtolower(substr(basename($_FILES['uploadedfile']['name']), -3)), $allowed_ext))
			{ // check last 3 characters of basename()

				$ext_allowed='1';
			}

			if(in_array($file_type, $file_type_ext))
			{ // check mime type

				$ext_allowed='1';
			}

		}

		// if image exceeds allowed size
		if($_FILES['uploadedfile']['size'] > $CONFIG['myImg_size']){

			$img_error='1';

		}

		// image is being uploaded
		if(!$img_error && $ext_allowed && $uploadfile)
		{ 

			if(in_array($file_type, $allowed_ext))
			{

				$ext_allowed='1';

			}

			if($ext_allowed)
			{
				if(move_uploaded_file($_FILES['uploadedfile']['tmp_name'], $uploadfile))
				{
					if(!chmod($uploadfile, 0644))
					{
						die("unable to chmod images to 644");
					}
				}

				$image_uploaded = '1';

			}else{

				if(!$ext_allowed)
				{

					$image_uploaded = '2';

				}

			}


		}

		// update user

		if($image_uploaded =='1')
		{

			$sql="
			UPDATE ".$CONFIG['mysql_prefix']."user 
			SET 
			gender = '".htmlspecialchars($gender)."', 
			age = '".htmlspecialchars($age)."', 
			location = '".htmlspecialchars($location)."', 
			hobbies = '".htmlspecialchars($hobbies)."', 
			aboutme = '".htmlspecialchars($aboutme)."', 
			photo = '".makeSafe($_FILES['uploadedfile']['type'])."|".makeSafe(basename($uploadfile))."' 
			WHERE username = '".makeSafe($_SESSION['username'])."'
			";mysql_query($sql) or die(mysql_error('error'));

			$profile_updated = '1';

		}
		else
		{

			$sql="
			UPDATE ".$CONFIG['mysql_prefix']."user
			SET 
			gender = '".htmlspecialchars($gender)."', 
			age = '".htmlspecialchars($age)."', 
			location = '".htmlspecialchars($location)."', 
			hobbies = '".htmlspecialchars($hobbies)."', 
			aboutme = '".htmlspecialchars($aboutme)."' 
			WHERE username = '".makeSafe($_SESSION['username'])."'
			";mysql_query($sql) or die(mysql_error('error'));

			$profile_updated = '1';
		}

		// delete image

		if($_POST['delete_image'] && $_POST['my_image']!='nopic.jpg')
		{

			$image = explode("|", $_POST['my_image']);

			// delete image
			unlink("uploads/".$image[1]);

			$sql = "
			UPDATE ".$CONFIG['mysql_prefix']."user
			SET 
			photo = 'nopic.jpg' 
			WHERE username = '".$_SESSION['username']."'";
			mysql_query($sql) or die(mysql_error());

			$profile_updated = '1';

		}

	}

// end edit/image

// award credits for profile view

	if($_GET['id'] && strtolower($_SESSION['username']) != strtolower($_GET['id']))
	{
		awardCredits('0', $_GET['id']);
	}

// include header

	include("templates/header.php");

// get user data

	// get user details
	$tmp=mysql_query("SELECT * FROM ".$CONFIG['mysql_prefix']."user WHERE username ='".makeSafe($_GET['id'])."' LIMIT 1");
	$userProfileExists = mysql_num_rows($tmp);

	if(!$userProfileExists)
	{

		echo '<center><b>Sorry, this user does not exist.</b></center>';

		return;

	}

	while($i=mysql_fetch_array($tmp))
	{

		// create avatar item array
		$uavatar = explode("|", $i['avatar']);

	?>

		<?php if($_GET['do'] != 'edit'){?>

				<table class="table" align="center" width="450px" cellpadding="0" cellspacing="0" border="0">
				<tr><td><img src="<?php echo $CONFIG['chatroom_url'];?>/images/border.png"></td></tr>
				</table>

				<table class="table" align="center" width="450px" cellpadding="2" cellspacing="0" border="0">
				<tr colspan="2"><td>&nbsp;</td></tr>
				<tr colspan="2">
				<td valign="top" width="10%" align="center"><a href="<?php echo $CONFIG['chatroom_url'];?>/view.php?id=<?php echo $_GET['id'];?>" target="_blank"><img src="<?php echo $CONFIG['chatroom_url'];?>/profiles/view.php?id=<?php echo $_GET['id'];?>" height="90" width="120" border="0"></a><br>(click to enlarge)</td>
				</tr>
				<tr colspan="2">
				<td valign="top" width="90%">
				<b>Username</b>: <?php echo $i['username'];?>

				<?php if(strtolower($_SESSION['username']) == strtolower($i['username'])){?>

					[<a href="<?php echo $CONFIG['chatroom_url'];?>/profiles/index.php?id=<?php echo $_GET['id'];?>&do=edit"><font color="blue">edit profile</font></a>]

				<?php }?>

				<br><br>

				<b>Age</b>: <?php if($i['age']){echo $i['age'];}else{echo "Prefer not to say";}?><br><br>
				<b>Gender</b>: <?php if($i['gender']=='1'){echo "Male";}elseif($i['gender']=='2'){echo "Female";}else{echo "Prefer not to say";}?><br><br>
				<b>Location</b>: <?php if($i['location']){echo $i['location'];}else{echo "Prefer not to say";}?><br><br>
				<b>Hobbies</b>: <?php if($i['hobbies']){echo $i['hobbies'];}else{echo "Prefer not to say";}?><br><br>
				<b>About Me</b>: <?php if($i['aboutme']){echo $i['aboutme'];}else{echo "Prefer not to say";}?><br><br>

				<b>My Points</b>: <br><br>
				<img src="<?php echo $CONFIG['chatroom_url'];?>/images/heart.png"> <?php echo $i['lovepoints'];?>&nbsp;&nbsp;&nbsp;&nbsp;
				<img src="<?php echo $CONFIG['chatroom_url'];?>/images/thumbs_up.png"> <?php echo $i['thumbpoints'];?>&nbsp;&nbsp;&nbsp;&nbsp;
				<img src="<?php echo $CONFIG['chatroom_url'];?>/images/star.png"> <?php echo $i['starpoints'];?><br><br>
				<b>My Avatar</b>:
				</td>
				</tr>

				<tr colspan="2">

				<?php if($uavatar[1]){?>

					<td valign="top" width="90%" height="200">

					<span class="spanMini"><img id="base" src="<?php echo $CONFIG['chatroom_url'];?>/<?php echo $uavatar[1];?>"></span>
					<span class="spanMini"><img id="bottoms" src="<?php echo $CONFIG['chatroom_url'];?>/<?php echo $uavatar[2];?>"></span>
					<span class="spanMini"><img id="eyes" src="<?php echo $CONFIG['chatroom_url'];?>/<?php echo $uavatar[3];?>"></span>
					<span class="spanMini"><img id="hair" src="<?php echo $CONFIG['chatroom_url'];?>/<?php echo $uavatar[4];?>"></span>
					<span class="spanMini"><img id="beard" src="<?php echo $CONFIG['chatroom_url'];?>/<?php echo $uavatar[5];?>"></span>
					<span class="spanMini"><img id="mouth" src="<?php echo $CONFIG['chatroom_url'];?>/<?php echo $uavatar[6];?>"></span>
					<span class="spanMini"><img id="shoes" src="<?php echo $CONFIG['chatroom_url'];?>/<?php echo $uavatar[7];?>"></span>
					<span class="spanMini"><img id="tops" src="<?php echo $CONFIG['chatroom_url'];?>/<?php echo $uavatar[8];?>"></span>
					<span class="spanMini"><img id="accessories" src="<?php echo $CONFIG['chatroom_url'];?>/<?php echo $uavatar[9];?>"></span>
					<span class="spanMini"><img id="trans" src="<?php echo $CONFIG['chatroom_url'];?>/avatars/male/background/trans.png"></span>

				<?php }else{?>

					<td valign="top" width="90%">

					<img src="<?php echo $CONFIG['chatroom_url'];?>/profiles/images/noavi.png">

				<?php }?>

				</td>
				</tr>
				</table>

				<table align="center" width="450px" cellpadding="0" cellspacing="0" border="0">
				<tr><td><img src="<?php echo $CONFIG['chatroom_url'];?>/images/border.png"></td></tr>
				</table>

		<?php }?>

		<?php if(strtolower($_SESSION['username']) != strtolower($i['username']) && $_GET['do'] == 'edit'){?>

				<center><b>Sorry, you do not have permission to edit this profile.</b></center>

		<?php }?>

		<?php if(strtolower($_SESSION['username']) == strtolower($i['username']) && $_GET['do'] == 'edit'){?>

				<table class="table" align="center" width="450px" cellpadding="0" cellspacing="0" border="0">
				<tr><td><img src="<?php echo $CONFIG['chatroom_url'];?>/images/border.png"></td></tr>
				</table>

				<table class="table" align="center" width="450px" cellpadding="2" cellspacing="0" border="0">
				<form enctype="multipart/form-data" action="index.php?id=<?php echo $_GET['id'];?>&do=edit" method="POST">
				<input type="hidden" name="my_image" value="<?php echo ($i['photo']);?>" />
				<tr><td colspan="2"><b>Edit Profile</b></td></tr>

				<?php if(!$img_error && $image_uploaded!='2' && $profile_updated){?>

				<tr><td colspan="2"><b><font color="green">Success, Profile has been updated.</font></b></td></tr>

				<?php }?>


				<?php if($image_uploaded=='2'){?>

				<tr><td colspan="2"><b><font color="red">Error - File not allowed, use .jpg or .gif only.</font></b></td></tr>

				<?php }?>

				<?php if($image_uploaded=='3'){?>

				<tr><td colspan="2"><b><font color="red">Error - Please try again.</font></b></td></tr>

				<?php }?>

				<?php if($img_error){?>

				<tr><td colspan="2"><b><font color="red">Error - File size is too large, please try again.</font></b></td></tr>

				<?php }?>

				<tr><td valign="top" width="10%" align="center" colspan="2"><a href="<?php echo $CONFIG['chatroom_url'];?>/profiles/view.php?id=<?php echo $_GET['id'];?>" target="_blank"><img src="<?php echo $CONFIG['chatroom_url'];?>/profiles/view.php?id=<?php echo $_GET['id'];?>" height="90" width="120" border="0"></a></td></tr>
				<tr><td width="10%"><b>Username</b>&#58;</td><td width="90%"><?php echo $i['username'];?>  [<a href="<?php echo $CONFIG['chatroom_url'];?>/profiles/index.php?id=<?php echo $_GET['id'];?>"><font color="blue">view profile</font></a>]</td></tr>
				<tr><td width="10%"><b>Age</b>&#58;</td><td width="90%">

				<select name="age"><option value="0"> ----- 

				<?php 

				for($p=$CONFIG['min_age'];$p<$CONFIG['max_age']+1;$p++) 
				{

					if ($i['age'] == $p){echo '<option SELECTED>'.$p;}else{echo '<option>'.$p;}
				}

				?>

				</select>

				</td></tr>
				<tr><td width="10%"><b>Gender</b>&#58;</td><td width="90%">

				<select id="gender" name="gender" size="1"> 
				<option value="0"> ----- 
				<option value="1" <?php if($i['gender']=="1"){?>SELECTED<?php }?> /> Male
				<option value="2" <?php if($i['gender']=="2"){?>SELECTED<?php }?> /> Female
				</select>

				</td></tr>
				<tr><td width="10%"><b>Location</b>&#58;</td><td width="90%">
				<input type="text" name="location" value="<?php echo $i['location'];?>" />
				</td></tr>
				<tr><td width="10%"><b>Hobbies</b>&#58;</td><td width="90%"><input type="text" name="hobbies" value="<?php echo $i['hobbies'];?>" /></td></tr>
				<tr><td width="10%"><b>About Me</b>&#58;</td><td width="90%"><textarea rows="10" cols="40" name="aboutme"><?php echo $i['aboutme'];?></textarea></td></tr>
				<tr><td width="10%"><b>Photo</b>&#58;</td><td width="90%"><input type="file" name="uploadedfile"></td></tr>
				<tr><td width="10%">&nbsp;</td><td width="90%"><input type="checkbox" name="delete_image"> Delete Image</td></tr>
				<tr><td width="10%">&nbsp;</td><td width="90%"><input type="submit" name="submit" value="Save Details"></td></tr>
				<tr><td colspan="2">&nbsp;</td></tr>
				</form>
				</table>

				<table align="center" width="450px" cellpadding="0" cellspacing="0" border="0">
				<tr><td><img src="<?php echo $CONFIG['chatroom_url'];?>/images/border.png"></td></tr>
				</table>

		<?php }

	}

	include("templates/footer.php");

	?>