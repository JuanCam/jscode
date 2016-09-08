(function(w) {

    'use strict';

    w.CreateSpace = CreateSpace;
    w.CreateRobot = CreateRobot;

    function CreateRobot(props) {

        var space;
        var field;

        Robot.prototype.setTarget = function(rowTarg, colTarg) {

            this.rowTarg = rowTarg;
            this.colTarg = colTarg;
        }

        Robot.prototype.locate = function() {

            var deltaRow = this.row - this.rowTarg;
            var deltaCol = this.col - this.colTarg;
            this.markRow = Math.round(deltaRow / (Math.abs(deltaRow) + 0.5));
            this.markCol = Math.round(deltaCol / (Math.abs(deltaCol) + 0.5));
            this.arrived = Math.abs(deltaCol) <= 0 && Math.abs(deltaRow) <= 0;
        }

        Robot.prototype.turn = function() {

            var horizontal = this.horizontal;
            var turn = false;
            var pos = space.getPosition(this.row, this.col);

            if ((this.vertical != this.markRow && this.vertical != 0) || field[pos - 1] == '#') {
                turn = true;
                this.horizontal = this.markCol;
                if (this.vertical == 1) {
                    this.command = (this.horizontal == -1) ? 'r' : 'l';
                } else {
                    this.command = (this.horizontal == 1) ? 'r' : 'l';
                }
                this.vertical = 0;
            }
            if ((horizontal != this.markCol && horizontal != 0) || field[pos - 1] == '#') {
                turn = true;
                this.vertical = this.markRow;
                if (horizontal == 1) {
                    this.command = (this.vertical == 1) ? 'r' : 'l';
                } else {
                    this.command = (this.vertical == -1) ? 'r' : 'l';
                }
                this.horizontal = 0;
            }
            return turn;
        }

        Robot.prototype.move = function() {

            this.col -= this.horizontal;
            this.row -= this.vertical;
            this.command = 'f';
        }

        Robot.prototype.see = function() {
            this.currSee = '';
            if (this.vertical != 0) {
                var currCol = getCurrentColumn.call(this);
                this.currSee = currCol;
            }
            if (this.horizontal != 0) {
                var currRow = getCurrentRow.call(this);
                this.currSee = currRow;
            }
        }

        Robot.prototype.decide = function() {
            if (/[#]/g.test(this.currSee)) {}
        }

        Robot.prototype.goToTarg = function() {

            return step.call(this);

        }

        return new Robot;

        function Robot() {
            /*Robot class, is the base to create a robot that
            will move thru a 2d map*/
            this.row = props.row;
            this.col = props.col;
            this.power = props.power;
            this.vertical = props.vertical;
            this.horizontal = props.horizontal;
            this.powCost = props.powCost;
            this.commands = [];
            this.command = '';
            this.arrived = false;

            /*Private attributes*/
            space = props.space;
            field = space.field;

        }

        /*Private Methods*/

        function getCurrentColumn() {

            var auxCol = (this.col - 1) - this.horizontal;
            var rows = space.rows;
            var column = Array.prototype.filter.call(field, function(cell, index) {

                if (index == (auxCol + rows)) {
                    auxCol += rows;
                    return true;
                }
                return false;
            }).join('');
            return column;

        }

        function getCurrentRow() {

            var crow1 = space.getPosition(this.row - this.vertical, 0, 0);
            var crow2 = space.getPosition(this.row - this.vertical, space.rows, 0);
            var row = field.slice(crow1, crow2);
            return row;

        }

        function depower() {

            this.power -= this.powCost;
        }

        function step() {

            if (this.power > 0) {
                this.locate();
                space.v = this.vertical;
                space.h = this.horizontal;
                if (this.arrived) {
                    return this.commands;
                }
                this.see();
                this.decide();
                if (!this.turn()) {
                    this.move();
                }
                depower.call(this);
                this.commands.push(this.command);
                return step.call(this);
            } else {
                return (this.arrived) ? this.commands : this.arrived;
            }
        }
    }

    function CreateSpace(props) {

        return new Space;

        function Space() {
            /*Space Class: Allows the conversion of the string field
            to a matrix*/
            return {
                field: props.field,
                rows: props.rows,
                getCoords: function(el) {

                    var elPos = this.field.indexOf(el) + 1;
                    var row = Math.ceil(elPos / this.rows);
                    var col = this.rows - ((row * this.rows) - elPos);
                    return {
                        row: row,
                        col: col
                    };
                },
                getPosition: function(row, col, dirs) {

                    var dirs = (isUndefined(dirs)) ? 1 : dirs;
                    var posn = (row - (this.v * dirs)) * this.rows - (this.rows - (col - (this.h * dirs)));
                    return (!isNaN(posn)) ? posn : undefined;
                }
            }
        }

    }

    function isUndefined(obj) {
        return typeof obj === 'undefined';
    }

})(window);

function getCommands(field, power) {
    /*This function will use the Robot class to create
    a robot and reacha target*/
    var rows = Math.sqrt(field.length);
    if (Math.abs(rows - Math.round(rows)) > 0) {
        console.warn('inconsistent field size')
        return [];
    }
    var space = CreateSpace({
        field: field,
        rows: rows
    });
    //matrixfyString(field, rows);
    var robotCoords = space.getCoords('S');
    var targetCoords = space.getCoords('T');

    var robot = CreateRobot({
        row: robotCoords.row,
        col: robotCoords.col,
        space: space,
        power: power,
        vertical: 1,
        powCost: 1,
        horizontal: 0
    });
    robot.setTarget(targetCoords.row, targetCoords.col);

    if (robot.goToTarg()) {
        return robot.commands;
    }
    return [];
}
