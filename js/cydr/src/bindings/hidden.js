define(['./display'], function(DisplayBinding) {

	"use strict";

	var HiddenBinding = DisplayBinding.extend({

	  _className: "HiddenBinding",

	  importValue: function () {
	  	var v = this.getValue();
	    if (!v || v.isDataType && v.isFalsy()) {
	      this.show(this.element);
	    } else {
	      this.hide(this.element);
	    }
	  }

	});

	return HiddenBinding;
});