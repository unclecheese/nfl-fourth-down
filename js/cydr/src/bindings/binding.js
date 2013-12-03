define(['../core/core','../core/object','../model/model'], function(Core, CoreObject, Model) {
  
  "use strict";
  
  var Binding = CoreObject.extend({

    _className: "Binding",

    isDataBinding: true,

    bindingAttribute: "",

    bindingExec: null,

    element: null,

    model: null,

    exportValueEvent: null,

    importFunction: null,

    allowedTags: [],

    parent: null,

    __construct: function (model, element, parent) {
      this._super();
      this.element = element;
      this.model = model;
      this.attValue = this.element.getAttribute(this.getBindingAttribute());
      this.bindingExec = this.attValue;
      this.parent = parent;
    },


    initialize: function () {
      if (this.allowedTags.length && !Core.Utils.inArray(this.element.tagName, this.allowedTags)) {
        console.error(this.getBindingAttribute() + "binding must be on one of the following tags: " + this.allowedTags.join(',') + ".");
      }
      if (this.exportValueEvent) {
        var self = this;
        this.element.addEventListener(this.exportValueEvent, function () {
          self.exportValue();
        });
      }
      this.element.setAttribute("title", "ID: " + this.model.getID());
      this.subscribe();
      this.importValue();
    },

    importValue: function () {},

    exportValue: function () {},

    subscribe: function () {
      if (this.model.hasProp(this.bindingExec) || this.model.hasCollection(this.bindingExec)) {
        var evt = "ModelUpdated:" + this.model.getClass() + ":" + this.bindingExec + ":" + this.model.getID();
        var t = (this.element.getAttribute("title")) || "";
        this.element.setAttribute("title", t + "//" + evt);
        Core.EventDispatcher.subscribe(evt, this, function () {
          this.importValue();
        });
      } else if (!this.model.isAnalysedExpression(this.bindingExec)) {
        var b = this.bindingExec;
        this.model.subscribeToEvent("ModelAccessed", function (evt, type, model, prop, id) {
          this.pushConfig("analysedExpressions", b, model+":"+prop+":"+id);
        });
        Model.prototype.frozen = true;
        this.executeBindingExpression();
        Model.prototype.frozen = false;
        this.model.revokeSubscription("ModelAccessed");
      }

      var result = this.model.getDependenciesForExpression(this.bindingExec);
      if (result) {
        Core.Utils.forEach(result, function (key, val) {
          var parts = val.split(":");
          var evt = "ModelUpdated:" + parts[0] + ":" + parts[1] + ":" + parts[2];
          var t = (this.element.getAttribute("title")) || "";
          this.element.setAttribute("title", t + "//" + evt);
          Core.EventDispatcher.subscribe(evt, this, function () {
            this.importValue();
          });
        }, this);
      }
    },

    getBindingAttribute: function () {
      var klass = this.getClass().replace(/Binding$/, '');
      return "cydr-" + klass.toLowerCase();
    },


    create: function (model, element) {
      return new Core[this.getClass()](model, element);
    },


    executeBindingExpression: function () {
      return this.model.exec(this.bindingExec, this);
    },


    getValue: function () {
      return this.executeBindingExpression();
    },


  });


  return Binding;

});
