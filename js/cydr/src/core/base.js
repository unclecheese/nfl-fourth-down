define([], function() {
  
  
  var initializing = false;
  var classCounter = 0;

  var fnTest = /xyz/.test(function () {
    var xyx;
  }) ? /\b_super\b/ : /.*/;


  var Class = function () {};

  Class.extend = function (prop) {
    var _super = this.prototype;
    var prototype;

    initializing = true;
    prototype = new this();
    initializing = false;

    for (var name in prop) {
      prototype[name] = (typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name])) ? (function (name, fn) {
        return function () {
          var tmp = this._super;
          this._super = _super[name];
          var ret = fn.apply(this, arguments);
          this._super = tmp;

          return ret;
        };
      })(name, prop[name]) : prop[name];
    }

    function Class() {
      if (!initializing && this.__construct)
        this.__construct.apply(this, arguments);
    }

    Class.prototype = prototype;
    Class.prototype._classIdentifier = "Class_" + classCounter;
    classCounter++;

    Class.prototype.constructor = Class;

    Class.extend = arguments.callee;

    return Class;

  };

  return Class;
});