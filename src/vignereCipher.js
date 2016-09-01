'use strict';

(function() {
    window.VigenereAutokeyCipher = VigenereAutokeyCipher;

    function VigenereAutokeyCipher(key, abc) {
        var keyL = key.length;
        var reg = new RegExp('[' + abc + ']', 'g');
        this.key = key;
        this.encode = function(str) {
            var rawStr = (str.match(reg)) ? str.match(reg).join('') : str;
            var inAutoKey = 0;
            var keyInd = 0;
            var key = this.key;
            return Array.prototype.map.call(str, function(character, pos) {
                var keyPos = abc.indexOf(key[keyInd]);
                var charPos = abc.indexOf(character);
                if (keyInd >= keyL) {
                    keyPos = abc.indexOf(rawStr[inAutoKey]);
                    if (charPos > -1) {
                        key += rawStr[inAutoKey];
                        inAutoKey++;
                    } else {
                        key += character;
                    }
                }
                var encoded = character;
                if (charPos > -1) {
                    encoded = abc[(keyPos + charPos) % abc.length];
                    keyInd++;
                }
                return encoded;

            }).join('');
        };
        this.decode = function(str) {
            var inAutoKey = 0;
            var keyInd = 0;
            var rawDecoded = '';
            var key = this.key;
            return Array.prototype.map.call(str, function(character, pos) {
                var charPos = abc.indexOf(character);
                var keyPos = abc.indexOf(key[keyInd]);
                var deltaPos = (charPos - keyPos)
                var newPos = (deltaPos < 0) ? abc.length + deltaPos : deltaPos;
                var decoded = character;
                if (keyPos > -1 && charPos > -1) {
                    decoded = abc[newPos];
                    rawDecoded += decoded;
                    keyInd++;
                }
                if (keyInd >= keyL) {
                    key += rawDecoded[inAutoKey];
                    inAutoKey++;
                }
                return decoded;
            }).join('');
        };
    }
})();
