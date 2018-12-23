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


	/** add friend request **/

	function addFriendOptions(bUid,bUname){

		//show options
		document.getElementById('sysmess').style.height='auto';
		document.getElementById('sysmess').style.visibility='visible';
		document.getElementById('sysmess').innerHTML  = bUname+" would like to be friends!<br>";
		document.getElementById('sysmess').innerHTML += "<span style='cursor:pointer' onClick=\"toggleBox('sysmess');addFriend('"+bUid+"','"+bUname+"','addfriend')\">Accept</span> | ";
		document.getElementById('sysmess').innerHTML += "<span style='cursor:pointer' onClick=\"toggleBox('sysmess');addFriend('"+bUid+"','"+bUname+"','ignfriend')\">Ignore</span>";

		//pause avatar
		moveAvatar = '0';

	}

	/** accept friend request **/

	function accFriendReq(bUid,bUname){

		//show options
		document.getElementById('sysmess').style.visibility='visible';
		document.getElementById('sysmess').innerHTML  = bUname+" is now your friend!";

		// set display message timeout
		sesstimeoutID = window.clearTimeout(mytimeoutID);;
		sesstimeoutID = window.setTimeout('hideSysMess()',5000);

		//clear this request
		addFriend(bUid,bUname,'accfriend');

		//pause avatar
		moveAvatar = '0';

	}

	/**add friend **/

	//Define XmlHttpRequest
	var addFriendReq = getXmlHttpRequestObject();

	//Add a message to the chat server.
	function addFriend(bUid,bUname,bAction) {

		var param = '?';

		param += '&uref=' + chatRef;
		param += '&uname=' + chatName;
		param += '&uid=' + chatID;
		param += '&uadd_uname=' + bUname;
		param += '&uadd_uid=' + bUid;
		param += '&uaction=' + bAction;
		param += '&uroom=' + room;
		param += '&umessage=';
		param += '&uXX=' + dest_x;
		param += '&uYY=' + dest_y;

		// if ready to send message to DB
		if (addFriendReq.readyState == 4 || addFriendReq.readyState == 0) {

			addFriendReq.open("POST", 'includes/sendData.php', true);
			addFriendReq.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			addFriendReq.onreadystatechange = handleSendFriends;
			addFriendReq.send(param);

		}
				
	}

	//When our message has been sent, update our page.
	function handleSendFriends() {

		//Clear out the existing timer so we don't have 
		//multiple timer instances running.
		clearInterval(mTimer);

		// refresh friends
		showFriends();

	}


	/** show friends **/

	//set total results
	var searchFriendsID = '0';

	//Define XmlHttpRequest
	var showFriendReq = getXmlHttpRequestObject();

	//Gets friends
	function showFriends() {

		if (showFriendReq.readyState == 4 || showFriendReq.readyState == 0) {
			showFriendReq.open("GET", 'includes/friends.php?searchFriendsID='+searchFriendsID, true);
			showFriendReq.onreadystatechange = handleshowFriends; 
			showFriendReq.send(null);
		}

		document.getElementById('myfriends').innerHTML = "";
			
	}

	//Function for handling the friends

	var f_users=0;

	function handleshowFriends() {

		if (showFriendReq.readyState == 4) {

			var xmldoc = showFriendReq.responseXML;
			var allUsers_nodes = xmldoc.getElementsByTagName("getfriends"); 
			f_users = allUsers_nodes.length;

			if(Number(f_users) == 0){

				searchFriendsID = Number(searchFriendsID) - 10;

				if(Number(searchFriendsID) < 0){

					searchFriendsID = '0';

				}

			}

			for (i = 0; i < f_users; i++) {

				var fID_node = allUsers_nodes[i].getElementsByTagName("fid");
				var fName_node = allUsers_nodes[i].getElementsByTagName("fname");
				var fRoom_node = allUsers_nodes[i].getElementsByTagName("froom");
				var fOnline_node = allUsers_nodes[i].getElementsByTagName("fonline");
				var fRoomname_node = allUsers_nodes[i].getElementsByTagName("froomname");
		
				// show message
				showAllFriends(fID_node[0].firstChild.nodeValue,fName_node[0].firstChild.nodeValue,fRoom_node[0].firstChild.nodeValue,fOnline_node[0].firstChild.nodeValue,fRoomname_node[0].firstChild.nodeValue);

			}

		}

	}

	//function for prev options
	function searchFriendsPrev() {

		if(Number(searchFriendsID) < 0){

			searchFriendsID = 0;

		}

		if(Number(searchFriendsID) > 0){

			searchFriendsID = Number(searchFriendsID)-10;

			showFriends();

		}

	}

	//function for next options
	function searchFriendsNext() {

		searchFriendsID = Number(searchFriendsID)+10;

		showFriends();

	}

	//Function for displaying the friends

	var showFriendsIDNav = '0';

	function showAllFriends(fID,fName,fRoom,fOnline,fRoomname){

		// create prev | next links
		if(!document.getElementById("friends_nav")){

			//create div
			var ni = document.getElementById('myfriends');
			var newdiv = document.createElement('div');
			newdiv.setAttribute("id","friends_nav");
			newdiv.className='';
			newdiv.innerHTML = "<div style='padding: 2px;'>";

			if(f_users != 0 && searchFriendsID !=0){

				newdiv.innerHTML += "<a href='javascript:void(0);' onClick='searchFriendsPrev();'><img border='0' src='images/back.png' alt='Last' title='Last'></a>&nbsp;";

			}

			if(f_users >= 10){

				newdiv.innerHTML += "<a href='javascript:void(0);' OnClick='searchFriendsNext();'><img border='0' src='images/forward.png' alt='Next' title='Next'></a>";

			}

			newdiv.innerHTML += "</div>";
			ni.appendChild(newdiv);

		}

		// if div not created
		if(!document.getElementById("friends_"+fID)){

			//create div
			var ni = document.getElementById('myfriends');
			var newdiv = document.createElement('div');
			newdiv.setAttribute("id","friends_"+fID);
			newdiv.className='';

			//assign profile url
			if(chatProfileID == '0'){

				var userProfileUrl = chatProfileUrl+fName;

			}else{

				var userProfileUrl = chatProfileUrl+fID.replace(/_/gi,"");

			}

			// show online status
			if(fOnline=='1'){

				if(chatMemberLevel == 1){

					newdiv.innerHTML = "&nbsp;"+fName+"<br>&nbsp;"+fRoomname+"<br><img id='onlineStatusIMG_"+fID+"' style='vertical-align:middle;' src='images/user.png' title='Online' alt='Online'>&nbsp;<img style='vertical-align:middle;cursor:pointer;' src='images/home.png' onclick=\"loadRoom('"+fRoom+"');\" title='Join User' alt='Join User'>&nbsp;<img id='pchat' onClick=\"doWhisper('"+fName+"')\" style='cursor:pointer;vertical-align:middle;padding-top:4px;' src='images/private_chat.png' title='Private Chat' alt='Private Chat'>&nbsp;<img onClick=\"window.open('"+userProfileUrl+"','"+fID+"')\" style='cursor:pointer;vertical-align:middle;cursor:pointer;' src=images/zoom.png  title='View Profile' alt='View Profile'>&nbsp;<img style='vertical-align:middle;cursor:pointer;' src='images/sendmail.png' onClick=\"replyM('"+fName+"','');toggleBox('myfriends');\" title='Send Message' alt='Send Message'>&nbsp;<img style='vertical-align:middle;cursor:pointer' src='images/bin.png' onClick=\"deleteFriend('"+fID+"','"+fName+"')\" title='Remove' alt='Remove'><br><br>";

				}else{

					newdiv.innerHTML = "&nbsp;"+fName+"<br>&nbsp;"+fRoomname+"<br><img id='onlineStatusIMG_"+fID+"' style='vertical-align:middle;' src='images/user.png' title='Online' alt='Online'>&nbsp;<img style='vertical-align:middle;cursor:pointer;' src='images/home.png' onclick=\"loadRoom('"+fRoom+"');\" title='Join User' alt='Join User'>&nbsp;<img id='pchat' onClick=\"grayOut(true);showVIP();\" style='cursor:pointer;vertical-align:middle;padding-top:4px;' src='images/private_chat.png' title='Private Chat' alt='Private Chat'>&nbsp;<img onClick=\"window.open('"+userProfileUrl+"','"+fID+"')\" style='cursor:pointer;vertical-align:middle;cursor:pointer;' src=images/zoom.png  title='View Profile' alt='View Profile'>&nbsp;<img style='vertical-align:middle;cursor:pointer;' src='images/sendmail.png' onClick=\"grayOut(true);showVIP();\" title='Send Message' alt='Send Message'>&nbsp;<img style='vertical-align:middle;cursor:pointer' src='images/bin.png' onClick=\"deleteFriend('"+fID+"','"+fName+"')\" title='Remove' alt='Remove'><br><br>";

				}


			}else{

				if(chatMemberLevel == 1){

					newdiv.innerHTML = "&nbsp;"+fName+"<br>&nbsp;"+fRoomname+"<br><img id='onlineStatusIMG_"+fID+"' style='vertical-align:middle;' src='images/offline.png' title='Offline' alt='Offline'>&nbsp;<img style='vertical-align:middle;cursor:pointer;' src='images/home.png' onclick=\"loadRoom('"+fRoom+"');\" title='Join User' alt='Join User'>&nbsp;<img id='pchat' onClick=\"alert('User Is Offline');\" style='cursor:pointer;vertical-align:middle;padding-top:4px;' src='images/private_chat.png' title='Private Chat' alt='Private Chat'>&nbsp;<img onClick=\"window.open('"+userProfileUrl+"','"+fID+"')\" style='cursor:pointer;vertical-align:middle;cursor:pointer;' src=images/zoom.png  title='View Profile' alt='View Profile'>&nbsp;<img style='vertical-align:middle;cursor:pointer;' src='images/sendmail.png' onClick=\"replyM('"+fName+"','');toggleBox('myfriends');\" title='Send Message' alt='Send Message'>&nbsp;<img style='vertical-align:middle;cursor:pointer' src='images/bin.png' onClick=\"deleteFriend('"+fID+"','"+fName+"')\" title='Remove' alt='Remove'><br><br>";

				}else{

					newdiv.innerHTML = "&nbsp;"+fName+"<br>&nbsp;"+fRoomname+"<br><img id='onlineStatusIMG_"+fID+"' style='vertical-align:middle;' src='images/offline.png' title='Offline' alt='Offline'>&nbsp;<img style='vertical-align:middle;cursor:pointer;' src='images/home.png' onclick=\"loadRoom('"+fRoom+"');\" title='Join User' alt='Join User'>&nbsp;<img id='pchat' onClick=\"alert('User Is Offline');\" style='cursor:pointer;vertical-align:middle;padding-top:4px;' src='images/private_chat.png' title='Private Chat' alt='Private Chat'>&nbsp;<img onClick=\"window.open('"+userProfileUrl+"','"+fID+"')\" style='cursor:pointer;vertical-align:middle;cursor:pointer;' src=images/zoom.png  title='View Profile' alt='View Profile'>&nbsp;<img style='vertical-align:middle;cursor:pointer;' src='images/sendmail.png' onClick=\"grayOut(true);showVIP();\" title='Send Message' alt='Send Message'>&nbsp;<img style='vertical-align:middle;cursor:pointer' src='images/bin.png' onClick=\"deleteFriend('"+fID+"','"+fName+"')\" title='Remove' alt='Remove'><br><br>";

				}

			}

			ni.appendChild(newdiv);

		}

	}


	/** delete friends **/


	//Define XmlHttpRequest
	var delFriendReq = getXmlHttpRequestObject();

	//Add a message to the chat server.
	function deleteFriend(ubUid,ubUname) {

		//show message
		document.getElementById('sysmess').style.visibility='visible';
		document.getElementById('sysmess').innerHTML = "Your not friends with "+ubUname+"<br>";

		var param = '?';

		param += '&uref=' + chatRef;
		param += '&uname=' + chatName;
		param += '&uid=' + chatID;
		param += '&uremfriendID=' + ubUid;
		param += '&uaction=delfriend';
		param += '&uroom=' + room;
		param += '&umessage=';
		param += '&uXX=' + dest_x;
		param += '&uYY=' + dest_y;

		// if ready to send message to DB
		if (delFriendReq.readyState == 4 || delFriendReq.readyState == 0) {

			delFriendReq.open("POST", 'includes/sendData.php', true);
			delFriendReq.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			delFriendReq.onreadystatechange = handleSendDeleteFriends;
			delFriendReq.send(param);

		}

		// remove from friends list
		if(document.getElementById("friends_"+ubUid)){

			var d = document.getElementById('myfriends');
			var olddiv = document.getElementById("friends_"+ubUid);
			d.removeChild(olddiv);

		}
				
	}

	//When our message has been sent, update our page.
	function handleSendDeleteFriends() {

		//Clear out the existing timer so we don't have 
		//multiple timer instances running.
		clearInterval(mTimer);

	}

	/** request friends **/

	var sesstimeoutID;

	//Define XmlHttpRequest
	var reqFriendReq = getXmlHttpRequestObject();

	//Add a message to the chat server.
	function reqFriend(ubUid,ubUname) {

		//show message
		document.getElementById('sysmess').style.visibility='visible';
		document.getElementById('sysmess').innerHTML = "Request sent to "+ubUname+"<br>";

		//pause avatar
		moveAvatar = '0';

		// set display message timeout
		sesstimeoutID = window.clearTimeout(mytimeoutID);;
		sesstimeoutID = window.setTimeout('hideSysMess()',5000);

		var param = '?';

		param += '&uref=' + chatRef;
		param += '&uname=' + chatName;
		param += '&uid=' + chatID;
		param += '&ureqfriendID=' + ubUid;
		param += '&to_uname=' + ubUname;
		param += '&uaction=reqfriend';
		param += '&uroom=' + room;
		param += '&umessage=';
		param += '&uXX=' + dest_x;
		param += '&uYY=' + dest_y;

		// if ready to send message to DB
		if (reqFriendReq.readyState == 4 || reqFriendReq.readyState == 0) {

			reqFriendReq.open("POST", 'includes/sendData.php', true);
			reqFriendReq.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			reqFriendReq.onreadystatechange = handleSendReqFriends;
			reqFriendReq.send(param);

		}
				
	}

	//When our message has been sent, update our page.
	function handleSendReqFriends() {

		//Clear out the existing timer so we don't have 
		//multiple timer instances running.
		clearInterval(mTimer);

	}

	// check room status

	function checkRoomStatus(){

		if(roomFull == '1'){

			//show message
			document.getElementById('sysmess').style.visibility='visible';
			document.getElementById('sysmess').innerHTML = "Sorry, that room is full!";

			// set display message timeout
			sesstimeoutID = window.clearTimeout(mytimeoutID);;
			sesstimeoutID = window.setTimeout('hideSysMess()',5000);

		}

		if(roomFriends == '1'){

			//show message
			document.getElementById('sysmess').style.visibility='visible';
			document.getElementById('sysmess').innerHTML = "Sorry, that room is for friends only!";

			// set display message timeout
			sesstimeoutID = window.clearTimeout(mytimeoutID);;
			sesstimeoutID = window.setTimeout('hideSysMess()',5000);

		}

	}