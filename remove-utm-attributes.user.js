// ==UserScript==
// @name           UTM Remover: Remove ?utm_* attributes
// @namespace      http://theblob.org/
// @author         Sophie Hamilton
// @description    Remove the ?utm_* attributes used by sites that employ web analytics software. In addition to replacing links on document load, this also allows a last line of defense by removing attributes from links that are clicked just before the browser tries to load them.
// @include        *
// ==/UserScript==
(function() {
  var debugme = 0;

  var atags = document.getElementsByTagName("a");
  for (var i = 0; i < atags.length; i++) {
    var a = atags.item(i);
    var hval = a.search;
    if (hval && hval.match(/utm/)) {
      var oldhref = a.href;
      if (debugme) { console.log("UTM Remover: Looking at " + oldhref); }
      var newval = replaceUTMs(hval);
      a.search = newval;
      if (hval != newval) {
        console.log("UTM Remover: Cleaned UTM attributes from link: " + oldhref + " --> " + a.href);
      }
    }
  }
  
  window.addEventListener("DOMActivate", function(e) {
    var targ = e.target;
    if (targ.nodeName == "A") {
      var hval = targ.search;
      if (hval && hval.match(/utm/)) {
        var oldhref = targ.href;
        if (debugme) { console.log("UTM Remover: Live-replacing UTMs in " + oldhref); }
        var newval = replaceUTMs(hval);
        if (hval != newval) {
          targ.search = newval;
          console.log("UTM Remover: Live-cleaned UTM attributes from link: " + oldhref + " --> " + targ.href);
        }
      }
    }
  }, false);

  function replaceUTMs(hval) {
    var newval = hval;
    newval = newval.replace(/^\?/, "");
    var attribs = newval.split("&");   // FIXME: this fails when there's an &amp; in the arguments.
    var newattribs = [];
    attribs.forEach(function(el, i) {
      if (!(el.match(/^utm_(?:source|campaign|medium|content|term|name)=.*$/))) {
        newattribs.push(el);
      }
      else if (debugme) { console.log("UTM Remover: Matched " + el + ", removing"); }
    });
    if (newattribs.length > 0) { newval = "?" + newattribs.join("&"); }
                          else { newval = ""; }
    return newval;
  }
})();
