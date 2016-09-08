(function(w, M) {
    M.rectangle = rectangle;
    M.circle = circle;

    function Body (attrs) {
        this.x = attrs.x;
        this.y = attrs.y;
    };

    function Rectangle() {

    }
    Rectangle.prototype = {
        setWidth: function(width) {
            this.width = width;
        },
        setHeight: function(height) {
            this.height = height;
        },
        render: function() {
            console.log("I'm a rectangle!");
        }
    };

    function Circle() {

    }
    Circle.prototype = {
        setRadius: function (radius) {
            this.radius = radius;
        },
        render: function() {
            console.log("I'm a circle");
        }
    }


    function rectangle (attrs) {

        var extended = M.augment(Body, [Rectangle]);
        var instance = new extended({ x: attrs.x, y: attrs.y });
        instance.setWidth(attrs.width)
        instance.setHeight(attrs.height);

        return instance
    }

    function circle (attrs) {

        var extended = M.augment(Body, [Circle]);
        var instance = new extended({ x: attrs.x, y: attrs.y });
        instance.setRadius(attrs.radius);

        return instance;

    }

})(window, Main)

var rect = Main.rectangle({
    x: 12,
    y: 7,
    height: 85,
    width: 90
});
rect.render();
var circ = Main.circle({
    x: 58,
    y: 7,
    radius: 12
});
circ.render();
