define(['./datatype'], function(DataType) {

	"use strict";
	
	var Text = DataType.extend({

	  _className: "Text",

	  LimitCharacterCount: function (count) {
	    return this.getValue().substring(0, count);
	  },

	  toString: function () {
	    if (this.getValue()) {
	      return this.getValue().toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	    }
	    return "";
	  },

	  renderSortable: function () {
	    return this._value.toUpperCase();
	  }

	});

	return Text;
});
