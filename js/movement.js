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


//Define XmlHttpRequest
var sendReq = getXmlHttpRequestObject();

var thisDiv = '';

// set movement rate
var interval = 10; //Move 10px per request

function hideSpeech(){

	document.getElementById("_a_myMessage").style.visibility='hidden';
	document.getElementById("l_myMessage").style.visibility='hidden';
	document.getElementById("r_myMessage").style.visibility='hidden';

}

function moveImage(DivID) {

	//check if movement is allowed

	if(denyMove == '1'){

		return false;
	}

	// assign edges of screen (800x600)

	if(dest_x < 10) {dest_x = 10;}
	if(dest_y < 30) {dest_y = 30;}
	if(dest_x > 740) {dest_x = 740;}
	if(dest_y > 410) {dest_y = 410;}

	//Keep on moving the image till the target is achieved

	if(x<dest_x) x = x + interval; 
	if(y<dest_y) y = y + interval;
	if(x>dest_x) x = x - interval; 
	if(y>dest_y) y = y - interval;

	//Default pos

	var posShowX = 20;
	var posShowXX = 15;

	//Reverse speech bubble if user is too far right

	if(x > 400){

		// move speech bubble left 
		posShowX = 20 - document.getElementById(DivID+"myMessage").clientWidth;

		// set padding
		document.getElementById(DivID+"myMessage").style.paddingLeft="10px";
		document.getElementById(DivID+"myMessage").style.paddingRight="0px";

		// reverse speech bubble
		var doRe = 1;

		// assign xx value
		posShowXX = 5;

	}else{

		// set padding
		document.getElementById(DivID+"myMessage").style.paddingLeft="0px";
		document.getElementById(DivID+"myMessage").style.paddingRight="10px";

		// default speech bubble
		var doRe = 0;

	}
	
	//Move the speech bubble

	yy = y - 50;
	xx = x + posShowX;

	document.getElementById(DivID+"myMessage").style.left = xx+'px';
	document.getElementById(DivID+"myMessage").style.top  = yy+'px';
	document.getElementById(DivID+"myMessage").style.height = '38px'; // 34
	document.getElementById(DivID+"myMessage").style.background="url(images/sp2.png)";

	//assign left div

	yyy = y - 50;
	xxx = xx - posShowXX;

	document.getElementById("l_myMessage").style.left = xxx+'px';
	document.getElementById("l_myMessage").style.top  = yyy+'px';

	if(doRe==0){

		// default
		document.getElementById("l_myMessage").style.height = '48px';
		document.getElementById("l_myMessage").style.width = '16px';
		document.getElementById("l_myMessage").style.background="url(images/sp1.png)";

	}else{

		document.getElementById("l_myMessage").style.height = '43px';
		document.getElementById("l_myMessage").style.width = '6px';
		document.getElementById("l_myMessage").style.background="url(images/sp3rev.png)";

	}

	//set posistion for right speech bubble

	setRightSpeech = document.getElementById(DivID+"myMessage").clientWidth;

	// assign right div

	yyyy = y - 50;
	xxxx = xx + setRightSpeech;

	document.getElementById("r_myMessage").style.left = xxxx+'px';
	document.getElementById("r_myMessage").style.top  = yyyy+'px';

	if(doRe==0){

		// default
		document.getElementById("r_myMessage").style.height = '43px';
		document.getElementById("r_myMessage").style.width = '6px';
		document.getElementById("r_myMessage").style.background="url(images/sp3.png)";

	}else{

		document.getElementById("r_myMessage").style.height = '48px';
		document.getElementById("r_myMessage").style.width = '16px';
		document.getElementById("r_myMessage").style.background="url(images/sp1rev.png)";

	}

	// move avater

	document.getElementById(DivID+"myAvatar").style.top  = y+'px';
	document.getElementById(DivID+"myAvatar").style.left = x+'px';

	if ((x+interval < dest_x) || (y+interval < dest_y) || (x-interval > dest_x) || (y-interval > dest_y)) {

	/**

		** defines the 4 way movement for character images
		** characters front, back, right and left (in sequence)
		** this feature may be introduced in future versions ;)

		if((y+interval < dest_y)){

			// show down image
			document.getElementById("image").src = "avatar/man/down.gif";

		}

		if((y-interval > dest_y)){

			// show up image
			document.getElementById("image").src = "avatar/man/up.gif";

		}

		if((x+interval < dest_x)){

			// show left image
			document.getElementById("image").src = "avatar/man/right.gif";

		}

		if((x-interval > dest_x)){

			// show right image
			document.getElementById("image").src = "avatar/man/left.gif";

		}

	**/

		//Keep on calling this function every 100 microsecond 
		//till the target location is reached

		thisDiv = DivID;

		// window.setTimeout('moveImage(thisDiv)',100);

	}

}

//Send action to the database.
function moveAvatarIMG() {

	if(moveAvatar == '0' || denyMove == '1'){

		// return false;

	}

	var param = '?';

	param += '&uroom=' + room;
	param += '&uname=' + chatName;
	param += '&uid=' + chatID;
	param += '&uaction=move';
	param += '&uXX=' + dest_x;
	param += '&uYY=' + dest_y;

	// if ready to send message to DB
	if (sendReq.readyState == 4 || sendReq.readyState == 0) {

		sendReq.open("POST", 'includes/sendData.php', true);
		sendReq.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		sendReq.onreadystatechange = handleSendXY;
		sendReq.send(param);

	}

	// reset movement timer
	timerIsOn=0;
				
}

//When our message has been sent, update our page.
function handleSendXY() {

	//Clear out the existing timer so we don't have 
	//multiple timer instances running.
	clearInterval(mTimer);


}

// use arrow keys for movement

var isMoveKeyPress = 0;

function getMoveKeyPress(e) {

	if(
		document.getElementById("message").value=='' && 
		document.getElementById("send_to").value=='' && 
		document.getElementById("send_mail_mess").value==''
	)
	{
		// get key press value
		var unicode=e.keyCode? e.keyCode : e.charCode;

		if(unicode == 37)
		{
			x -= 10;
			dest_x = x;
		}

		if(unicode == 39)
		{
			x += 10;
			dest_x = x;
		}

		if(unicode == 38)
		{
			y -= 10;
			dest_y = y;
		}

		if(unicode == 40)
		{
			y += 10;
			dest_y = y;

		}

		if(unicode >= 37 && unicode <= 40)
		{
			moveImage('_a_');
			isMoveKeyPress = 1;
		}

	}

}

function sendMoveKeyPress(e) {

	var unicode=e.keyCode? e.keyCode : e.charCode;

	if(unicode >= 37 && unicode <= 40)
	{
		if(isMoveKeyPress == 1)
		{
			doMoveTimer();
			isMoveKeyPress = 0;
		}
	}
}

// set timout to prevent flooding server
// with ajax calls when sending movement data

var moveTimer;
var timerIsOn=0;

function timedCount() {

	moveTimer=setTimeout("moveAvatarIMG();",2000);
}

function doMoveTimer() {

	if(!timerIsOn)
	{
 		timerIsOn=1;
  		timedCount();
	}
}