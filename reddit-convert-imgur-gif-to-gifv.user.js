// ==UserScript==
// @name        reddit: Convert direct imgur GIF links into GIFVs
// @author      Sophie Hamilton (/u/Sophira)
// @namespace   http://theblob.org/
// @include     http://reddit.com/*
// @include     http://*.reddit.com/*
// @include     https://reddit.com/*
// @include     https://*.reddit.com/*
// @version     1
// @grant       none
// ==/UserScript==

(function() {
  var links = document.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    var a = links.item(i);
    if (a.hostname && a.hostname == "i.imgur.com" && a.pathname.match(/\.gif$/i)) {
      a.pathname += "v";
    }
  }
})();
