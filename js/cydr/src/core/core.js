define([], function() {

  "use strict";
  
  var Core = {};

  Core.Config = {};

  Core.Utils = {

    inArray: function (needle, heystack) {
      for (var i in heystack) {
        if (heystack[i] == needle) {
          return true;
        }
      }

      return false;
    },

    forEach: function (arr, cb, context) {
      for (var i in arr) {
        var result = cb.apply(context ? context : window, [i, arr[i]]);
        if (result === false) break;
      }
    }
  };


  Core.EventDispatcher = {

    events: [],

    fire: function (sku) {
      var parts = sku.split(":");
      var type = parts[0];
      var model = parts[1];
      var prop = parts[2];
      var id = parts[3];
      var evt = [];
      for(var i in parts) {
        var part = parts[i];
        evt.push(part);
        var e = evt.join(":");
        var subscribers = (Core.EventDispatcher.events[e]) || [];
        Core.Utils.forEach(subscribers, function(listenerID, func) {
          if(prop == "CategoryFilter") {
            console.log("firing", e);
          }
          func(e, type, model, prop, id);
        });
      }
    },



    subscribe: function (sku, listener, func) {
      if(!Core.EventDispatcher.events[sku]) {
        Core.EventDispatcher.events[sku] = []
      }
      Core.EventDispatcher.events[sku]["listener_"+listener.__ID__] = func.bind(listener);
    },

    revoke: function (sku, listener) {
      delete Core.EventDispatcher.events[sku]["listener_"+listener.__ID__];
      if(Core.EventDispatcher.events[sku].length === 0) {
        delete Core.EventDispatcher.events[sku];
      }
    }


  };

  return Core;
});