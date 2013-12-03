define(function(require, exports, module) {

	"use strict";

	var Cydr = {};

	Cydr.Collection 			= require('./model/collection');
	Cydr.Model 					= require('./model/model');
	Cydr.DataList 				= require('./model/datalist');
	Cydr.ViewModel 				= require('./model/viewmodel');
	Cydr.JSONData 				= require('./model/jsondata');

	Cydr.Boolean				= require('./datatypes/boolean');
	Cydr.HTMLText 				= require('./datatypes/htmltext');
	Cydr.Text	 				= require('./datatypes/text');
	Cydr.Float	 				= require('./datatypes/float');
	Cydr.Int	 				= require('./datatypes/int');

	Cydr.CheckedBinding 		= require('./bindings/checked');
	Cydr.ClickBinding 			= require('./bindings/click');
	Cydr.ContentBinding 		= require('./bindings/content');
	Cydr.HiddenBinding 			= require('./bindings/hidden');
	Cydr.VisibleBinding 		= require('./bindings/visible');
	Cydr.SubmitBinding 			= require('./bindings/submit');
	Cydr.ValueBinding 			= require('./bindings/value');
	Cydr.AttrBinding 			= require('./bindings/json/attr');
	Cydr.ExtraclassesBinding 	= require('./bindings/json/extraclasses');
	Cydr.LoopBinding 			= require('./bindings/loop/loop');
	Cydr.OptionsBinding 		= require('./bindings/loop/options');

	Cydr.Model.Cydr = Cydr;
	Cydr.Model.Collection = Cydr.Collection;
	Cydr.Collection.Model = Cydr.Model;

	return Cydr;

});