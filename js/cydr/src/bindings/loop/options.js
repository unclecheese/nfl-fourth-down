define(['../../core/core','./loop'], function(Core, LoopBinding) {
  
  "use strict";
  
  var OptionsBinding = LoopBinding.extend({

    _className: "OptionsBinding",

    valueField: null,

    textField: null,

    caption: null,

    collection: null,


    initialize: function () {
      if (this.element.tagName != "SELECT") {
        console.error("cydr-options binding must be on a select element.");
      }

      this.valueField = this.element.getAttribute("cydr-optionvalue");
      this.textField = this.element.getAttribute("cydr-optiontext");
      this.caption = this.element.getAttribute("cydr-optioncaption");

      // ensure the value attribute goes last
      var v = this.element.getAttribute("cydr-value");
      if (v) {
        this.element.removeAttribute("cydr-value");
        this.element.setAttribute("cydr-value", v);
      }
      this.subscribe();
      this.importValue();

    },


    importValue: function () {
      this.clearContents();
      var val = this.element.getAttribute("cydr-value");
      if(!val) {
        console.error("cydr-options binding assigned to an element with no cydr-value binding", this.element);
      }
      if (this.caption) {
        var dummy = document.createElement("option");
        dummy.setAttribute("value", "");
        dummy.innerHTML = this.caption;
        this.element.appendChild(dummy);
      }
      var list = this.executeBindingExpression();
      var self = this;
      var originalOptions = self.element.childNodes;
      list.each(function (model) {
        var opt = document.createElement("option");
        opt.setAttribute("cydr-content", self.textField);
        opt.setAttribute("cydr-attr", "{value: " + self.valueField + "}");
        var val1 = model.exec(self.valueField);
        var val2 = self.model.exec(val);

        if (val1.isDataType && val2.isDataType && (val1.getValue() == val2.getValue())) {
          opt.setAttribute("selected", true);
        }
        self.element.appendChild(opt);
        model.applyBindingsToNode(opt, self);
      });
    }
  });

  return OptionsBinding;
});
