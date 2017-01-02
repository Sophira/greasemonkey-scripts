// ==UserScript==
// @name           Remove ?utm_* attributes
// @namespace      http://theblob.org/
// @description    Remove the ?utm_* attributes used by sites that employ web analytics software. In addition to replacing links on document load, this also allows a last line of defense by removing attributes from links that are clicked just before the browser tries to load them.
// @include        *
// ==/UserScript==
(function() {
  var atags = document.getElementsByTagName("a");
  for (var i = 0; i < atags.length; i++) {
    var a = atags.item(i);
    var hval = a.getAttribute("href");
    if (hval) {
      var oldval = hval;
//      var newval = hval.replace(/(\?|&(amp;)?)utm_(source|campaign|medium|content|term)=[^&#]+/g, "");
//      if (oldval.match(/utm/)) { console.log("GM script: Looking at " + oldval); }
      var newval = replaceUTMs(hval);
//      var newval = hval.replace(/utm/g, "");
      a.setAttribute("href", newval);
      if (oldval != newval) {
        console.log("GM Script: Cleaned UTM attributes from link: " + oldval + " --> " + newval);
      }
    }
  }
  
  window.addEventListener("DOMActivate", function(e) {
    var targ = e.target;
    if (targ.nodeName == "A") {
      var hval = targ.getAttribute("href");
      if (hval.match(/utm/)) {
//        console.log("Live-replacing UTMs in " + hval);
        var newval = replaceUTMs(hval);
        if (hval != newval) {
          targ.setAttribute("href", newval);
          console.log("GM Script: Live-cleaned UTM attributes from link: " + hval + " --> " + newval);
        }
      }
    }
  }, false);

  function replaceUTMs(hval) {
    var newval = hval.replace(/(\?|&)utm_(?:source|campaign|medium|content|term|name)=[^&#]+((?=&|$))/g, function(matched, sep, endsep) {
//      console.log("Matched " + matched + ", sep=" + sep + ", endsep=" + endsep);
      if (endsep == "&") { return sep; }
                    else { return ""; }
    });
    return newval;
  }
})();
