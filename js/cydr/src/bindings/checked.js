define(['./binding'], function(Binding) {
  
  "use strict";
  
  var CheckedBinding = Binding.extend({

    _className: "CheckedBinding",

    allowedTags: ["INPUT"],

    exportValueEvent: "change",

    isCheckbox: function () {
      return this.element.type === "checkbox";
    },

    isRadio: function () {
      return this.element.type === "radio";
    },

    importValue: function () {
      var v = this.getValue();
      var checked = (this.isCheckbox()) ? ((v && v.isDataType) && (!v.isFalsy())) : (v.toString() === this.element.value);
      if(checked) {
        this.element.setAttribute("checked", "checked");
      } else {
        this.element.removeAttribute("checked");
      }
    },

    exportValue: function () {
      var value = this.isCheckbox() ? this.element.checked : this.element.value;
      this.model.set(this.bindingExec, value);
    }

  });

  return CheckedBinding;
});