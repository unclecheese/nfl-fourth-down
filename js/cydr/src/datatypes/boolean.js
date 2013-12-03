define(['./datatype'], function(DataType) {
  
  "use strict";
  
  var Bool = DataType.extend({

    _className: "Boolean",

    Nice: function () {
      return this.getValue() ? "Yes" : "No";
    },

    isFalsy: function () {
      return !this.getValue();
    },

    renderSortable: function () {
      return parseInt(this._value);
    },

    getValue: function () {
      if ((this._value === 1) || (this._value === "1") || (this._value === true)) {
        return true;
      }
      return false;
    }

  });

  return Bool;
});