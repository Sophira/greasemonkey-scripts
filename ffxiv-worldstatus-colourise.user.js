// ==UserScript==
// @name          FFXIV World Status: Colourise category
// @namespace     http://theblob.org/
// @author        Sophie Hamilton
// @description   Adds colours to each of the server types (Congested, Preferred, New) on the FFXIV server status page to make them easy to distinguish.
// @include       https://*.finalfantasyxiv.com/lodestone/worldstatus/
// @version       1
// @grant         zzzsophzzz
// ==/UserScript==

(function() {
  var colours = {
    "Congested": "#DD0000",
    "Preferred": "#00BB00",
          "New": "#00BB00",
//     "Standard": "#0000DD",
  };

  var cats = document.querySelectorAll(".world-list__world_category > p");
  for (var i = 0; i < cats.length; i++) {
    var cat = cats.item(i);
    var text = cat.childNodes.item(0).data;
    if (colours[text]) {
      cat.style.color = colours[text];
      cat.style.fontWeight = "bold";
    }
  }
})();