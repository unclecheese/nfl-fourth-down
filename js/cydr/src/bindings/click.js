define(['./binding'], function(Binding) {

	"use strict";

	var ClickBinding = Binding.extend({

	  _className: "ClickBinding",

	  initialize: function () {
	    var self = this;
	    this.element.addEventListener("click", function (e) {
	      e.preventDefault();
	      self.executeBindingExpression();
	    });
	    this._super();
	  },

	    subscribe: function () {
	    	return;
	    },


	});


	return ClickBinding;
});