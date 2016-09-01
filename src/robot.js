(function(wndw) {
    wndw.getCommands = getCommands;

    function CreateRobot(props) {

        var coords;
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
            var pos = coords.findPosn(this.vertical, this.horizontal);

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

        Robot.prototype.depower = function() {

            this.power -= this.powCost;
        }

        Robot.prototype.move = function() {

            this.col -= this.horizontal;
            this.row -= this.vertical;
            this.command = 'f';
        }

        Robot.prototype.see = function() {
            var currSee = '';
            if (this.vertical != 0) {
                var currCol = getCurrentColumn.call(this);
                currSee = currCol;
            }
            if (this.horizontal != 0) {
                var currRow = getCurrentRow.call(this);
                currSee = currRow;
            }
        }

        Robot.prototype.goToTarg = function() {

            return (function step(entity) {
                if (entity.power > 0) {
                    entity.locate();
                    if (entity.arrived) {
                        return entity.commands;
                    }
                    entity.see();
                    coords.row = entity.row;
                    coords.col = entity.col;
                    if (!entity.turn()) {
                        entity.move();
                    }
                    entity.depower();
                    entity.commands.push(entity.command);
                    return step(entity);
                } else {
                    return (entity.arrived) ? entity.commands : entity.arrived;
                }
            })(this);
        }

        return new Robot;

        function Robot() {

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
            coords = props.coords;
            field = coords.field;

        }

        /*Private Methods*/

        function getCurrentColumn() {

            var auxCol = (this.col - 1) - this.horizontal;
            var rows = coords.rows;
            return Array.prototype.filter.call(field, function(cell, index) {

                if (index == (auxCol + rows)) {
                    auxCol += rows;
                    return true;
                }
                return false;
            }).join('');

        }

        function getCurrentRow() {

            var crow1 = coords.findPosn(this.row, 0);
            var crow2 = coords.findPosn(this.row, coords.rows);
            return field.slice(crow1, crow2);

        }

    }

    function CreateCoords(props) {

        Coordinates.prototype.findCoords = function(el) {
            var elPos = this.field.indexOf(el) + 1;
            this.row = Math.ceil(elPos / this.rows);
            this.col = this.rows - ((this.row * this.rows) - elPos);
            return [this.row, this.col];
        }
        Coordinates.prototype.findPosn = function(v, h, dirs) {
            var dirs = dirs || 1;
            this.posn = (this.row - (v * dirs)) * this.rows - (this.rows - (this.col - (h * dirs)));
            return (!isNaN(this.posn)) ? this.posn : undefined;
        }
        return new Coordinates;

        function Coordinates() {

            this.field = props.field;
            this.rows = props.rows
        }
    }

    function getCommands(field, power) {
        var rows = Math.sqrt(field.length);
        if (Math.abs(rows - Math.round(rows)) > 0) {
            console.warn('inconsistent field size')
            return [];
        }
        var coords = CreateCoords({
            field: field,
            rows: rows
        });
        //matrixfyString(field, rows);
        var robotCoords = coords.findCoords('S');
        var targetCoords = coords.findCoords('T');

        var robot = CreateRobot({
            row: robotCoords[0],
            col: robotCoords[1],
            coords: coords,
            power: power,
            vertical: 1,
            powCost: 1,
            horizontal: 0
        });
        robot.setTarget(targetCoords[0], targetCoords[1]);

        if (robot.goToTarg()) {
            return robot.commands;
        }
        return [];
    }
})(window);
