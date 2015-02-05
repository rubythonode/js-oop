var oojs = (function(oojs) {

    var createToolbarItem = function (itemElement) {

        var item = {
            toggleActiveState: function () {
                this.activated = ! this.activated;
            }
        };

        Object.defineProperties(item, {
            el : {
                value : itemElement
            },
            enabled : {
                get : function () {
                    return ! this.el.classList.contains("disabled");
                },
                set : function (value) {
                    if (value) {
                        this.el.classList.remove("disabled");
                    } else {
                        this.el.classList.add("disabled");
                    }
                }
            },
            activated : {
                get : function () {
                    return this.el.classList.contains("active");
                },
                set : function (value) {
                    if (value) {
                        this.el.classList.add("active");
                    } else {
                        this.el.classList.remove("active");
                    }
                }
            }
        });

        return item;
    };

    var createToolbarItems = function (itemElements) {
        var items = [];

        [].forEach.call(itemElements, function (el, index, array) {
            var item = createToolbarItem(el);

            items.push(item);
        });

        return items;
    };

    oojs.createToolbar = function(elementId) {
        var element = document.getElementById(elementId);

        if (! element) {
            element = document.createElement("DIV");
            element.id = elementId;
            element.className = "toolbar";
        }

        var items = element.querySelectorAll(".toolbar-item");

        var toolbar = {
            add : function (options) {
                var span = document.createElement("SPAN");
                span.className = "toolbar-item";

                this.el.appendChild(span);

                var item = createToolbarItem(span);

                this.items.push(item);
            },
            remove : function (index) {
                var len = this.items.length;

                if (index > len || index < 0) {
                    throw new Error("Index is out of range");
                }

                var item = this.items[index];
                this.items.splice(index, 1);

                this.el.removeChild(item.el);

                item = null;
            },
            appendTo : function (parentElement) {
                parentElement.appendChild(this.el);
            }
        };

        Object.defineProperties(toolbar, {
            el : {
                value : element
            },
            items : {
                value : createToolbarItems(items),
                enumerable : true
            }
        });

        return toolbar;
    };

    return oojs;

})(oojs || {});

/* How to test at browser console
var toolbar = oojs.createToolbar("myToolbar");
toolbar.appendTo(document.body);
toolbar.add();
toolbar.add();
toolbar.add();
toolbar.remove(1);
toolbar.items[0].enabled = false;
toolbar.items[0].enabled = true;
toolbar.items[0].activated = true;
toolbar.items[0].activated = false;
*/