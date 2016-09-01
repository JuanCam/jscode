describe('Base converter', function() {
    'use strict';
    it('Convert integers to base PI', function() {
        expect(converter('13')).toEqual('103');
        expect(converter('20')).toEqual('200');
        expect(converter('100')).toEqual('10002');
    });
    it('Convert to base PI and get its decimals', function() {

        expect(converter('13', 3)).toEqual('103.010');
        expect(converter('20', 5)).toEqual('200.02121');
        expect(converter('105', 10)).toEqual('10021.0300101112');
    });
    it('Convert decimals to base PI', function() {
        expect(converter('15.56', 10)).toEqual('112.1202202101');
        expect(converter('75.5645415', 10)).toEqual('2110.1201222221');
    });
    it('Convert integers to base 16', function() {
        expect(converter('55', 0, 16)).toEqual('37');
        expect(converter('86', 0, 16)).toEqual('56');
        expect(converter('950', 0, 16)).toEqual('3B6');
        expect(converter('14500', 0, 16)).toEqual('38A4');
    });
    it('Convert to base 16 and get its decimals', function() {

        expect(converter('54', 10, 16)).toEqual('36.0000000000');
        expect(converter('78', 15, 16)).toEqual('4E.000000000000000');
        expect(converter('1005', 30, 16)).toEqual('3ED.000000000000000000000000000000');
    });
    it('Convert decimals to base 16', function() {
        expect(converter('175.4007', 0, 16)).toEqual('AF');
        expect(converter('25.52548142', 0, 16)).toEqual('19');
        expect(converter('88.25422514', 0, 16)).toEqual('58');
    });
});
