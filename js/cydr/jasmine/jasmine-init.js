define([
    "../jasmine/vendor/jasmine/jasmine.js",
    "../jasmine/vendor/jasmine/jasmine-html.js",
    "../jasmine/vendor/jquery/jquery.js",
    "../jasmine/lib/jasmine-jquery.js",
    "../jasmine/spec.js"
], function() {
      var JasmineTest = {};
      JasmineTest.jasmineEnv = jasmine.getEnv();
      JasmineTest.jasmineEnv.updateInterval = 1000;

      var htmlReporter = new jasmine.HtmlReporter();

      JasmineTest.jasmineEnv.addReporter(htmlReporter);

      JasmineTest.jasmineEnv.specFilter = function(spec) {
        return htmlReporter.specFilter(spec);
      };

      JasmineTest.execJasmine = function () {
        JasmineTest.jasmineEnv.execute();
      }

      return JasmineTest;
});
