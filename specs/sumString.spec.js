'use strict';
describe('Sum string numbers',function() {
	it('sum strings',function() {

		expect('8670').toEqual(sumStrings('00103', '08567'));
		expect('79093').toEqual(sumStrings('0000548', '78545'));
		expect('150').toEqual(sumStrings('83', '67'));//150
		expect('6630737883715').toEqual(sumStrings('6585252458561', '45485425154'));
		expect('5463929876076031031').toEqual(sumStrings('5454115514514561514', '9814361561469517'));//5463929876076031000

	});
});