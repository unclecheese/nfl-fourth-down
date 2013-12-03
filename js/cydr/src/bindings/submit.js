define(['./binding'], function(Binding) {
  
  "use strict";

  var SubmitBinding = Binding.extend({

    _className: "SubmitBinding",

    allowedTags: ["FORM"],

    initialize: function () {
      var self = this;
      this.element.addEventListener("submit", function (e) {
        e.preventDefault();
        var formData = window.form2object(this.element);
        var func = this.bindingExec;
        if (typeof this.model[func] == "function") {
          this.model[func](formData);
        }
      })
      this._super();
    },

    subscribe: function () {
      return;
    }
    
  });

  return SubmitBinding;
});