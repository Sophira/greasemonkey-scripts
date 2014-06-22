// ==UserScript==
// @name        Global: Turn compatible "Title" dropdowns into text boxes
// @namespace   http://theblob.org/
// @include     *
// @version     1
// @grant       none
// ==/UserScript==

(function() {
  // this addon works by analysing dropdowns for common titles, below:
  var commontitles = ["Mr", "Mrs", "Miss", "Ms", "Dr", "Mx", "Rev", "Reverend", "Lord", "Sir", "Lady"];

  // if this many of the above titles appear in the dropdown:
  var titlethreshold = 3;
  // *and* the form is set up such that the title is sent via text and
  // not a number, then replace it with a text box and list the old choices.

  // =====

  var dropdowns = document.getElementsByTagName("select");
  for (var i = 0; i < dropdowns.length; i++) {
    var dropdown = dropdowns.item(i);
    // analyse the dropdown
	var options = dropdown.options;
	var values = [];
	var foundtitles = 0;
	for (var j = 0; j < options.length; j++) {
	  var opt = options.item(j);
	  values.push(opt.value);
	  var moddedval = opt.value.replace(/\.$/, "");
	  var moddedtext = opt.textContent.replace(/\.$/, "");
	  if ((commontitles.indexOf(moddedval) >= 0) && ((moddedtext == moddedval))) {
	    // found a match
		foundtitles++;
	  }
	}
	if (foundtitles >= titlethreshold) {
	  // looks like a compatible title dropdown
	  var newDiv = document.createElement("div");
//	  newDiv.appendChild(newTextBox);
      newDiv.innerHTML = "<small>This title dropdown looks textbox-compatible.</small><br>";
	  newDiv.style.fontWeight = "bold";
	  var link = document.createElement("a");
	  link.innerHTML = "Replace this dropdown with a textbox.";
	  link.href = "#";
	  link.setAttribute("X-Detected-Values", "\"" + values.join("\", \"") + "\"");
	  link.addEventListener("DOMActivate", function(e) {
		var me = e.target;
	    var mydiv = me.parentNode;
		var dropdown = mydiv.previousSibling;
		var titles = me.getAttribute("X-Detected-Values");
		var selected = dropdown.options.item(dropdown.selectedIndex).value;

	    var attrs = dropdown.attributes;
	    var newTextBox = document.createElement("input");
	    for (var k = 0; k < attrs.length; k++) {
 	      var attr = attrs.item(k);
	      newTextBox.setAttribute(attr.name, attr.value);
	    }
	    newTextBox.setAttribute("type", "text");
		newTextBox.value = selected;
		dropdown.parentNode.replaceChild(newTextBox, dropdown);

		mydiv.innerHTML = "<small>Replaced title dropdown. The old choices were:<br> " + titles + "</small>";
/*
	  var newDiv = document.createElement("div");
	  newDiv.appendChild(newTextBox);
	  newDiv.appendChild(document.createElement("br"));
	  var small = document.createElement("small");
	  small.style.fontWeight = "bold";
	  small.appendChild(document.createTextNode("Auto-replaced title dropdown. The old titles were:"));
	  small.appendChild(document.createElement("br"));
	  small.appendChild(document.createTextNode("\"" + foundtitles.join("\", \"") + "\""));
	  newDiv.appendChild(small);
	  dropdown.parentNode.replaceChild(newDiv, dropdown);
*/
	    e.stopPropagation();
		e.preventDefault();
	  }, false);
	  newDiv.appendChild(link);
	  dropdown.parentNode.insertBefore(newDiv, dropdown.nextSibling);
/*
	  
	  var attrs = dropdown.attributes;
	  var newTextBox = document.createElement("input");
	  for (var k = 0; k < attrs.length; k++) {
	    var attr = attrs.item(k);
	    newTextBox.setAttribute(attr.name, attr.value);
	  }
	  newTextBox.setAttribute("type", "text");
	  var newDiv = document.createElement("div");
	  newDiv.appendChild(newTextBox);
	  newDiv.appendChild(document.createElement("br"));
	  var small = document.createElement("small");
	  small.style.fontWeight = "bold";
	  small.appendChild(document.createTextNode("Auto-replaced title dropdown. The old titles were:"));
	  small.appendChild(document.createElement("br"));
	  small.appendChild(document.createTextNode("\"" + foundtitles.join("\", \"") + "\""));
	  newDiv.appendChild(small);
	  dropdown.parentNode.replaceChild(newDiv, dropdown);
*/	  
	}
  }
})();
