define(['./model','../core/core'], function(Model, Core) {
	
	"use strict";
	
	var JSONData = Model.extend({

	  _className: "JSONData",

	  __construct: function (json) {
	  	if(typeof json === "object") {
	  		Core.Utils.forEach(json, function(prop, val) {
	  			this.properties[prop] = "Text";
	  			this.defaults[prop] = val;
	  		}, this);
	  	}

	  	this._super();
	  }
	});

	return JSONData;
});
