define(['./display'], function(DisplayBinding) {

	"use strict";

	var VisibleBinding = DisplayBinding.extend({

	  _className: "VisibleBinding",

	  importValue: function () {
	  	var v = this.getValue();
	    if (!v || (v.isDataType && v.isFalsy())) {
	      this.hide(this.element);
	    } else {
	      this.show(this.element);
	    }
	  }
	});

	return VisibleBinding;
});