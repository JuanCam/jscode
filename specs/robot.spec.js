'use strict';

describe('Robby reaches the target', function() {
    it('Moves across small fields with no obstacles', function() {
        expect(getCommands('T.S.', 10).join('')).toBe('f');
        expect(getCommands('S.......T', 10).join('')).toBe('rffrff');
        expect(getCommands('S.......T', 5).join('')).toBe('');
    });
    it('Moves across small fields with simple obstacles', function() {
        expect(getCommands('S#.##...T', 20).join('')).toBe('');
        expect(getCommands('S#..#...T', 20).join('')).toBe('rrfflff');
    });
    /* Remove when the robot algorithm is ready
    it('Moves across a complex field', function() {
        expect(getBlindCommands('S#..#T...', 20).join('')).toBe('rrfflfflf');
        expect(getBlindCommands('.........S......######............#.......######......T.........', 100).join('')).toBe('rfffffrfffrfffrflfflffflfffff');
        expect(getBlindCommands('.........S......######...........##.......######......T.........', 100)).toBe('rfffffrfffrfffrflfflrflffflffffff');
    });*/
});
