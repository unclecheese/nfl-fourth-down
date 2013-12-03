define(["cydr"], function(Cydr) {

    TestApp = Cydr.ViewModel.extend({

      _className : "TestApp",

      properties: {
        FirstName: "Text",
        LastName: "Text",
        IsMember: "Boolean",
        CategoryFilter: "Text"
      },

      has_many: {
        Todos: "Todo",
        Categories: "Category"
      },


      defaults: {
        FirstName: "",
        LastName: "Macho"
      },


      FullName: function () {
        return this.get('FirstName') + " " + this.get('LastName');
      },

      createTodo: function (formData) {
        this.get("Todos").push(new Todo(formData));
      },

      createCategory: function (formData) {
        this.get("Categories").push(new Category(formData));
      },

      FilteredTodos: function () {
        if (this.get("CategoryFilter").length) {
          var result = this.Todos().get().filter("Category", this.get("CategoryFilter"));
          return result;
        }
        return this.Todos().get();
      },

      CompetedTodos: function () {
        return this.Todos().get().filter("IsDone", true);
      }


    });


    Todo = Cydr.Model.extend({

      _className: "Todo",

      properties: {
        Title: "Text",
        IsDone: "Boolean",
        Category: "Text"
      },

      defaults: {
        Title: "New todo"
      },

      Status: function () {
        return this.get("IsDone") ? "done" : "open";
      },

      Categories: function () {
        return App.get("Categories");
      }
    });


    Category = Cydr.Model.extend({

    _className: "Category",

      properties: {
        Title: "Text"
      },
    });

    return {
        App: TestApp,
        Todo: Todo,
        Category: Category
    };

});