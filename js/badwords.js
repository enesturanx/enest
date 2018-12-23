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


	/** assign badwords **/

	function filterBadword(nBadword){

		nBadword = nBadword.replace(/fuck/gi,"****");
		nBadword = nBadword.replace(/shit/gi,"****");
		nBadword = nBadword.replace(/bitch/gi,"****");
		nBadword = nBadword.replace(/wank/gi,"****");
		nBadword = nBadword.replace(/cunt/gi,"****");

		// do not edit
		return nBadword;

	}
