// ==UserScript==
// @name        YouTube: TV-sized banner toggle
// @description To use this script, simply click on the banner on a YouTube channel to toggle it between the TV-sized banner and the regular one. If you use AdBlock Plus you will need to add an exception rule or you will get blank images on some channels; take a look at the source code for details.
// @namespace   http://theblob.org/
// @include     https://www.youtube.com/user/*
// @include     https://www.youtube.com/channel/*
// @version     1
// @grant       none
// ==/UserScript==

// PLEASE NOTE: You may encounter blank images when using this script with AdBlock Plus. To fix this, add the following exception rule to ABP:
//                @@||ytimg.com^*/channels4_tv_banner.jpg?$domain=youtube.com

(function() {
  var zoomcur = "data:image/vnd.microsoft.icon;base64," +
    "AAACAAEAEBACAAUABQCwAAAAFgAAACgAAAAQAAAAIAAAAAEAAQAAAAAAgAAAAAAAAAAAAAAAAgAA" +
    "AAAAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAD/AAAA/wAAAf+AAAH/gAAB/4AAA" +
    "f+AAAD/AAAA/wAAADwAAAAAAAAD//f////j////x////4///8Mf//8AP//+AH///gB///wAP//8A" +
    "D///AA///wAP//+AH///gB///8A////w////";

  var header = document.querySelector("#c4-header-bg-container.has-custom-banner");
  var style = this.currentStyle || window.getComputedStyle(header, null);
  var img = style.backgroundImage;
  var firstregex = /\/w2120-[^\/]+\//;
  var secondregex = /\/channels4_banner_hd\.jpg/;
  var first = img.match(firstregex);
  var second = img.match(secondregex);
  if (header && (first || second)) {
    header.style.cursor = "url(" + zoomcur + "), auto";
	var profileimg = document.querySelector("a.channel-header-profile-image-container");
	var headerlinks = document.querySelector("div#header-links");
    header.addEventListener("click", function(e) {
	  var changed = this.getAttribute("sph-yt-userscript-bg-changed");
	  if (changed == "1") {
	    this.style.backgroundImage = "";
		this.style.height = "175px";
		this.removeAttribute("sph-yt-userscript-bg-changed");
//		this.style.cursor = "-moz-zoom-out";
		if (profileimg) { profileimg.style.display = ""; }
		if (headerlinks) { headerlinks.style.display = ""; }
	  }
	  else {
	    if (first) {
	      img = img.replace(firstregex, "/w1280/");   // has a bit of a higher bandwidth cost than the web banner size, but not much. Please don't change this to w2120 as YouTube might not like it.
	      this.style.backgroundImage = img;
		}
		else if (second) {
		  img = img.replace(secondregex, "/channels4_tv_banner.jpg");   // unfortunately this doesn't have a lower-bandwidth version so we get the 2120px-sized one.
//		  var imgdiv = document.querySelector("#c4-header-bg-container .hd-banner-image");
//		  imgdiv.style.backgroundImage = img;
          this.style.backgroundImage = img;
		}
	    this.style.height = "478px";
//		this.style.cursor = "-moz-zoom-in";
		if (profileimg) { profileimg.style.display = "none"; }
		if (headerlinks) { headerlinks.style.display = "none"; }
	    this.setAttribute("sph-yt-userscript-bg-changed", "1");
	  }
	}, false);
  }
})();
