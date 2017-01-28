// ==UserScript==
// @name          Reddit: Stop invasive UTM tracking
// @namespace     http://theblob.org/
// @author        Sophie Hamilton
// @description   Prevent the UTM tracking that Reddit uses on its links. Note that this does not yet work fully if you use RES' "Never Ending Reddit" feature.
// @include       http://reddit.com/*
// @include       http://*.reddit.com/*
// @include       https://reddit.com/*
// @include       https://*.reddit.com/*
// @version       1
// @grant         none
// ==/UserScript==

(function() {
  var things = document.querySelectorAll("div.thing a");
  for (var i = 0; i < things.length; i++) {
    var thing = things[i];
    if (thing.getAttribute("data-inbound-url")) {
      thing.removeAttribute("data-inbound-url");
    }
  }
  /* TODO: Make this work for those who use RES' never-ending scroll */
})();
