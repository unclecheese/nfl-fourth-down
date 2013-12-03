define(['../../core/core','./json'], function(Core, JSONBinding) {
  
  "use strict";
  
  var ExtraclassesBinding = JSONBinding.extend({

    _className: "ExtraclassesBinding",

    importValue: function () {
      Core.Utils.forEach(this.executeBindingExpression(), function (cssClass, exec) {
        var rx = new RegExp("(^|\\s)" + cssClass, "g");
        var newClass = this.element.className.replace(rx, "");        
        var result = (typeof exec == "function") ? exec() : exec;
        if(result === undefined || (!result.isDataType && result !== true && result !== false)) { return; }
        if (result === true || (result.isDataType && !result.isFalsy())) {
          this.element.className += this.element.className.length ? " " + cssClass : cssClass;
        } else {
          this.element.className = newClass;
        }

      }, this);
    }
  });

  return ExtraclassesBinding;
});