// author      Sophie Hamilton (/u/Sophira)


addModule('cloudsearch', function(module, moduleID) {
	module.moduleName = 'Cloudsearch syntax';
	module.description = 'Allows use of Cloudsearch syntax for searches';
	module.category = 'UI';

	options: {
		// any configurable options you have go here...
		// options must have a type and a value..
		// valid types are: text, boolean (if boolean, value must be true or false)
	},

	include: [
		'all'
	],

	isEnabled: function() {
		return RESConsole.getModulePrefs(this.moduleID);
	},

	isMatchURL: function() {
		// return RESUtils.isMatchURL(this.moduleID);
		return true;
	},

	go: function() {
		if ((this.isEnabled()) && (this.isMatchURL())) {
			var restricts = document.querySelectorAll('form#search div#moresearchinfo');
			for (var i = 0; i < restricts.length; i++) {
				var checked="false";
				var qs = new QueryString();
				var cs = qs.value("syntax");
				if (cs == "cloudsearch") {
					checked = " checked";
				}

				var div = document.createElement("div");
				div.innerHTML = '<label><input name="syntax" value="cloudsearch" type="checkbox"' + checked + '>use cloudsearch syntax</label> (<a href="https://cdn.rawgit.com/DeeNewcum/reddit/master/cloudsearch/cloudsearch_reference.html">help</a>)';		// thanks to /u/interiot for the wonderful page on cloudsearch syntax!
				var info = restricts.item(i);
				var parent = info.parentNode;
				parent.insertBefore(div, info);

				// because some of the #moresearchinfo styles only trigger if there's a LABEL directly before it, we need to add those back manually. Hax :(
				// in the case of the search not being on the sidebar, we also need to check to see if any BRs need to be added for layout purposes.
				info.style.borderTopWidth = "1px";
				if (parent.id == "searchexpando") {		// sidebar
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
				if (parent.id == "searchexpando") { form = parent.parentNode; }		// sidebar

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
		}
	}
}
