'use strict';

describe('Vigenere Cipher algorithm', function() {

    var alphabet = 'abcdefghijklmnopqrstuvwxyz';
    var key = 'password';
    var coder = new VigenereAutokeyCipher(key, alphabet);

    it('Encode with english alphabet and key = password', function() {
        expect(coder.encode('codewars')).toBe('rovwsoiv');
        expect(coder.encode('waffles')).toBe('laxxhsj');
        expect(coder.encode('aaaaaaaapasswordaaaaaaaa')).toBe('passwordpasswordpassword');
        expect(coder.encode('it\'s a shift cipher!')).toBe('xt\'k s ovzib vapzlz!');
    });
    it('Decode with english alphabet and key = password', function() {
        expect(coder.decode('rovwsoiv')).toBe('codewars');
        expect(coder.decode('laxxhsj')).toBe('waffles');
        expect(coder.decode('passwordpasswordpassword')).toBe('aaaaaaaapasswordaaaaaaaa');
        expect(coder.decode('xt\'k s ovzib vapzlz!')).toBe('it\'s a shift cipher!');
    });
});
