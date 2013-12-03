require(['../jasmine/testclasses'], function(Classes) {

  var App, Todo, Category;

  describe("Unit tests", function () {


    it("Sets properties", function () {
      App.set("FirstName", "Joe");
      expect(App.get("FirstName")).toEqual("Joe");
    });




    it("Applies default values", function () {
      expect(App.get("LastName")).toEqual("Macho");
    });




    it("Adds to collections", function () {
      App.get("Todos").push(new Todo({
        Title: "Todo1",
        IsDone: false,
        Category: "One"
      }));
      expect(App.Todos().count()).toEqual(1);
    });




    it("Will assert that a property doesn't exist", function () {
      expect(App.hasProp("garbage")).toBeFalsy();
      expect(App.hasProp("FirstName")).toBeTruthy();
    });




    it("Will assert that a collection doesn't exist", function () {
      expect(App.hasCollection("garbage")).toBeFalsy();
      expect(App.hasCollection("Todos")).toBeTruthy();
    });




    it("Creates methods for every collection and property", function () {
      expect(typeof App.LastName).toEqual("function");
      expect(typeof App.Todos).toEqual("function");
      expect(App.LastName().toString()).toEqual("Macho");
      expect(App.Todos().getClass()).toEqual("Collection");
    });




    it("Allows custom getters", function () {
      App.set("FirstName", "Joe");
      expect(App.FullName()).toEqual("Joe Macho");
    });


  });

  describe("Integration tests", function () {

    describe("Bindings", function () {


      it("Has a functioning 'content' binding", function () {
        App.set("FirstName", "Joe");
        expect($("[cydr-content='FirstName']").html()).toEqual("Joe");
      });




      it("Has a two-way 'value' binding", function () {
        var e;

        App.set("FirstName", "Bob");
        expect($("input[cydr-value='FirstName']").val()).toEqual("Bob");
        expect($("[cydr-content='FirstName']").html()).toEqual("Bob");
        e = document.createEvent("HTMLEvents");
        e.initEvent("change");
        $("input[cydr-value='FirstName']").val("Roger")[0].dispatchEvent(e);
        $("[cydr-content='FirstName']").each(function () {
          expect($(this).html()).toEqual("Roger");
        });
        expect(App.get("FirstName")).toEqual("Roger");
      });




      it("Has a two-way 'checked' binding", function () {
        var e;

        App.set("IsMember", true);
        expect($("input[cydr-checked='IsMember']")).toBeChecked();
        e = document.createEvent("HTMLEvents");
        e.initEvent("change");
        $("input[cydr-checked='IsMember']").attr("checked", false)[0].dispatchEvent(e);
        expect(App.get("IsMember")).toBeFalsy();
      });




      it("Has an extra classes binding", function () {
        App.set("IsMember", true);
        expect($('#extraclass').hasClass("ismember")).toBeTruthy();
        App.set("IsMember", false);
        expect($('#extraclass').hasClass("ismember")).toBeFalsy();
      });




      it("Has an attribute binding", function () {
        App.set("FirstName", "Paul");
        expect($('#attribute').attr("href")).toEqual("Paul");
      });




      it("Has a click binding", function () {
        var e;

        e = document.createEvent("MouseEvents");
        e.initEvent("click");
        $('[cydr-click]')[0].dispatchEvent(e);
        expect(App.get("FirstName")).toEqual("Susan");
      });




      it("Has a visible binding", function () {
        App.set("IsMember", true);
        expect($('[cydr-visible]')).toBeVisible();
        App.set("IsMember", false);
        expect($('[cydr-visible]')).toBeHidden();
      });




      it("Has a hidden binding", function () {
        App.set("IsMember", true);
        expect($('[cydr-hidden]')).toBeHidden();
        App.set("IsMember", false);
        expect($('[cydr-hidden]')).toBeVisible();
      });




      it("Has an options binding", function () {
        App.get("Categories").push(new Category({
          Title: "One"
        }));
        App.get("Categories").push(new Category({
          Title: "Two"
        }));
        expect($('#optionsbinding option')).toHaveLength(2);
      });



      describe("Loops", function () {


        it("Will loop through a collection", function () {
          App.get("Todos").push(new Todo({
            Title: "Todo2",
            IsDone: false,
            Category: "One"
          }));
          App.get("Todos").push(new Todo({
            Title: "Todo3",
            IsDone: true,
            Category: "Two"
          }));
          expect($('#todoloop > li')).toHaveLength(3);
        });



        it("Will apply bindings to nodes in a loop", function () {
          var $todo4, $todo5;
          App.get("Todos").push(new Todo({
            Title: "Todo4",
            IsDone: false,
            Category: "One"
          }));
          App.get("Todos").push(new Todo({
            Title: "Todo5",
            IsDone: true,
            Category: "One"
          }));
          $todo4 = $('#todoloop > li').eq(3);
          $todo5 = $('#todoloop > li').eq(4);
          expect($todo4.find('span[cydr-content]').html()).toEqual("Todo4");
          expect($todo4.hasClass("done")).toBeFalsy();
          expect($todo5.find('input')).toBeChecked();
          expect($todo5.find('span[cydr-content]').html()).toEqual("Todo5");
          expect($todo5).toHaveClass("done");
        });
      });




      describe("Binding expressions", function () {



        it("Can apply a custom getter with two properties", function () {
          App.set("FirstName", "Andrew");
          App.set("LastName", "Hore");
          expect($('#fullname').text()).toEqual("Andrew Hore");
        });




        it("Can count collections", function () {
          App.get("Todos").push(new Todo({
            Title: "Todo6",
            IsDone: false,
            Category: "Two"
          }));

          expect($('#todocount').text()).toEqual("6");

        });
      });
    });
  });


  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;

  var htmlReporter = new jasmine.HtmlReporter();

  jasmineEnv.addReporter(htmlReporter);

  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };


  $(function() {
    App = new Classes.App("#spec");
    Todo = Classes.Todo;
    Category = Classes.Category;
    jasmineEnv.execute();
  });




});

