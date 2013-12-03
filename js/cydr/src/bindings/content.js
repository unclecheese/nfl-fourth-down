define(['./binding'], function(Binding) {

	"use strict";

	var ContentBinding = Binding.extend({

	  _className: "ContentBinding",

	  importValue: function () {
	    this.element.innerHTML = this.getValue();
	  }

	});

	return ContentBinding;
})