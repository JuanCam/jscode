(function(wndw) {
    'use strict';
    wndw.totalIncDec = totalIncDec;

    function sumPerDigit(dig, ndig) {
        var sum = 0;
        var rightSum = 0;
        var leftSum = 0;
        var rootNum = 1;
        var right = 1;
        var left = 1;
        var sequence = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (var n = 0; n < ndig; n++) {
            rightSum = 0;
            leftSum = 0;
            for (var s = 0, rt = 0, lt = 0; s < sequence.length; s++) {
                if (s < dig) {
                    lt = left;
                    leftSum += left;
                    left -= sequence[s];
                    sequence[s] = lt;
                } else {
                    rt = right;
                    rightSum += right;
                    right -= sequence[s];
                    sequence[s] = rt;
                }
            }
            right = rightSum;
            left = leftSum;
            rootNum += (rightSum + leftSum);
            sum += rootNum;
        }
        return sum;
    }

    function totalIncDec(n) {
        var result = (n <= 0) ? 1 : 10; //First ten digits
        for (var digit = 1; digit < 10; digit++) {
            result += sumPerDigit(digit, n - 1);
        }
        return result;
    }
})(window);
