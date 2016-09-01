'use strict';

describe("Ascendent or descendent numbers", function() {

    it("Return all numbers between 0 and 10 to the n. (0 <= n <= 9)", function() {
        expect(totalIncDec(0)).toEqual(1);
        expect(totalIncDec(1)).toEqual(10)
        expect(totalIncDec(2)).toEqual(100);
        expect(totalIncDec(3)).toEqual(475);
        expect(totalIncDec(4)).toEqual(1675);
        expect(totalIncDec(5)).toEqual(4954);
        expect(totalIncDec(6)).toEqual(12952);
        expect(totalIncDec(7)).toEqual(30817)
        expect(totalIncDec(8)).toEqual(67987);
        expect(totalIncDec(9)).toEqual(140907);
    });
    it("Return all numbers between 0 and 10 to the n. (10 <= n <= 19)", function() {
        expect(totalIncDec(10)).toEqual(277033);
        expect(totalIncDec(11)).toEqual(520565)
        expect(totalIncDec(12)).toEqual(940455);
        expect(totalIncDec(13)).toEqual(1641355);
        expect(totalIncDec(14)).toEqual(2778305);
        expect(totalIncDec(15)).toEqual(4576113);
        expect(totalIncDec(16)).toEqual(7354549);
        expect(totalIncDec(17)).toEqual(11560664)
        expect(totalIncDec(18)).toEqual(17809754);
        expect(totalIncDec(19)).toEqual(26936719);
    });
});
