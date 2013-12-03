define(['./base','./core'], function(Class, Cydr) {

  "use strict";
  
  var CydrObject = Class.extend({

    _instanceCount: 0,

    __ID__: null,

    _className: "CydrObject",

    __construct: function() {
      CydrObject.prototype._instanceCount++;
      this.__ID__ = CydrObject.prototype._instanceCount;
    },

    getClass: function() {
      return this._className;
    },


    getID: function() {
      return this.__ID__;
    },

    getConfig: function (prop, key) {
      if(!Cydr.Config[this.getClass()]) {
        Cydr.Config[this.getClass()] = []
      }
      if(key) {
        if(!Cydr.Config[this.getClass()][prop]) {
          Cydr.Config[this.getClass()][prop] = []
        }
        return Cydr.Config[this.getClass()][prop][key];
      }

      return Cydr.Config[this.getClass()][prop];
    },


    setConfig: function (prop, val) {
      if(!Cydr.Config[this.getClass()]) {
        Cydr.Config[this.getClass()] = []
      }
      Cydr.Config[this.getClass()][prop] = val;
    },

    pushConfig: function (prop, val1, val2) {
      if(!Cydr.Config[this.getClass()]) {
        Cydr.Config[this.getClass()] = [];
      }
      if(!Cydr.Config[this.getClass()][prop]) {
        Cydr.Config[this.getClass()][prop] = [];
      }
      if(val2) {
        if(!Cydr.Config[this.getClass()][prop][val1]) {
          Cydr.Config[this.getClass()][prop][val1] = [];
        }
        Cydr.Config[this.getClass()][prop][val1].push(val2);
      }

      else {
        Cydr.Config[this.getClass()][prop].push(val1);
      }
    }

  });

  return CydrObject;
});
