define(['../../model/model','../../core/core','../binding'], function(Model, Core, Binding) {
  
  "use strict";
  
  var JSONBinding = Binding.extend({

    _className: "JSONBinding",

    subscribe: function() {
      if(!this.model.isAnalysedExpression(this.bindingExec)) {
        var b = this.bindingExec;
        this.model.subscribeToEvent("ModelAccessed", function (evt, type, model, prop, id) {
          this.pushConfig("analysedExpressions", b, model+":"+prop+":"+id);
        });
        Model.prototype.frozen = true;
        var obj = this.executeBindingExpression();
        if(typeof obj !== "object") {
          console.error(this.getClass() + " binding must return a JSON object of classname: property/function pairs.");
          return;
        }
        Core.Utils.forEach(obj, function(className, prop) {
          if(typeof prop == "function") {
            prop();
          }
          else {
            this.model.exec(prop);
          }
        }, this);
        Model.prototype.frozen = false;
        this.model.revokeSubscription("ModelAccessed");
      }
      var result = this.model.getDependenciesForExpression(this.bindingExec);
      if(result) {
        for(var i in result) {
          var dependency = result[i];
          var parts = dependency.split(":");
          Core.EventDispatcher.subscribe("ModelUpdated:"+this.model.getClass()+":"+parts[1]+":"+this.model.getID(), this, function() {
            this.importValue();
          });
        }
      }
    }
  });

  return JSONBinding;
});