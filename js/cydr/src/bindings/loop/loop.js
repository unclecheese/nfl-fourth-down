define(['../binding'], function(Binding) {

  "use strict";

  var LoopBinding = Binding.extend({

    _className: "LoopBinding",

    template: null,

    modelNodeMap: [],

    nodes: [],

    tag2holder: {
        "LI": "UL",
        "TR": "TBODY",
        "TBODY": "TABLE",
        "THEAD": "TABLE",
        "TFOOT": "TABLE",
        "TD": "TR",
        "TH": "TR",
        "DT": "DL",
        "DD": "DL"
    },


    __construct: function(model, element, parent) {
      this.modelNodeMap[this.getID()] = [];
      this.nodes[this.getID()] = [];
      this._super(model, element, parent);
    },


    initialize: function () {
      if(!this.getNodes() || this.getNodes().length === 0) {
        this.loadTemplate();
      }
      this._super();
    },


    getNodes: function() {
      return this.nodes[this.getID()];
    },


    addNode: function(node) {
      if(!this.nodes[this.getID()]) {
        this.nodes[this.getID()] = [];
      }
      this.nodes[this.getID()].push(node);
    },

    getCachedNodes: function(modelID) {
      if(!this.modelNodeMap[this.getID()]) {
        this.modelNodeMap[this.getID()] = [];
      }

      return this.modelNodeMap[this.getID()][modelID];
    },


    addCachedNode: function(modelID, node) {
      if(!this.modelNodeMap[this.getID()]) {
        this.modelNodeMap[this.getID()] = [];
      }
      if(!this.modelNodeMap[this.getID()][modelID]) {
        this.modelNodeMap[this.getID()][modelID] = [];
      }
      this.modelNodeMap[this.getID()][modelID].push(node);
    },

    loadTemplate: function () {
      var n, i, nodes, dummy, holderElement;      

      var nodeList = this.element.getElementsByTagName("*");
      for(i in nodeList) {
        n = nodeList[i];
        if (typeof n.setAttribute == "function") {
          n.setAttribute("cydr-ignore", "true");
        }
      }

      nodes = this.element.innerHTML;
      holderElement = this.element.tagName;
      dummy = document.createElement(holderElement);
      dummy.innerHTML = nodes;      
      this.clearContents();
      nodeList = dummy.getElementsByTagName("*");
      for(i in nodeList) {
        n = nodeList[i];
        if (typeof n.removeAttribute == "function") {
          n.removeAttribute("cydr-ignore");
        }
      }
      this.template = dummy;
      var sib = this.template.children[0];
      this.addNode(sib);
      while (true) {
        sib = sib.nextSibling;
        if (!sib) break;
        if (sib.tagName) {
          this.addNode(sib);
        }
      }
    },

    clearContents: function () {
      while (this.element.hasChildNodes()) {
        this.element.removeChild(this.element.lastChild);
      }
    },

    importValue: function () {
      this.clearContents();
      var list = this.executeBindingExpression();
      var self = this;
      list.each(function (model) {
        var cachedNodes = self.getCachedNodes(model.getID());
        if (cachedNodes) {
          for (var i in cachedNodes) {
            var node = cachedNodes[i];
            self.element.appendChild(node);
          }
        } else {
          var nl = self.getNodes();
          for (var i in nl) {
            var node = nl[i];
            var n = node.cloneNode(true);
            self.element.appendChild(n);
            if (typeof n.removeAttribute == "function") {
              n.removeAttribute("cydr-ignore");
            }
            model.applyBindingsToNode(n, self);
            self.addCachedNode(model.getID(), n);
          }
        }
      });
    }
  });

  return LoopBinding;
});