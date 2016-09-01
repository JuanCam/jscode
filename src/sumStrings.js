(function(wndw) {
    'use strict';
    window.sumStrings = sumStrings;

    function sumStrings(a, b) {

        var str1 = (a.length <= b.length) ? a : b;
        var str2 = (a.length <= b.length) ? b : a;
        var lastIndex1 = str1.length - 1;
        var lastIndex2 = str2.length - 1;
        var acum = 0;
        str1 = str1.split('').reverse().join('');
        str2 = str2.split('').reverse().join('');

        
        return Array.prototype.map.call(str2, function(value, key) {
            var number = (key <= lastIndex1) ? Number(str1[key]) : 0;
            var sum = number + Number(value) + acum;
            acum = Math.floor(sum / 10);
            return (key >= lastIndex2) ? sum : Math.round(((sum / 10) - acum) * 10);
        }).reverse().join('').replace(/^0*(?=\d|\w)/, '');
    }
})(window);
