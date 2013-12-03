define(['./model'], function(Model) {

	"use strict";

	var ViewModel = Model.extend({

	  _className: "ViewModel",

	  _selector: "body",

	  _onReady: null,

	  __construct: function (selector) {
	    this._selector = selector;
	    this._super();
	  },


	  onReady: function (func) {
	  	this._onReady = func;
	  },


	  run: function () {
	    var node = document.querySelector(this._selector);
	    if (node) {
	      this.applyBindingsToNode(node);
	      if(this._onReady) {
	      	this._onReady.call(this);
	      }
	    }
	  }
	});

	return ViewModel;
});
