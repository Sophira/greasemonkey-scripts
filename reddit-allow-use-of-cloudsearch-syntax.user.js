// ==UserScript==
// @name        reddit: Allow use of cloudsearch syntax
// @author      Sophie Hamilton (/u/Sophira)
// @description Adds a checkbox to allow the use of cloudsearch syntax with the reddit search widget, and provides a link to /u/interiot's cloudsearch syntax page.
// @namespace   http://theblob.org/
// @require     https://raw.githubusercontent.com/Sophira/greasemonkey-scripts/master/resources/query-string-parser.js
// @include     http://reddit.com/*
// @include     https://reddit.com/*
// @include     http://*.reddit.com/*
// @include     https://*.reddit.com/*
// @version     3
// @grant       none
// ==/UserScript==

(function() {
  // add the cloudsearch checkbox
  var restricts = document.querySelectorAll('form#search div#moresearchinfo');
  for (var i = 0; i < restricts.length; i++) {
    var checked="false";
    var qs = new QueryString();
    var cs = qs.value("syntax");
    var cloudsearched = false;
    if (cs == "cloudsearch") {
      cloudsearched = true;
      checked = " checked";
    }

    var div = document.createElement("div");
    div.innerHTML = '<label><input name="syntax" value="cloudsearch" type="checkbox"' + checked + '>use cloudsearch syntax</label> (<a href="https://cdn.rawgit.com/DeeNewcum/reddit/master/cloudsearch/cloudsearch_reference.html">help</a>)';   // thanks to /u/interiot for the wonderful page on cloudsearch syntax!
    var info = restricts.item(i);
    var parent = info.parentNode;
    parent.insertBefore(div, info);

    // because some of the #moresearchinfo styles only trigger if there's a LABEL directly before it, we need to add those back manually. Hax :(
    // in the case of the search not being on the sidebar, we also need to check to see if any BRs need to be added for layout purposes.
    info.style.borderTopWidth = "1px";
    if (parent.id == "searchexpando") {   // sidebar
      info.style.marginTop = "0px";
    }
    else {
      var br = document.querySelector("form#search br");
      if (!br) {
        // add a couple
        parent.insertBefore(document.createElement("br"), div);
        parent.insertBefore(document.createElement("br"), div);
      }
    }

    // we also need to fix the tabindex
    var form = parent;
    if (parent.id == "searchexpando") { form = parent.parentNode; }   // sidebar

    var el;
    el = form.querySelector('input[name="restrict_sr"]');
    if (!el) { el = parent.querySelector('input[name="q"]'); }
    if (el) {
      var tabnum = parseInt(el.tabIndex);

      var tabbedelements = document.querySelectorAll("*[tabindex]");
      for (var j = 0; j < tabbedelements.length; j++) {
        var tabbedel = tabbedelements.item(j);
        if (tabbedel.tabIndex > tabnum) { tabbedel.tabIndex++; }
      }

      div.querySelector("input").tabIndex = tabnum + 1;
    }
  }

  // we need to add the cloudsearch flag to the 'too many results? narrow it down!' links.
  if (cloudsearched) {
    var facets = document.querySelectorAll("div.content > div.searchfacets li.searchfacet a.facet");
    for (var i = 0; i < facets.length; i++) {
      facets.item(i).href += "&syntax=cloudsearch";
    }
  }

  // The error message:
  //    I couldn't understand your query, so I simplified it and ...
  // is misleading.  Replace it with something more clear.
  var errormsg = document.querySelector("div.infobar div.md > p");
  if (errormsg && cloudsearched) {
    var results = errormsg.innerHTML.match(/^I couldn't understand your query, so I simplified it and searched for "(.*)" instead\./);
    if (results) {
      errormsg.innerHTML = 'Cloudsearch syntax error. (<a href="https://cdn.rawgit.com/DeeNewcum/reddit/master/cloudsearch/cloudsearch_reference.html">Need help?</a>) The non-Cloudsearch search results for "' + results[1] + '" are below, but that\'s probably not what you wanted.';
    }
  }
})();
