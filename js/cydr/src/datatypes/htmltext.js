define(['./datatype'], function(DataType) {
	
	"use strict";
	
	var HTMLText = DataType.extend({

	  _className: "HTMLText",

	  toString: function () {
	    return this.getValue();
	  },

	  renderSortable: function () {
	    return this._value.toUpperCase();
	  }

	});

	return HTMLText;
});