define(['./model'], function(Model) {
	
	"use strict";
	
	var ViewModel = Model.extend({

	  _className: "ViewModel",

	  __construct: function (selector) {
	    this._super();
	    var node = document.querySelector(selector);
	    if (node) {
	      this.applyBindingsToNode(node);
	    }
	  }
	});

	return ViewModel;
});
