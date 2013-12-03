define(['../core/object'], function(CydrObject) {
  
  "use strict";
  
  var DataType = CydrObject.extend({

    _className: "DataType",

    _value: "",

    isDataType: true,

    __construct: function (val) {
      this._super();
      this._value = val || "";
    },

    setValue: function (val) {
      this._value = val;
    },

    getValue: function () {
      return this._value;
    },

    isFalsy: function () {
      if (!this._value || this._value === "undefined") {
        return true;
      }
      return this._value.length === 0;
    },

    toString: function () {
      return this.getValue();
    },

    renderSortable: function () {
      return this._value;
    }
  });

  return DataType;
});