define(['../../core/core','./json'], function(Core, JSONBinding) {

  "use strict";

  var AttrBinding = JSONBinding.extend({

    _className: "AttrBinding",

    importValue: function () {
      if (typeof this.getValue() != "object") {
        console.error(this.getClass() + " binding must return a JSON object of attribute-name: property/function pairs.");
      }
      Core.Utils.forEach(this.getValue(), function (attribute, exec) {
        if (typeof exec == "function") {
          this.element.setAttribute(attribute, exec());
        }
      }, this);
    }

  });

  return AttrBinding;
});