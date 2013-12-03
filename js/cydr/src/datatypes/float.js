define(['./datatype'], function(DataType) {

  "use strict";

  var Float = DataType.extend({

    _className: "Float",

    Nice: function () {
      return this.getValue().toFixed(2);
    },

    Round: function () {
      return Math.round(this.getValue());
    },

    isFalsy: function () {
      return !this.getValue() && this.getValue() !== 0;
    },

    renderSortable: function () {
      return parseFloat(this._value);
    },

    getValue: function () {
      var v = parseFloat(this._value);
      return isNaN(v) ? 0 : v;
    }
  });

  return Float;
});