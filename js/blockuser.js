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


	/** block user **/


	//Define XmlHttpRequest
	var blockReq = getXmlHttpRequestObject();

	//Add a message to the chat server.
	function blockUser(bUid,bUname) {

		//show message
		document.getElementById('sysmess').style.visibility='visible';
		document.getElementById('sysmess').innerHTML = "You have blocked "+bUname+"<br>";

		// set display message timeout
		sesstimeoutID = window.clearTimeout(mytimeoutID);;
		sesstimeoutID = window.setTimeout('hideSysMess()',5000);

		var param = '?';

		param += '&uref=' + chatRef;
		param += '&uname=' + chatName;
		param += '&uid=' + chatID;
		param += '&ublock_uname=' + bUname;
		param += '&ublock_id=' + bUid;
		param += '&uaction=block';
		param += '&uroom=' + room;
		param += '&umessage='+chatName+' blocked '+bUname;
		param += '&uXX=' + dest_x;
		param += '&uYY=' + dest_y;

		// if ready to send message to DB
		if (blockReq.readyState == 4 || blockReq.readyState == 0) {

			blockReq.open("POST", 'includes/sendData.php', true);
			blockReq.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			blockReq.onreadystatechange = handleSendBlock;
			blockReq.send(param);

		}
				
	}

	//When our message has been sent, update our page.
	function handleSendBlock() {

		//Clear out the existing timer so we don't have 
		//multiple timer instances running.
		clearInterval(mTimer);

		// refresh blocked users
		getBlockedUsers();

		//hide blockuser list
		document.getElementById('blocklist').style.visibility='hidden';


	}


	/** show blocked users **/


	//Define XmlHttpRequest
	var blockedUserReq = getXmlHttpRequestObject();

	//Gets the blocked users
	function getBlockedUsers() {
		if (blockedUserReq.readyState == 4 || blockedUserReq.readyState == 0) {
			blockedUserReq.open("GET", 'includes/blocked.php', true);
			blockedUserReq.onreadystatechange = handleBlockedUsers; 
			blockedUserReq.send(null);
		}
			
	}

	//Function for handling the blocked users
	function handleBlockedUsers() {

		if (blockedUserReq.readyState == 4) {

			var xmldoc = blockedUserReq.responseXML;
			var allUsers_nodes = xmldoc.getElementsByTagName("blockedusers"); 
			var n_users = allUsers_nodes.length;

			for (i = 0; i < n_users; i++) {

				var bID_node = allUsers_nodes[i].getElementsByTagName("bid");
				var bName_node = allUsers_nodes[i].getElementsByTagName("bname");
		
				// show message
				showBlocked(bID_node[0].firstChild.nodeValue,bName_node[0].firstChild.nodeValue);

			}

		}

	}

	//Function for displaying the blocked users
	function showBlocked(bID,bName){

		if(!document.getElementById("block_"+bID)){

			//create div
			var ni = document.getElementById('blocklist');
			var newdiv = document.createElement('div');
			newdiv.setAttribute("id","block_"+bID);
			newdiv.className='';
			newdiv.innerHTML = "<img style='vertical-align:middle;' src=images/block.png> "+bName+" [<a href='javascript:void(0);' onClick=\"unblockUser('"+bID+"','"+bName+"')\" title='Unblock' alt='Unblock'>x</a>]<br>";
			ni.appendChild(newdiv);

		}

	}


	/** unblock users **/


	//Define XmlHttpRequest
	var unblockReq = getXmlHttpRequestObject();

	//Add a message to the chat server.
	function unblockUser(ubUid,ubUname) {

		//show message
		document.getElementById('sysmess').style.visibility='visible';
		document.getElementById('sysmess').innerHTML = "You have unblocked "+ubUname+"<br>";

		// set display message timeout
		sesstimeoutID = window.clearTimeout(mytimeoutID);;
		sesstimeoutID = window.setTimeout('hideSysMess()',5000);

		var param = '?';

		param += '&uref=' + chatRef;
		param += '&uname=' + chatName;
		param += '&uid=' + chatID;
		param += '&unblock_uname=' + ubUname;
		param += '&unblock_id=' + ubUid;
		param += '&uaction=unblock';
		param += '&uroom=' + room;
		param += '&umessage='+chatName+' unblocked '+ubUname;
		param += '&uXX=' + dest_x;
		param += '&uYY=' + dest_y;

		// if ready to send message to DB
		if (unblockReq.readyState == 4 || unblockReq.readyState == 0) {

			unblockReq.open("POST", 'includes/sendData.php', true);
			unblockReq.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			unblockReq.onreadystatechange = handleSendunBlock;
			unblockReq.send(param);

		}

		// remove from block list
		if(document.getElementById("block_"+ubUid)){

			var d = document.getElementById('blocklist');
			var olddiv = document.getElementById("block_"+ubUid);
			d.removeChild(olddiv);

		}
				
	}

	//When our message has been sent, update our page.
	function handleSendunBlock() {

		//Clear out the existing timer so we don't have 
		//multiple timer instances running.
		clearInterval(mTimer);

		//hide blockuser list
		document.getElementById('blocklist').style.visibility='hidden';

	}