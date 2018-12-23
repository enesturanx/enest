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

	// function for divs z-index
	var topLevel = 100;

	function toggleBox(szDivID)
	{
		

		if(document.layers)	   //NN4+
		{
			if(document.layers[szDivID].visibility == "visible")
			{
				document.layers[szDivID].visibility = "hidden";

			}
			else
			{
				document.layers[szDivID].zIndex = topLevel++;
				document.layers[szDivID].visibility = "visible";

			}

		    }
		    else if(document.getElementById)	  //gecko(NN6) + IE 5+
		    {
			var obj = document.getElementById(szDivID);

			if(obj.style.visibility == "visible")
			{
				obj.style.visibility = "hidden";

			}
			else
			{
				obj.style.zIndex = topLevel++;
				obj.style.visibility = "visible";

			}

		    }
		    else if(document.all)	// IE 4
		    {
			
			if(document.all[szDivID].style.visibility == "visible")
			{
				document.all[szDivID].style.visibility = "hidden";

			}
			else
			{
				document.all[szDivID].style.zIndex = topLevel++;
				document.all[szDivID].style.visibility = "visible"; 

			}
		    }

		if(topLevel > 30000)
		{
			topLevel = 10;
		}

	}

	// greys out screen
	// function courtesy of: http://www.hunlock.com/blogs/Snippets:_Howto_Grey-Out_The_Screen

	function grayOut(vis, options) {

  		// Pass true to gray out screen, false to ungray
  		// options are optional.  This is a JSON object with the following (optional) properties
  		// opacity:0-100         // Lower number = less grayout higher = more of a blackout 
  		// zindex: #             // HTML elements with a higher zindex appear on top of the gray out
  		// bgcolor: (#xxxxxx)    // Standard RGB Hex color code
  		// grayOut(true, {'zindex':'50', 'bgcolor':'#0000FF', 'opacity':'70'});
  		// Because options is JSON opacity/zindex/bgcolor are all optional and can appear
  		// in any order.  Pass only the properties you need to set.

  		var options = options || {}; 
  		var zindex = options.zindex || 31000;
  		var opacity = options.opacity || 80;
  		var opaque = (opacity / 100);
  		var bgcolor = options.bgcolor || '#000000';
  		var dark=document.getElementById('darkenScreenObject');

  		if (!dark) {

    			// The dark layer doesn't exist, it's never been created.  So we'll create it here and apply some basic styles.
    			// If you are getting errors in IE see: http://support.microsoft.com/default.aspx/kb/927917

    			var tbody = document.getElementsByTagName("body")[0];
    			var tnode = document.createElement('div');           // Create the layer.
        		tnode.style.position='absolute';                 // Position absolutely
        		tnode.style.top='0px';                           // In the top
        		tnode.style.left='0px';                          // Left corner of the page
        		tnode.style.overflow='hidden';                   // Try to avoid making scroll bars            
        		tnode.style.display='none';                      // Start out Hidden
        		tnode.id='darkenScreenObject';                   // Name it so we can find it later
    			tbody.appendChild(tnode);                            // Add it to the web page
    			dark=document.getElementById('darkenScreenObject');  // Get the object.
  		}

  		if (vis) {

    			// Calculate the page width and height 

    			if( document.body && ( document.body.scrollWidth || document.body.scrollHeight ) ) {

        			var pageWidth = document.body.scrollWidth+'px';
        			var pageHeight = document.body.scrollHeight+'px';

    			} else if( document.body.offsetWidth ) {

      				var pageWidth = document.body.offsetWidth+'px';
      				var pageHeight = document.body.offsetHeight+'px';
    			} else {

       				var pageWidth='100%';
       				var pageHeight='100%';
    			}  
 
    			//set the shader to cover the entire page and make it visible.
    			dark.style.opacity=opaque;                      
    			dark.style.MozOpacity=opaque;                   
    			dark.style.filter='alpha(opacity='+opacity+')'; 
    			dark.style.zIndex=zindex;        
    			dark.style.backgroundColor=bgcolor;  
    			dark.style.width= pageWidth;
    			dark.style.height= pageHeight;
    			dark.style.display='block'; 

			// pause avatar movement
			denyMove = '1';
                         
  		} else {

     			dark.style.display='none';

				denyMove = '0';

  		}

	}

	// show rooms

	function showRooms(){

		document.getElementById('myrooms').style.visibility="visible";

	}

	// show welcome (splash screen)

	function showWelcome(){

		if(hideSplash=='1'){

			// do grey out
			grayOut(true);

			// pause avatar until next click
			moveAvatar = '0';

			document.getElementById('splashpage').style.visibility="visible";

		}

	}

	// hide welcome (splash screen)

	function hideWelcome(){

		if(hideSplash=='1'){

			document.getElementById('splashpage').style.visibility="hidden";

			// remove grey out
			grayOut(false);

			// pause avatar until next click
			moveAvatar = '0';
		}

	}

	// toggle menu buttons (show/fade)

	var sendmailStyle = false, blocklistStyle = false, locklistStyle = false, emaillistStyle = false, friendslistStyle = false, myplaceStyle = false, speakerStyle = false, changeroomStyle = false, towerStyle = false;

	var tDiv = '';

	function toggleStyle(image, styleName, tDiv) {

		var pressed = false;

		switch (styleName) {

			case "sendmail":
			pressed = sendmailStyle = !sendmailStyle;
			break;

			case "block":
			pressed = blocklistStyle = !blocklistStyle;
			break;

			case "lock":
			pressed = locklistStyle = !locklistStyle;
			break;

			case "email":
			pressed = emaillistStyle = !emaillistStyle;
			break;

			case "group":
			pressed = friendslistStyle = !friendslistStyle;
			break;

			case "myplace":
			pressed = myplaceStyle = !myplaceStyle;
			break;

			case "speaker":
			pressed = speakerStyle = !speakerStyle;
			break;

			case "changeroom":
			pressed = changeroomStyle = !changeroomStyle;
			break;

			case "tower":
			pressed = towerStyle = !towerStyle;
			break;

			}

			var newBGimage = "images/" + styleName + (pressed ? ".down" : "") + ".png";

			document.getElementById(tDiv).style.backgroundImage ="url('"+newBGimage+"')";
			
	} 

	// hide system messages

	function hideSysMess(){

		document.getElementById('sysmess').style.visibility='hidden';

	}

	// show VIP window

	function showVIP(){

		document.getElementById('upgradeVIP').style.visibility='visible';

	}

	// hide VIP window

	function hideVIP(){

		// close the vip box
		toggleBox('upgradeVIP');

		// remove grey out
		grayOut(false);

		// pause avatar until next click
		moveAvatar = '0';

	}

	// show games window

	function showGames(){

		document.getElementById('playGames').style.visibility='visible';

		// pause avatar until next click
		moveAvatar = '0';

	}

	// hide games window

	function hideGames(){

		// close the vip box
		toggleBox('playGames');

		// remove grey out
		grayOut(false);

		// pause avatar until next click
		moveAvatar = '0';

	}

	// show gotoUsers window

	function showTower(){

		document.getElementById('gotoUsers').style.visibility='visible';

		// pause avatar until next click
		moveAvatar = '0';

	}

	// hide gotoUsers window

	function hideTower(){

		// close the vip box
		toggleBox('gotoUsers');

		// remove grey out
		grayOut(false);

		// pause avatar until next click
		moveAvatar = '0';

	}


	// show avatar creator window

	function showAvatarCreator(){

		document.getElementById('avatarCreator').style.visibility='visible';

		// pause avatar until next click
		moveAvatar = '0';

	}

	// hide avatar creator window

	function hideAvatarCreator(){

		// reload room
		editAvatar = 1;
		loadRoom(room);

		// close the window
		document.getElementById('avatarCreator').style.visibility='hidden';

		// remove grey out
		grayOut(false);

		// pause avatar until next click
		moveAvatar = '0';
	}

	//enable/disable music stream in private rooms

	var musicOFF = 0;
	var newStream = 0;

	function playStream(stream){

		if(musicOFF == 0){

			// play default stream (none)
			newStream = 'music/index.php';

			// disable music
			musicOFF = 1;

			// pause avatar until next click
			moveAvatar = '0';

		}else{

			// play users stream
			newStream = stream;

			// enable music
			musicOFF = 0;

			// pause avatar until next click
			moveAvatar = '0';

		}

		// music status
		document.getElementById("AUDIOUrl").src=newStream;			

	}

	//show cursor posisition

	function cursorPos(){

  		document.getElementById('startPosistion').innerHTML = "<b>X:</b> "+dest_x + " <b>Y:</b> "+dest_y;

	}

	//posistion 1 door

	function _door1(_dy_,_dx_,_dh_,_dw_,_dv_){

		document.getElementById("doorone").style.top  = _dy_+'px';
		document.getElementById("doorone").style.left = _dx_+'px';
		document.getElementById("doorone").style.height = _dh_+'px';
		document.getElementById("doorone").style.width  = _dw_+'px';

		if(_dv_){

			document.getElementById("doorone").style.border = "1px solid #84B2DE";
			document.getElementById("doorone").style.color = "#84B2DE";  
			document.getElementById("doorone").innerHTML = "1"; 

		}

	}

	//posistion 2 door

	function _door2(_dy_,_dx_,_dh_,_dw_,_dv_){

		document.getElementById("doortwo").style.top  = _dy_+'px';
		document.getElementById("doortwo").style.left = _dx_+'px';
		document.getElementById("doortwo").style.height = _dh_+'px';
		document.getElementById("doortwo").style.width  = _dw_+'px';

		if(_dv_){

			document.getElementById("doortwo").style.border = "1px solid #84B2DE";
			document.getElementById("doortwo").style.color = "#84B2DE"; 
			document.getElementById("doortwo").innerHTML = "2";  

		} 

	}

	//posistion 3 door

	function _door3(_dy_,_dx_,_dh_,_dw_,_dv_){

		document.getElementById("doorthree").style.top  = _dy_+'px';
		document.getElementById("doorthree").style.left = _dx_+'px';
		document.getElementById("doorthree").style.height = _dh_+'px';
		document.getElementById("doorthree").style.width  = _dw_+'px';

		if(_dv_){

			document.getElementById("doorthree").style.border = "1px solid #84B2DE"; 
			document.getElementById("doorthree").style.color = "#84B2DE"; 
			document.getElementById("doorthree").innerHTML = "3"; 


		}

	}

	// shop

	function shop(){

		window.open('shop/','shop');

	}

	// open new browser page

	function newUrl(url,id){

		window.open(url,id);

	}