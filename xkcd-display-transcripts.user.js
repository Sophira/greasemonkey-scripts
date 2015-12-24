// ==UserScript==
// @name           xkcd: Display transcripts
// @namespace      http://theblob.org/
// @description    This user script will enable the display of transcripts on xkcd comics.
// @include        http://xkcd.com/*
// @include        https://xkcd.com/*
// @include        http://www.xkcd.com/*
// @include        https://www.xkcd.com/*
// ==/UserScript==

(function() {
  window.addEventListener("DOMContentLoaded", function() {
    var trans = document.getElementById("transcript");
    if (trans) {
      trans.style.display = "block";
      trans.style.whiteSpace = "pre-line";
      trans.style.fontVariant = "normal";
      trans.style.fontSize = "smaller";
      trans.style.fontStyle = "italic";
      trans.style.marginTop = "1em";
      trans.style.maxWidth = "66%";
      trans.style.marginLeft = "auto";
      trans.style.marginRight = "auto";
      var img = document.querySelector("#comic img");
      if (img) {
        trans.appendChild(document.createElement("hr"));
        trans.appendChild(document.createTextNode("Title text: " + img.title));
      }
    }
  }, false);
})();
