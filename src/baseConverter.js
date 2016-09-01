(function(wndw) {
    'use strict';
    wndw.converter = converter;

    function converter(number, decimals, base) {

        var base = base || Math.PI;
        var num = Math.abs(number);
        var intg = parseInt(num);
        var maxExp = (intg > 0) ? exponent(num, base) : 0;
        var result = '';
        var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var delta = 0;
        var coef = 0;
        var item = 0;
        var maxDec = decimals || 0;

        for (var exp = maxExp; num >= 0 && maxDec >= 0;) {
            /*Creating the new number*/
            item = Math.pow(base, exp);
            delta = num - (item * (coef + 1));
            if (delta >= 0 && coef < (base - 1)) {
                coef++;
            } else {
                result += (coef <= 9) ? coef : letters[coef - 10];
                maxDec -= (exp <= 0) ? 1 : 0;

                if (exp == 0)
                    result += (maxDec >= 0) ? '.' : '';
                num -= item * coef;
                coef = 0;
                exp--;
            }
        }
        result = result.replace(/^0*(?=\d|\w)/, '');
        return (number < 0) ? '-' + result : result;
    }

    function exponent(number, base) {
        var breakNum = 1;
        var direction = 1;
        var baseResult = number;
        var result = 0;
        if (number < 1) {
            breakNum = number;
            direction = -1;
            baseResult = 1;
        }
        if (number > 0) {
            return (function getExp(number, base) {
                if (baseResult > breakNum) {
                    baseResult *= 1 / base;
                    result += direction;
                    return getExp(number, base);
                } else {
                    return result;
                }
            })(number, base)
        } else {
            return -Infinity;
        }
    };
})(window);
