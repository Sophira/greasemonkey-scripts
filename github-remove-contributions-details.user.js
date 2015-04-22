// ==UserScript==
// @name        GitHub: Remove contributions details
// @author      Sophie Hamilton
// @namespace   http://theblob.org/
// @include     http://github.com/*
// @include     https://github.com/*
// @version     2
// @grant       none
// ==/UserScript==

(function() {
  if (document.body.classList.contains("page-profile")) {
    var contribdetails = document.querySelector("#contributions-calendar > .contrib-details");
    if (contribdetails) {
      contribdetails.style.display = "none";
    }
    else {
      contribdetails = document.querySelectorAll("#contributions-calendar > .contrib-column");
      if (contribdetails && contribdetails.length > 0) {
        for (var i = 0; i < contribdetails.length; i++) {
          contribdetails.item(i).style.display = "none";
        }
      }
    }
  }
})();
