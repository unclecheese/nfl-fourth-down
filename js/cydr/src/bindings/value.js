define(['../core/core','./binding'], function(Core, Binding) {

  "use strict";

  var ValueBinding = Binding.extend({

    _className: "ValueBinding",

    allowedTags: ["INPUT", "SELECT"],

    exportValueEvent: "change",

    importValue: function () {
      if (this.element.tagName == "INPUT") {
        this.element.value = this.getValue();
      } else if (this.element.tagName == "SELECT") {
        Core.Utils.forEach(this.element.options, function (key, opt) {
          if (opt.value == this.getValue().toString()) {
            opt.selected = true;
            return false;
          }
        }, this);
      }
    },

    exportValue: function () {
      if (this.element.tagName == "INPUT") {
        this.model.set(this.bindingExec, this.element.value);
      } else if (this.element.tagName == "SELECT") {
        var val = this.element.options[this.element.selectedIndex] ? this.element.options[this.element.selectedIndex].getAttribute("value") : "";
        this.model.set(this.bindingExec, val);
      }
    }

  });

  return ValueBinding;
});