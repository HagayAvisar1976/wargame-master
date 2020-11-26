


var LifeStates = {
    DEAD: 0,
    ALIVE: 1
};

var Players = {
    PLAYER_A: "A",
    PLAYER_B: "B"
};


// define a cell object
function cell(row,col) {
    this.row = row;
    this.col = col;
}

function cellInfo(value,player) {
    this.value = value;
    this.player = player;
}


var LifeCore = {

    _rows: 160,
    _columns: 240,
    _logicBoardMatrix : [],
    _newBoardlogicMatrix : [],
    _generation : 0,

    getRowsNumber : function () {
        return this._rows;
    },

    getColmunsNumber : function(){
        return this._columns;
    },

    getCellValue: function(row,col){
        if(this._logicBoardMatrix == null || this._logicBoardMatrix == undefined || this._logicBoardMatrix.length <=0)
        {
            console.error("Game is not started , board is undefine yet.}");
            return;
        }
        if (row < 0 || row > (this._rows - 1)) {
            console.error("Can not get cell value due to wrong row value {" + row + "}");
            return;
        }

        if (col < 0 || col > (this._columns - 1)) {
            console.error("Can not get cell value due to wrong column value {" + col + "}");
            return;
        }

        return  this._logicBoardMatrix[row][col].value;

    },

    getCellPlayer : function(row,col){
        if(this._logicBoardMatrix == null || this._logicBoardMatrix == undefined || this._logicBoardMatrix.length <=0)
        {
            console.error("Game is not started , board is undefine yet.}");
            return;
        }
        if (row < 0 || row > (this._rows - 1)) {
            console.error("Can not get cell value due to wrong row value {" + row + "}");
            return;
        }

        if (col < 0 || col > (this._columns - 1)) {
            console.error("Can not get cell value due to wrong column value {" + col + "}");
            return;
        }

        return  this._logicBoardMatrix[row][col].player;
    },

    getGeneration: function () {
        return this._generation;
    },

    startNewBoard : function () {
        this._logicBoardMatrix = [];
        this._generation = 0;
        this.initLifeMatrix(this._logicBoardMatrix);
        this.initLifeMatrix(this._newBoardlogicMatrix);
    },

    initLifeMatrix: function (arr) {

        console.debug("Initializing life matrix");
        for (var i = 0; i < this._rows; i++) {
            arr.push([0])
            for (var j = 0; j < this._columns; j++) {
                arr[i][j] = new cellInfo(LifeStates.DEAD,null);
            }
        }
    },

    setLifeMatrixCell: function (cell, newValue,player) {
        if (cell.row < 0 || cell.row > (this._rows - 1)) {
            console.error("Can not update cell due to wrong row value {" + cell.row + "}");
            return;
        }

        if (cell.col < 0 || cell.col > (this._columns - 1)) {
            console.error("Can not update cell due to wrong column value {" + cell.col + "}");
            return;
        }

        var row = Math.floor(cell.row);
        var col =  Math.floor(cell.col)
        if(this._logicBoardMatrix[row][col] == null || this._logicBoardMatrix[row][col] === undefined){
            console.error("matrix object is undefine for row:" + row + "and col:" + col);
        }

        this._logicBoardMatrix[row][col].value = newValue;
        this._logicBoardMatrix[row][col].player = player;

    },


    setLifeMatrixCells : function (cells,player) {

        for(var i = 0; i < cells.length;i++)
        {
            this.setLifeMatrixCell(cells[i],LifeStates.ALIVE,player);
        }

    },

    nextGenerationMatrix: function () {


        for(var row = 0; row < this._rows; row++){
            for (var col = 0; col < this._columns; col++)
            {
                this._newBoardlogicMatrix[row][col].player = null; // init the board before asiging new value.

                this._newBoardlogicMatrix[row][col].value = this.getCellNextGenerationValue(row,col);
                if(this._newBoardlogicMatrix[row][col].value === LifeStates.ALIVE){
                    this._newBoardlogicMatrix[row][col].player = this.getCellOwnership(row,col)
                }
            }
        }

        // copy the values to the game board.
        for(var row = 0; row < this._rows; row++){
            for (var col = 0; col < this._columns; col++){
                this._logicBoardMatrix[row][col].value =  this._newBoardlogicMatrix[row][col].value;
                this._logicBoardMatrix[row][col].player =  this._newBoardlogicMatrix[row][col].player;
            }
        }
        this._generation++;

    },

    getCellNextGenerationValue : function (row, col) {

        var cellNeighbors = this.getNeighborsCount(row, col);
        if(this._logicBoardMatrix[row][col].value && cellNeighbors === 2 || cellNeighbors === 3){
            return LifeStates.ALIVE;
        }
        else{
            return LifeStates.DEAD;
        }
    },

    getNeighborsCount: function (row, col) {

        var nc = 0;
        var neighbours = [[-1,-1],[-1,0], [-1,+1],
                          [0,-1] ,/*    */[0,+1],
                          [+1,-1],[+1,0],[+1,+1]];

        for (var i=0; i <neighbours.length; i++) {
            var offset = neighbours[i];
            var neighbourRowPosition = row + offset[0];
            var neighbourColPosition = col + offset[1];

            if(neighbourRowPosition >=0 && neighbourColPosition >=0 && neighbourRowPosition < this._rows && neighbourColPosition < this._columns ){
                if(this._logicBoardMatrix[neighbourRowPosition][neighbourColPosition].value === LifeStates.ALIVE){
                    nc++;
                }
            }

        }

        return nc;

    },
    getCellOwnership : function(row, col){

        var playerACounter = 0;
        var playerBCounter = 0;
        var neighbours = [[-1,-1],[-1,0], [-1,+1],
            [0,-1] ,/*    */[0,+1],
            [+1,-1],[+1,0],[+1,+1]];

        for (var i=0; i <neighbours.length; i++) {
            var offset = neighbours[i];
            var neighbourRowPosition = row + offset[0];
            var neighbourColPosition = col + offset[1];

            if (neighbourRowPosition >= 0 && neighbourColPosition >= 0
                && neighbourRowPosition < this._rows && neighbourColPosition
                < this._columns) {
                if(this._logicBoardMatrix[neighbourRowPosition][neighbourColPosition].value ===LifeStates.ALIVE ) {

                    if (this._logicBoardMatrix[neighbourRowPosition][neighbourColPosition].player
                        === Players.PLAYER_A) {
                        playerACounter++;
                    }
                    if (this._logicBoardMatrix[neighbourRowPosition][neighbourColPosition].player
                        === Players.PLAYER_B) {
                        playerBCounter++;
                    }
                }
            }
        }
        if((playerBCounter === playerACounter) && playerACounter === 0){
            console.warn("we may have a problem here : playerA:" + playerACounter + " PlayerB:" + playerBCounter);
        }
        return (playerACounter > playerBCounter) ? Players.PLAYER_A : Players.PLAYER_B;
    },

    getNeighbors: function (row,col) {
        var neighbours = [[-1, -1], [-1, 0], [-1, +1],
                          [0, -1],/*     */[0, +1],
                          [+1, -1], [+1, 0], [+1, +1]];

        var neighboursCells = [];
        for (var i = 0; i < neighbours.length; i++) {
            var offset = neighbours[i];
            var neighbourRowPosition = row + offset[0];
            var neighbourColPosition = col + offset[1];

            if (neighbourRowPosition >= 0 && neighbourColPosition >= 0 && neighbourRowPosition < this._rows && neighbourColPosition < this._columns) {
                neighboursCells.push(new cell(neighbourRowPosition, neighbourColPosition));
            }

        }
        return neighboursCells;
    }


}
















