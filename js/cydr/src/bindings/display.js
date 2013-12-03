define(['./binding'], function (Binding) {

    var DisplayBinding = Binding.extend({

        _elementDisplay: [],

        show: function (element) {

            element.style.display = "";
            var old = element.getAttribute("data-olddisplay");
            if(old && old !== "none") {
                return element.style.display = old;
            }

            var computed = this._getStyle(element, "display");
            if(computed === "none") {
                var shouldDisplay = this._elementDisplay[element.nodeName];
                if(!shouldDisplay) {
                    var temp = document.createElement(element.nodeName);
                    document.getElementsByTagName('body')[0].appendChild(temp);
                    shouldDisplay = this._getStyle(temp, "display");
                    document.getElementsByTagName('body')[0].removeChild(temp);
                    this._elementDisplay[element.nodeName] = shouldDisplay;
                }
                element.style.display = shouldDisplay;
            }
            else {
                element.style.display = computed;
            }
        },

        hide: function (element) {
            element.setAttribute("data-olddisplay", element.style.display);
            element.style.display = "none";
        },

        _getStyle: function(element, property) {
            var strValue = "";
            if(document.defaultView && document.defaultView.getComputedStyle){
                strValue = document.defaultView.getComputedStyle(element, "").getPropertyValue(property);
            }
            else if(element.currentStyle){
                property = property.replace(/\-(\w)/g, function (strMatch, p1){
                    return p1.toUpperCase();
                });
                strValue = element.currentStyle[property];
            }
            return strValue;
        }
    });

    return DisplayBinding;
})