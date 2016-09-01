'use strict';

(function() {
    window.validSolution = validSolution;

    function validSolution(board) {
        var r = board.length - 1;
        var b = board.length;
        var rb = board.length;
        var nElems = board.length;
        var row = [];
        var column = [];
        var box = [];
        return (function validate(board) {
            if (r >= 0) {
                row = board[r];
                column = columns(board, r);
                box = board.slice(rb - 3, rb);
                box = [box[0].slice(b - 3, b), box[1].slice(b - 3, b), box[2].slice(b - 3, b)];
                if (!validLine(row) || !validLine(column) || !validBox(box)) {
                    return false
                }
                box = [];
                rb = (b <= 3) ? rb - 3 : rb;
                b = (b > 3) ? (b - 3) : nElems;
                r--;
                return validate(board);
            } else {
                return true;
            }
        })(board);
    }

    function columns(board, colN) {
        var column = [],
            rowB = board.length - 1;
        return (function get(board) {
            var numb = board[rowB][colN];
            if (rowB > 0) {
                rowB--;
                return get(board, colN)
            } else {
                return column;
            }
        })(board);
    }

    function validBox(box) {
        var evaluator = [0],
            rowB = 3;
        return (function verifyBox(box) {
            if (rowB > 0) {
                rowB--;
                var rowBox = box[rowB];
                for (var position = 2; position >= 0; position--) {
                    if (evaluator.indexOf(rowBox[position]) > -1) {
                        return false;
                    } else {
                        evaluator.push(rowBox[position]);
                    }
                }
                return verifyBox(box);
            } else {
                return true;
            }
        })(box);
    }

    function validLine(boardLine) {
        var evaluator = [0],
            rcB = boardLine.length - 1;
        return (function verifyLine(boardLine) {
            if (rcB > 0) {
                var numb = boardLine[rcB]
                rcB--;
                if (evaluator.indexOf(numb) > -1) {
                    return false;
                } else {
                    evaluator.push(numb);
                    return verifyLine(boardLine);
                }
            } else {
                return true;
            }
        })(boardLine);
    }
})();
