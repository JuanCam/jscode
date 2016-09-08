window.Main = {};

(function(w, M) {
    M.augment = augment;
    M.extend = extend;

    function augment(Base, mixins) {
        function Extended() {
            Base.apply(this, arguments);
        }
        Extended.prototype = Object.create(Base.prototype);
        Extended.constructor = Base;
        if (!mixins instanceof Array) {
            console.warn('mixins is not a collection');
            return false;
        }
        mixins.forEach(function(target) {
            mix.call(Extended.prototype, target.prototype);
        });
        return Extended;
    }


    function extend(Base, mixins) {

        if (!mixins instanceof Array) {
            console.warn('mixins is not a collection');
            return false;
        }
        mixins.forEach(function(target) {
            mix.call(Base.prototype, target.prototype);
        });
    }

    function mix(target) {

        var props = Object.getOwnPropertyNames(target);
        var local = this;
        var p = 0;

        function merge() {

            if (p < props.length) {
                var propAttrs = Object.getOwnPropertyDescriptor(target, props[p]);
                Object.defineProperty(local, props[p], propAttrs);
                p++;
                return merge();
            } else {
                return true;
            }
        }
        return merge();
    }

})(window, Main)
