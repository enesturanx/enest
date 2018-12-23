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


	//Declare an array for all the timeOuts  
	var timeOuts = new Array(); 

	//Define XmlHttpRequest
	var receiveMesReq = getXmlHttpRequestObject();

	//Gets the messages
	function getMessages() {
		if (receiveMesReq.readyState == 4 || receiveMesReq.readyState == 0) {
			receiveMesReq.open("GET", 'includes/messageData.php?roomID='+room+'&last='+messageID, true);
			receiveMesReq.onreadystatechange = handleMessages; 
			receiveMesReq.send(null);
		}
			
	}

	//Function for handling the messages
	function handleMessages() {

		if (receiveMesReq.readyState == 4) {

			var xmldoc = receiveMesReq.responseXML;
			var allUsers_nodes = xmldoc.getElementsByTagName("usermessage"); 
			var n_users = allUsers_nodes.length;

			for (i = 0; i < n_users; i++) {

				var uID_node = allUsers_nodes[i].getElementsByTagName("uid");
				var uAction_node = allUsers_nodes[i].getElementsByTagName("uaction");
				var uRefid_node = allUsers_nodes[i].getElementsByTagName("urefid");
				var uUserid_node = allUsers_nodes[i].getElementsByTagName("userid");
				var uName_node = allUsers_nodes[i].getElementsByTagName("uname");
				var uToname_node = allUsers_nodes[i].getElementsByTagName("utoname");
				var uRoom_node = allUsers_nodes[i].getElementsByTagName("uroom");
				var uMessage_node = allUsers_nodes[i].getElementsByTagName("umessage");
				var uAvatar_node = allUsers_nodes[i].getElementsByTagName("uavatar");
				var uAvatarX_node = allUsers_nodes[i].getElementsByTagName("uavatarx");
				var uAvatarY_node = allUsers_nodes[i].getElementsByTagName("uavatary");
				var uTime_node = allUsers_nodes[i].getElementsByTagName("utime");

				// show message
				showMessages(uAction_node[0].firstChild.nodeValue,uID_node[0].firstChild.nodeValue,uName_node[0].firstChild.nodeValue,uToname_node[0].firstChild.nodeValue,uMessage_node[0].firstChild.nodeValue,uRefid_node[0].firstChild.nodeValue,uAvatarX_node[0].firstChild.nodeValue,uAvatarY_node[0].firstChild.nodeValue);

			}

			mTimer = setTimeout('getMessages();',refreshMessages);

			mTimer = 0;

		}

	}

	//Function for displaying the messages

	var divID = '0'; // general message count
	var divPID = '0'; // private message count
	var divCPID = '0'; // unique private window

	var doPublicChat = 1;

	function showMessages(dAction,dID,dName,dToname,dMessage,dRefid,dX,dY){

		// unescape message

		dMessage = unescape(dMessage);

		dMessage = dMessage.replace(/&amp;#39;/g,"&#39;");
		dMessage = dMessage.replace(/&amp;#60;/g,"&#60;");
		dMessage = dMessage.replace(/&amp;#62;/g,"&#62;");
		dMessage = dMessage.replace(/&amp;#39;/g,"&#39;");
		dMessage = dMessage.replace(/&amp;#34;/g,"&#34;");
		dMessage = dMessage.replace(/&amp;#37;/g,"&#37;");

		// request friends request

		if(dAction=='reqfriend' && dToname.toLowerCase()==chatName.toLowerCase()){

			addFriendOptions(dID,dName);

			return false;

		}

		// accept friends request

		if(dAction=='accfriend' && dToname.toLowerCase()==chatName.toLowerCase()){

			accFriendReq(dID,dName);

			return false;

		}

		// kick user

		if(dAction=='kick' && dToname.toLowerCase()==chatName.toLowerCase()){

			//move user to default room
			loadRoom(kickRoom);

			return false;

		}

		// ban user

		if(dAction=='ban' && dToname.toLowerCase()==chatName.toLowerCase()){

			//logout banned user
			window.location = "?do=logout&action=banned";

			return false;

		}

		// is the message from this user?

		var isThisUser = '0';

		if(dName.toLowerCase()==chatName.toLowerCase()){

			isThisUser = '1';

		}

		var systemMess;

		// remove user if changed room or logged out

		if(dAction=='logout'){

			hideUsers('_'+dRefid+'_');

		}

		// update message count

		messageID = dID;

		// format messages

		var showToname = '';

		if(dToname!='-'){

			//add whisper 
			showToname = "";

		}

		if(dAction=='love' || dAction=='like' || dAction=='star'){

			//format message

			dMessage = dMessage.replace(/heart.png/gi, "<img src='images/heart.png'>");
			dMessage = dMessage.replace(/thumbs_up.png/gi, "<img src='images/thumbs_up.png'>");
			dMessage = dMessage.replace(/star.png/gi, "<img src='images/star.png'>");

			//update votes

			updateUserPoints();

		}else{

			// assign system username

			systemMess = dName;

			//format smilies in message

			dMessage = addSmilies(dMessage);

		}

		// set the systems username

		if((systemMess=='SYSTEM') || dAction=='block' || dAction=='unblock' || dAction=='interaction'){

			dName = '(info)';

		}

		// add to chatbox

		divID = Number(divID) + 1;

		if((dToname!='-' && systemMess!='SYSTEM') || (systemMess=='SYSTEM' && dAction=='logout')){ // private chat window

			divPID = Number(divPID) + 1;

			//create unique id for private chat window

			var pwdRefid = dRefid.replace(/_/gi,"");

			if(chatName.toLowerCase() != dToname.toLowerCase()){

				divCPID = "_"+chatName.toLowerCase()+dToname.toLowerCase()+"_";

				var tgName = dToname;

			}else{

				divCPID = "_"+chatName.toLowerCase()+dName.toLowerCase()+"_";

				var tgName = dName;

			}

				// shows user is offline in private window if found, else in main

				if(!document.getElementById("tg"+divCPID) && dAction=='logout'){

					doPublicChat();

					return false;

				}

				// create chat window

				createPChatWindow(divCPID,tgName);

				// add message to private window

				var ni = document.getElementById(divCPID);
				var newdiv = document.createElement('div');
				newdiv.setAttribute("id",divPID);
				newdiv.className='';

				var doFont = 'black';

				if(dAction=='logout'){

					doFont = _fontLogout;
				}
				if(dAction=='login'){

					doFont = _fontLogin;
				}
				if(dName.toLowerCase()==chatName.toLowerCase()){

					doFont = _fontSelf;
				}
	
				if(dAction=='love' || dAction=='like' || dAction=='star' || dAction=='logout' || dAction=='login'){

					newdiv.innerHTML = "<font color='"+doFont+"'>(info):&nbsp;"+ showToname + dMessage+"</font>";

				}else{

					newdiv.innerHTML = "<font color='"+doFont+"'>"+dName +":&nbsp;"+ showToname + dMessage+"</font>";

				}

				ni.appendChild(newdiv);
				ni.scrollTop = ni.scrollHeight;

				// keep XXX messages on screen

				if(divPID > _maxMessages) {

					divMessagePID = divPID - _maxMessages;

					if(document.getElementById(divMessagePID)){

						var dm = document.getElementById(divCPID);
						var olddiv = document.getElementById(divMessagePID);
						dm.removeChild(olddiv);

					}

				}

				if(document.getElementById(divCPID).style.visibility!='visible'){

					//hightlight tag on new message
					document.getElementById("tg"+divCPID).style.backgroundColor="#ff9900";

				}

		}

		if(dToname=='-' || dAction=='login' && systemMess=='SYSTEM' && dToname.toLowerCase()==chatName.toLowerCase()){

			doPublicChat();

		}

		function doPublicChat(){

			if(dAction=='love' || dAction=='like' || dAction=='star'){

				// dont show message
				return false;

			}

			var ni = document.getElementById('chatbox');
			var newdiv = document.createElement('div');
			newdiv.setAttribute("id",divID);
			newdiv.className='';

			var doFont = 'black';

			if(dAction=='logout'){

				doFont = _fontLogout;
			}
			if(dAction=='login'){

				doFont = _fontLogin;

				dMessage = dMessage.replace(/&#60;/,"<");
				dMessage = dMessage.replace(/&#62;/,">");
			}
			if(dAction=='interaction'){

				doFont = _fontIAction;
			}
			if(dName.toLowerCase()==chatName.toLowerCase()){

				doFont = _fontSelf;
			}

			newdiv.innerHTML = "<font color='"+doFont+"'>"+dName+":&nbsp;" + showToname + dMessage+"</font>";

			ni.appendChild(newdiv);
			ni.scrollTop = ni.scrollHeight;

			// keep XXX messages on screen

			if(divID > _maxMessages) {

				divMessageID = divID - _maxMessages;

				if(document.getElementById(divMessageID)){

					var dm = document.getElementById('chatbox');
					var olddiv = document.getElementById(divMessageID);
					dm.removeChild(olddiv);

				}

			}

			if(document.getElementById("chatbox").style.visibility!='visible' && dName.toLowerCase() != chatName.toLowerCase()){

				//hightlight tag on new message
				document.getElementById("tgchatbox").style.backgroundColor="#ff9900";

			}

		}

		// show speech bubble

		if(document.getElementById('_'+dRefid+'_myMessage')){

			// show message

			if(systemMess != 'SYSTEM' || dMessage != ''){

				document.getElementById('_'+dRefid+'_myMessage').innerHTML = dMessage;

				// get the existing avatar div pos

				var _x = document.getElementById('_'+dRefid+'_myAvatar').offsetLeft; // x axis
				var _y = document.getElementById('_'+dRefid+'_myAvatar').offsetTop; // y axis

				//Default pos
				var _posShowX = 20;
				var _posShowXX = 15;

				//Reverse speech bubble if user is too far right

				if(_x > 400){

					// move speech bubble left 
					_posShowX = 20 - document.getElementById('_'+dRefid+"_myMessage").clientWidth;

					// set padding
					document.getElementById('_'+dRefid+"_myMessage").style.paddingLeft="10px";
					document.getElementById('_'+dRefid+"_myMessage").style.paddingRight="0px";

					// reverse speech bubble
					var _doRe = 1;

					// assign xx value
					_posShowXX = 5;

				}else{

					// set padding
					document.getElementById('_'+dRefid+"_myMessage").style.paddingLeft="0px";
					document.getElementById('_'+dRefid+"_myMessage").style.paddingRight="10px";

					// default speech bubble
					var _doRe = 0;

				}

				// set padding for speech bubble
				document.getElementById('_'+dRefid+"_myMessage").style.paddingTop="11px";


				// set speech bubble location

				_yy = _y - 50;
				_xx = _x + _posShowX;

				// apply style formatting

				document.getElementById('_'+dRefid+'_myMessage').style.left = _xx+'px';
				document.getElementById('_'+dRefid+'_myMessage').style.top  = _yy+'px';
				document.getElementById('_'+dRefid+'_myMessage').style.height = '30px';
				document.getElementById('_'+dRefid+'_myMessage').style.background="url(images/sp2.png)";

				// set posistion for start of speech bubble

				_yyy = _y - 50;
				_xxx = _xx - _posShowXX;

				document.getElementById('l_'+dRefid+'_myMessage').style.left = _xxx+'px';
				document.getElementById('l_'+dRefid+'_myMessage').style.top  = _yyy+'px';

				if(_doRe==0){
					document.getElementById('l_'+dRefid+'_myMessage').style.height = '48px';
					document.getElementById('l_'+dRefid+'_myMessage').style.width = '16px';
					document.getElementById('l_'+dRefid+'_myMessage').style.background="url(images/sp1.png)";
				}else{
					document.getElementById('l_'+dRefid+'_myMessage').style.height = '43px';
					document.getElementById('l_'+dRefid+'_myMessage').style.width = '6px';
					document.getElementById('l_'+dRefid+'_myMessage').style.background="url(images/sp3rev.png)";
				}

				// set posistion for end of speech bubble

				setRightSpeech = document.getElementById('_'+dRefid+'_myMessage').clientWidth;

				// attach right speech bubble

				_yyyy = _y - 50;
				_xxxx = _xx + setRightSpeech;

				document.getElementById('r_'+dRefid+'_myMessage').style.left = _xxxx+'px';
				document.getElementById('r_'+dRefid+'_myMessage').style.top  = _yyyy+'px';

				if(_doRe==0){
					document.getElementById('r_'+dRefid+'_myMessage').style.height = '43px';
					document.getElementById('r_'+dRefid+'_myMessage').style.width = '6px';
					document.getElementById('r_'+dRefid+'_myMessage').style.background="url(images/sp3.png)";
				}else{
					document.getElementById('r_'+dRefid+'_myMessage').style.height = '48px';
					document.getElementById('r_'+dRefid+'_myMessage').style.width = '16px';
					document.getElementById('r_'+dRefid+'_myMessage').style.background="url(images/sp1rev.png)";
				}

				// show message
				document.getElementById('_'+dRefid+'_myMessage').style.visibility='visible';
				document.getElementById('l_'+dRefid+'_myMessage').style.visibility='visible';
				document.getElementById('r_'+dRefid+'_myMessage').style.visibility='visible';

				// reset message
				dMessage = '';

			}
	
		}

		// clear timeouts
		clearTimeout(timeOuts[dRefid]);
		timeOuts[dRefid] = setTimeout('hideUsersSpeech("'+dRefid+'")',showUserChat);  
	}


	// hide speech bubble after XXX time
	function hideUsersSpeech(dRefid){

		if(document.getElementById('_'+dRefid+'_myMessage') && document.getElementById('_'+dRefid+'_myMessage').style.visibility!='hidden'){

			document.getElementById('_'+dRefid+'_myMessage').style.visibility='hidden';
			document.getElementById('l_'+dRefid+'_myMessage').style.visibility='hidden';
			document.getElementById('r_'+dRefid+'_myMessage').style.visibility='hidden';

		}

	}

	// create the tabs
	function createChatTabs(divCPID,tgName) {

		// create private tab

		if(!document.getElementById("tg"+divCPID)){

			var nt = document.getElementById('chattab');
			var tg = document.createElement('span');
			tg.id = "tg"+divCPID;
			tg.className ="privatetab";

			// control title length (0,7) and append a ...
			// if tab is clicked bring active window to front

			if(divCPID=='chatbox'){

				tg.innerHTML  = "<span onClick=activeChatWindow();showChatWindow('"+divCPID+"','"+tgName+"');>Local</span>&nbsp;"; 

			}else{

				tg.innerHTML  = "<span onClick=activeChatWindow();showChatWindow('"+divCPID+"','"+tgName+"');>" + tgName.substring(0,7) + "...</span>"; 
				tg.innerHTML += "<span onClick=delChatWindow('"+divCPID+"')>[x]</span>&nbsp;";

			}

			nt.appendChild(tg);

		}

		textOptions(divCPID);

	}

	// creates text window options

	function textOptions(divCPID){

		document.getElementById('chatoptions').innerHTML  = "<span style='cursor:pointer;padding-bottom:2px;' onClick=decreaseFontSize('"+divCPID+"'); alt='Decrease Text Size' title='Decrease Text Size'><img src='images/textoptions/decT.png' border='0'></span>";
		document.getElementById('chatoptions').innerHTML += "<span style='cursor:pointer;padding-bottom:2px;' onClick=increaseFontSize('"+divCPID+"'); alt='Increase Text Size' title='Increase Text Size'><img src='images/textoptions/incT.png' border='0'></span>";
		document.getElementById('chatoptions').innerHTML += "<span style='cursor:pointer;padding-bottom:2px;' onClick=toggleBox('"+divCPID+"');hidetextOptions(); alt='Hide Screen' title='Hide Screen'><img src='images/textoptions/minT.png' border='0'></span>";
		document.getElementById('chatoptions').innerHTML += "<span style='cursor:pointer;padding-bottom:2px;' onClick=reduceScreen('"+divCPID+"'); alt='Small Screen' title='Small Screen'><img src='images/textoptions/medT.png' border='0'></span>";
		document.getElementById('chatoptions').innerHTML += "<span style='cursor:pointer;padding-bottom:2px;' onClick=enlargeScreen('"+divCPID+"'); alt='Large Screen' title='Large Screen'><img src='images/textoptions/maxT.png' border='0'></span>";

	}

	//enlarge screen

	var isWindowSize = 0;

	function enlargeScreen(divCPID){

		document.getElementById(divCPID).style.height='400px';
		document.getElementById(divCPID).style.width='600px';

		document.getElementById('chatoptions').style.top='96px';
		document.getElementById('chatoptions').style.width='604px';

		if(ie7)
		{
			document.getElementById('chatoptions').style.top='100px';
			document.getElementById('chatoptions').style.width='600px';
		}

		document.getElementById('chatoptions').style.left='5px';

		// chat window text options
		textOptions(divCPID);

		//large window
		isWindowSize = 1;

		// pause avatar
		moveAvatar = '0';

	}

	//reduce screen

	function reduceScreen(divCPID){

		document.getElementById(divCPID).style.height='150px';
		document.getElementById(divCPID).style.width='300px';

		document.getElementById('chatoptions').style.top='346px';
		document.getElementById('chatoptions').style.width='304px';

		if(ie7)
		{
			document.getElementById('chatoptions').style.top='350px';
			document.getElementById('chatoptions').style.width='300px';
		}

		document.getElementById('chatoptions').style.left='5px';

		document.getElementById('chatoptions').style.visibility='visible';

		// chat window text options
		textOptions(divCPID);

		//small window
		isWindowSize = 0;

		// pause avatar
		moveAvatar = '0';

	}

	// hide text window options

	function hidetextOptions(){

		document.getElementById('chatoptions').style.visibility='hidden';

		moveAvatar = '0';

	}

	// creates private chat window

	function createPChatWindow(divCPID,tgName){

		//create text div

		if(!document.getElementById(divCPID)){

			// create window

			var divTag = document.createElement("div");
			divTag.id = divCPID;
			divTag.className ="chatbox"; // box
			document.body.appendChild(divTag);

			// create window tab
			createChatTabs(divCPID,tgName);

		}

	}

	// show the active chat window

	var showThis = 'chatbox';

	function showChatWindow(activeChat,tgName){

		showThis = activeChat;

		toWhisper = tgName;

		// show chat window
		document.getElementById(activeChat).style.visibility='visible';

		// show text options
		document.getElementById('chatoptions').style.visibility='visible';

		// remove hightlight tag on focus
		document.getElementById("tg"+activeChat).style.background="url(images/chatboxbg.png) repeat-x";

		// chat window text options
		textOptions(activeChat);

		if(isWindowSize==1){

			enlargeScreen(activeChat);

		}else{

			reduceScreen(activeChat);

		}

	}

	// hides previous window when viewing other chat windows
	function activeChatWindow(){

		if(document.getElementById(showThis)){

			document.getElementById(showThis).style.visibility='hidden';

		}

	}

	// delete the active chat window
	function delChatWindow(delChat){

		if(document.getElementById(delChat) && document.getElementById(delChat)!=document.getElementById('chatbox')){

			var d = document.getElementById('body');
			var olddiv = document.getElementById(delChat);
			d.removeChild(olddiv);

			// show text options
			document.getElementById('chatoptions').style.visibility='hidden';

			// void whisper
			toWhisper = '';

		}

		if(document.getElementById("tg"+delChat) && document.getElementById("tg"+delChat)!=document.getElementById('tgchatbox')){

			var d = document.getElementById('chattab');
			var olddiv = document.getElementById("tg"+delChat);
			d.removeChild(olddiv);

		}

	}

	// change text size

	var min=8;
	var max=18;

	function increaseFontSize(divCPID) {

		var p = document.getElementById(divCPID).style.fontSize;

		p = p.replace("px","");

		if(!p){

			p=parseInt(12);
		}

		if(parseInt(p)!=parseInt(max)) {

			p = parseInt(p) + parseInt('1');
		}

		document.getElementById(divCPID).style.fontSize = p+"px";

		// pause avatar
		moveAvatar = '0';

	}

	function decreaseFontSize(divCPID) {

		var p = document.getElementById(divCPID).style.fontSize;

		p = p.replace("px","");

		if(!p){

			p=parseInt(12);
		}

		if(parseInt(p)!=parseInt(max)) {

			p = parseInt(p) - parseInt('1');
		}

		document.getElementById(divCPID).style.fontSize = p+"px"; 

		// pause avatar
		moveAvatar = '0';
	}