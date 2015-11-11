// ==UserScript==
// @name        xkcd: Add link to explainxkcd
// @author      Sophie Hamilton
// @description Adds a link to explainxkcd.com on all xkcd comic pages.
// @namespace   http://theblob.org/
// @include     http://xkcd.com/*/
// @include     https://xkcd.com/*/
// @version     1
// @grant       none
// ==/UserScript==

(function() {
  var title = document.getElementById("ctitle");
  if (title) {
    var results = document.location.pathname.match(/^\/(\d+)\/$/);
    var comicnum = results[1];
    var span = document.createElement("span");
    span.appendChild(document.createTextNode(" ("));
    var link = document.createElement("a");
    link.href = "http://www.explainxkcd.com/wiki/index.php/" + comicnum;
    link.appendChild(document.createTextNode("explain"));
    span.appendChild(link);
    span.appendChild(document.createTextNode(")"));
    title.appendChild(span);
  }
})();