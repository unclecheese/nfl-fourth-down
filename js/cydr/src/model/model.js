define(['../core/core','../datatypes/datatype','./collection','../core/object'],
function(Core, DataType, Collection, CydrObject) {

  "use strict";

  var Model = CydrObject.extend({

      _className: "Model",

      _mutatedProperties: {},

      _mutatedCollections: {},

      properties: {},

      has_many: {},

      defaults: {},

      casting: {},

      currentBinding: null,

      isModel: true,

      collection: null,

      viewModel: null,

      frozen: false,

      __construct: function (data) {

        this._super();
        this._mutatedProperties = {};
        this._mutatedCollections = {};
        Core.Utils.forEach(this.properties, function (name, type) {
          if (!Model.Cydr[type] || !Model.Cydr[type].prototype.isDataType) {
            throw new Error("DataType '" + type + "' does not exist!");
            return false;
          }
          this._mutatedProperties[name] = new Model.Cydr[type]();
          var f = new Function("value", "if(value !== undefined) {return this.set('" + name + "',value);} try {return this.obj('" + name + "');} catch(e) {console.error(e.message)}");
          this[name] = f.bind(this);
        }, this);

        Core.Utils.forEach(this.has_many, function (name, type) {
          this._mutatedCollections[name] = new Model.Collection(this, type, name);
          var f = new Function("try {return this.get('" + name + "');} catch(e) {console.error(e.message);}");
          this[name] = f.bind(this);
        }, this);

        Core.Utils.forEach(this.defaults, function (prop, val) {
          if(this.hasProp(prop)) {
            this._mutatedProperties[prop].setValue(val);
          }
        }, this);

        Core.Utils.forEach(data, function (prop, val) {
          if (this.hasProp(prop)) {
            this._mutatedProperties[prop].setValue(val);
          }
        }, this);

        this._mutatedProperties["__id__"] = CydrObject.prototype._instanceCount;
        this._mutatedProperties["__destroyed__"] = false;
    },


    getClass: function () {
      return this._className == "Model" ? this._classIdentifier : this._className;
    },

    set: function (prop, value) {
      if(Model.prototype.frozen) {return;}
      if(!this._mutatedProperties[prop]) {
        throw new Error("Property " + prop + " doesn't exist");
      }

      this._mutatedProperties[prop].setValue(value);
      this.notify(prop);
    },


    obj: function (prop) {
      Core.EventDispatcher.fire("ModelAccessed:"+this.getClass()+":"+prop+":"+this.getID());
      if ( (!this.hasProp(prop)) && (!this.hasCollection(prop)) && (typeof this[prop] == "function")) {
        return this[prop]();
      }

      var val = this._mutatedProperties[prop] || this._mutatedCollections[prop];
      if(val === undefined) {
        throw new Error(prop + " is not defined");
      }

      return val;
    },


    exec: function (exp, binding) {
      var ret = (this._mutatedProperties[exp]) || (this._mutatedCollections[exp]);
      if(ret) return ret;

      if (this[exp]) {
        return this[exp]();
      }

      if (this.getCachedExpression(exp)) {
        var func = this.getCachedExpression(exp);
        try {
          this.currentBinding = binding;
          var result = func(this, binding);
          this.currentBinding = null;
        } catch (e) {
          console.error("Could not run expression '" + func.toString() + "'");
          console.log(e.message);
          return new DataType("");
        }
        return result;
      }
    },


    getCachedExpression: function (exp) {
      if(!this.getConfig("cachedExpressions", exp)) {
        var body = "with(scope) { return "+exp+";  }";
        var f = new Function("scope", "binding", body);
        this.pushConfig("cachedExpressions", exp, f);
      }
      var ret = this.getConfig("cachedExpressions", exp);

      return ret[0];
    },


    isAnalysedExpression: function(exp) {
      return (this.getConfig("analysedExpressions", exp)) ? true : false;
    },

    getDependenciesForExpression: function (exp) {
      return this.getConfig("analysedExpressions", exp);
    },

    get: function (prop) {
      var val;

      if(this._mutatedProperties[prop]) {
        Core.EventDispatcher.fire("ModelAccessed:"+this.getClass()+":"+prop+":"+this.getID());
        val = this._mutatedProperties[prop].getValue();
      }
      else if(this._mutatedCollections[prop]) {
        Core.EventDispatcher.fire("ModelAccessed:"+this.getClass()+":"+prop+":"+this.getID());
        val = this._mutatedCollections[prop];
      }

      if(val === undefined) {
        console.log(this._mutatedProperties);
        throw new Error(prop + " does not exist");
      }

      return val;
    },

    castFunction: function (func) {
      if(!ret.isDataType && !ret.isDataList) {
        var dataType = this.casting[func] || "Text";
        if(typeof Model.Cydr[dataType] != "function") {
          console.error("Tried to cast "+func+" as "+dataType+", but that datatype doesn't exist.");
          return;
        }
        return new Model.Cydr[dataType](ret);
      }

      return ret;
    },


    hasProp: function (prop) {
      return this.properties.hasOwnProperty(prop);
    },


    hasCollection: function (collection) {
      return this.has_many.hasOwnProperty(collection);
    },


    getID: function () {
      return this._mutatedProperties["__id__"];
    },

    Up: function () {
      if(this.currentBinding && this.currentBinding.parent) {
        return this.currentBinding.parent.model;
      }
    },


    bindToElement: function (el, parentBinding) {
      var rx = new RegExp('^cydr-', 'i');
      var alpha = new RegExp('^[a-z0-9_]+$', 'i');
      var atts = el.attributes || []
      Core.Utils.forEach(atts, function (i, att) {
        if (rx.test(att.name)) {
          var type = att.name.split("-").pop();
          var klass = type.charAt(0).toUpperCase() + type.slice(1) + "Binding";
          if (typeof Model.Cydr[klass] == "function" && Model.Cydr[klass].prototype.isDataBinding) {
            var binding = new Model.Cydr[klass](this, el, parentBinding);
            binding.initialize();
          }
        }
      }, this);
    },


    applyBindingsToNode: function (node, parentBinding) {
      var stack = [node];
      var nl = node.getElementsByTagName("*") || [];
      var els = [];

      for (var n in nl) {
        els.push(nl[n]);
      }

      els.unshift(node);
      var rx = new RegExp('^cydr-', 'i');
      Core.Utils.forEach(els, function (i, el) {
        var atts = (el && el.attributes) ? el.attributes : [];
        if (el && typeof el.getAttribute == "function" && !el.getAttribute("cydr-ignore")) {
          for (var att in atts) {
            if (rx.test(atts[att].name)) {
              this.bindToElement(el, parentBinding);
              break;
            }
          }
        }
      }, this);
    },

    notify: function (prop) {
      Core.EventDispatcher.fire("ModelUpdated:" + this.getClass() + ":" + prop + ":" + this.getID());
      if (this.collection) {
        this.collection.notify();
      }
    },


    setCollection: function (collection) {
      this.collection = collection;
    },

    getCollection: function() {
      return this.collection;
    },

    delete: function () {
      this.collection.removeByID(this.getID());
    },

    getViewModel: function() {
      if(this.viewModel) return this.viewModel;

      var m = this;
      while(true) {
        if(!m.getCollection()) break;
        m = m.getCollection().getOwner();
      }
      this.viewModel = m;

      return this.viewModel;
    },

    subscribeToEvent: function(evt, func) {
      Core.EventDispatcher.subscribe(evt, this, func);
    },

    revokeSubscription: function(evt) {
      Core.EventDispatcher.revoke(evt, this);
    }
  });



  return Model;
});