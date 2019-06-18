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
  var colours = { // text colour, background colour (optional, remove to use default)
    "Congested": ["#DD0000", "#FFDDDD"],
    "Preferred": ["#009900", "#CCEECC"],
          "New": ["#00BB00", "#BBFFBB"],
//     "Standard": ["#0000DD"],
  };

  var cats = document.querySelectorAll(".world-list__world_category > p");
  for (var i = 0; i < cats.length; i++) {
    var cat = cats.item(i);
    var text = cat.childNodes.item(0).data;
    var col = colours[text];
    if (col) {
      cat.style.color = col[0];
      cat.style.fontWeight = "bold";
      if (col[1]) {
        cat.parentNode.parentNode.style.backgroundColor = col[1];
      }
    }
  }
})();