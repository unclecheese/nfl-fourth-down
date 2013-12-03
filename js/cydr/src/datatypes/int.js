define(['./datatype'], function(DataType) {

	"use strict";

	var Int = DataType.extend({

	  _className: "Int",


	  renderSortable: function () {
	    return this._value;
	  },


      getValue: function () {
        var v = parseInt(this._value);
        return isNaN(v) ? 0 : v;
      }

	});

	return Int;
});
