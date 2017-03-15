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
// @version     3
// @grant       none
// ==/UserScript==

(function() {
  var title = document.getElementById("ctitle");
  var origin = document.querySelector("#ctitle + .comicNav + #comic + .comicNav + br");
  if (title && origin) {
    var results = origin.nextSibling.data.match(/Permanent link to this comic: https:\/\/xkcd\.com\/(\d+)\//);
    if (results) {
      // Add custom styling for our new "Explain" button
      var style = document.createElement("style");
      style.appendChild(document.createTextNode("ul.comicNav li.sph-explainbutton a {\
  background-color: #FF4040;\
}\
\
ul.comicNav li.sph-explainbutton a:hover, ul.comicNav li.sph-explainbutton a:focus {\
  background-color: #FFFFFF;\
  color: #FF4040;\
}"));
      document.head.appendChild(style);

      // find the navigation bars - specifically the "Random" button in each
      var comicnum = results[1];
      var randombuttons = document.querySelectorAll("#middleContainer > ul.comicNav > li > a[href='//c.xkcd.com/random/comic/']");
      for (var i = 0; i < randombuttons.length; i++) {
        var li = document.createElement("li");
        li.className = "sph-explainbutton";
        var link = document.createElement("a");
        link.href = "https://www.explainxkcd.com/wiki/index.php/" + comicnum;
        link.appendChild(document.createTextNode("Explain"));
        li.appendChild(link);
        var randomli = randombuttons.item(i).parentNode;
        randomli.parentNode.insertBefore(li, randomli);
        randomli.parentNode.insertBefore(document.createTextNode("\n"), randomli);
      }
    }
  }
})();
