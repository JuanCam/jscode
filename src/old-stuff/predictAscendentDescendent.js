'use strict';
(function() {
    window.operateDigits = operateDigits;

    function operateDigits(number) {
        var desc = 0;
        var asc = 0;
        var eq = 0;
        var newNumber = 0;
        var L = number.length;
        for (var d1 = 0, d2 = 1; d2 < L; d2++, d1++) {
            if (Number(number[d1]) > Number(number[d2])) {
                desc++;
                if (asc >= 1 && !eq) {
                    /*Predicts next number if decreasing*/
                    number[d2] = number[d1];
                    newNumber = Number(number.join(''));
                }
            } else if (Number(number[d1]) < Number(number[d2])) {
                asc++;
                if (desc >= 1) {
                    /*Predicts next number if increasing*/
                    asb = Number(number.slice(d1, L).join(''));
                    desb = Number((Number(number[d1]) + 1) + number.slice(d2, L).fill('0').join(''));
                    newNumber = Number(number.join('')) + desb - asb;
                }
                eq = 0;
            } else {
                eq = 1;
                desc++;
                asc++;
            }
        }
        return ((desc >= L - 1 || asc >= L - 1) ? -1 : newNumber);
    }
})()
