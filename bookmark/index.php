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


/** ENTER CHAT ROOM TITLE **/
$bookmark_title = 'Avatar Chat - Pro Chat Rooms';

/** DO NOT EDIT THIS BIT **/
$bookmark_url = 'http://'.$_SERVER['SERVER_NAME'];
$bookmark_image = 'http://'.$_SERVER['SERVER_NAME'].'/'.dirname($_SERVER['PHP_SELF']).'/bookmark/images';
?>

<style>
.bookmarks{
font-family: Comic Sans MS, Verdana, Arial;
font-size: 12px;
font-style: normal;
}
</style>

<div class="bookmarks">

	Bookmark/Share:&nbsp;<br>

	<A title=Digg href="http://digg.com/submit?url=<?php echo $bookmark_url;?>&amp;title=<?php echo $bookmark_title;?>" rel=nofollow target="blank"><IMG border=0 height=16 alt=Digg src="<?php echo $bookmark_image;?>/icon-digg.png" width=16></A> 
	<A title=Reddit href="http://reddit.com/submit?url=<?php echo $bookmark_url;?>&amp;title=<?php echo $bookmark_title;?>" rel=nofollow target="blank"><IMG border=0 height=16 alt=Reddit src="<?php echo $bookmark_image;?>/icon-reddit.png" width=16></A> 
	<A title=Del.icio.us href="http://del.icio.us/post?url=<?php echo $bookmark_url;?>&amp;title=<?php echo $bookmark_title;?>" rel=nofollow target="blank"><IMG border=0 height=16 alt=Del.icio.us src="<?php echo $bookmark_image;?>/icon-delicious.png" width=16></A> 
	<A title=Ma.gnolia href="http://ma.gnolia.com/bookmarklet/add?url=<?php echo $bookmark_url;?>&amp;title=<?php echo $bookmark_title;?>" rel=nofollow target="blank"><IMG border=0 height=16 alt=Ma.gnolia src="<?php echo $bookmark_image;?>/icon-magnolia.png" width=16></A> 
	<A title="Stumble Upon" href="http://www.stumbleupon.com/submit?url=<?php echo $bookmark_url;?>&amp;title=<?php echo $bookmark_title;?>" rel=nofollow target="blank"><IMG border=0 height=16 alt="Stumble Upon" src="<?php echo $bookmark_image;?>/icon-stumbleupon.png" width=16></A> 
	<A title=Facebook href="http://www.facebook.com/sharer.php?u=<?php echo $bookmark_url;?>" rel=nofollow target="blank"><IMG border=0 height=16 alt=Facebook src="<?php echo $bookmark_image;?>/icon-facebook.png" width=16></A> 
	<A title=Twitter href="http://twitter.com/home?status=<?php echo $bookmark_url;?>" rel=nofollow target="blank"><IMG border=0 height=16 alt=Twitter src="<?php echo $bookmark_image;?>/icon-twitter.png" width=16></A> 
	<A title=Google href="http://www.google.com/bookmarks/mark?op=edit&amp;bkmk=<?php echo $bookmark_url;?>&amp;title=<?php echo $bookmark_title;?>" rel=nofollow target="blank"><IMG border=0 height=16 alt=Google src="<?php echo $bookmark_image;?>/icon-google.png" width=16></A> 
	<A title="Yahoo! MyWeb" href="http://myweb2.search.yahoo.com/myresults/bookmarklet?u=<?php echo $bookmark_url;?>&amp;t=<?php echo $bookmark_title;?>" rel=nofollow target="blank"><IMG border=0 height=16 alt="Yahoo! MyWeb" src="<?php echo $bookmark_image;?>/icon-myweb.png" width=16></A> 
	<A title=Furl href="http://furl.net/storeIt.jsp?u=<?php echo $bookmark_url;?>&amp;t=<?php echo $bookmark_title;?>" rel=nofollow target="blank"><IMG border=0 height=16 alt='Furl' src="<?php echo $bookmark_image;?>/icon-furl.png" width=16></A> 
	<A title=BlinkList href="http://blinklist.com/index.php?Action=Blink/addblink.php&amp;Url=<?php echo $bookmark_url;?>&amp;Title=<?php echo $bookmark_title;?>" rel=nofollow target="blank"><IMG border=0 height=16 alt=BlinkList src="<?php echo $bookmark_image;?>/icon-blinklist.png" width=16></A> 
	<A title=Technorati href="http://www.technorati.com/faves?add=<?php echo $bookmark_url;?>" rel=nofollow target="blank"><IMG border=0 height=16 alt=Technorati src="<?php echo $bookmark_image;?>/icon-technorati.png" width=16></A> 
	<A title=Mixx href="http://www.mixx.com/submit?page_url=<?php echo $bookmark_url;?>" rel=nofollow target="blank"><IMG border=0 height=16 alt=Mixx src="<?php echo $bookmark_image;?>/icon-mixx.png" width=16></A> 
	<A title="Windows Live" href="https://favorites.live.com/quickadd.aspx?marklet=1&amp;mkt=en-us&amp;url=<?php echo $bookmark_url;?>&amp;top=1" rel=nofollow target="blank"><IMG border=0 height=16 alt="Windows Live" src="<?php echo $bookmark_image;?>/icon-windowslive.png" width=16></A> 
	<A title=Bookmark href="javascript:window.external.AddFavorite('<?php echo $bookmark_url;?>', '<?php echo $bookmark_title;?>')" rel=nofollow><IMG border=0 height=16 alt=Bookmark src="<?php echo $bookmark_image;?>/icon-bookmark.png" width=16></A> 

</div>