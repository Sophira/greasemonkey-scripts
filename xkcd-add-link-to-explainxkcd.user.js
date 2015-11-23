// ==UserScript==
// @name        xkcd: Add link to explainxkcd
// @author      Sophie Hamilton
// @description Adds a link to explainxkcd.com on all xkcd comic pages.
// @namespace   http://theblob.org/
// @include     http://xkcd.com/
// @include     https://xkcd.com/
// @include     http://xkcd.com/*/
// @include     https://xkcd.com/*/
// @include     http://www.xkcd.com/
// @include     https://www.xkcd.com/
// @include     http://www.xkcd.com/*/
// @include     https://www.xkcd.com/*/
// @version     2
// @grant       none
// ==/UserScript==

(function() {
  var title = document.getElementById("ctitle");
  var origin = document.querySelector("#ctitle + .comicNav + #comic + .comicNav + br");
  if (title && origin) {
    var results = origin.nextSibling.data.match(/Permanent link to this comic: http:\/\/xkcd\.com\/(\d+)\//);
    if (results) {
      var comicnum = results[1];
      var randombuttons = document.querySelectorAll("#middleContainer > ul.comicNav > li > a[href='//c.xkcd.com/random/comic/']");
      for (var i = 0; i < randombuttons.length; i++) {
        var li = document.createElement("li");
        var link = document.createElement("a");
        link.href = "http://www.explainxkcd.com/wiki/index.php/" + comicnum;
        link.appendChild(document.createTextNode("Explain"));
        li.appendChild(link);
        var randomli = randombuttons.item(i).parentNode;
        randomli.parentNode.insertBefore(li, randomli);
        randomli.parentNode.insertBefore(document.createTextNode("\n"), randomli);
      }
    }
  }
})();
