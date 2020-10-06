
var BudgetIncreasePerCycle = 1;
//var SCORE_TO_WIN = 3;

var Players = {
    PLAYER_A: "A",
    PLAYER_B: "B"
};

var GameEngine = {

    _playerA:null,
    _playerB:null,


    newGame : function(playerNameA, playerNameB) {

        this.initPlayers(playerNameA,playerNameB);
        LifeCore.startNewBoard();

    },

    initPlayers: function (nameA,nameB) {

        var botA = GameEngineSDK.getBot(nameA);
        var botB = GameEngineSDK.getBot(nameB);
        //botA.initBudget();
        //botB.initBudget();

        this._playerA = new playerBot(botA)
        this._playerB = new playerBot(botB)
    },
    getPlayerScore:function (player) {
        if(player === Players.PLAYER_A) {
            return this._playerA.score;
        }
        else {
            return this._playerB.score;
        }
    },
    playRound: function(){

        var playerA = this._playerA;
        var playerB = this._playerB;
        // - Display  board

        // - check hits & update score
        this.check4Hits(playerA,playerB);

        // increase budget for all players
        this.updatePlayersBudget(playerA,playerB);

        //delete hits?

        // If i call this method after player move, we will not see his move on screen, the next gen method will change it and calculate the next gen
        LifeCore.nextGenerationMatrix();

        // play move for player A
        this.playerMove(playerA,false);

        // play move for player B
        this.playerMove(playerB,true);

    },

    getTheWinner: function () {

        if (this._playerA.score === this._playerB.score){
            return {"winner":"","loser":""};
        }
        if(this._playerA.score > this._playerB.score)
        {
            return {"winner":this._playerA._botExe.getBotName(),"loser":this._playerB._botExe.getBotName()};
        }
        else{
            return {"winner":this._playerB._botExe.getBotName(),"loser":this._playerA._botExe.getBotName()};
        }

    },

    playerMove : function(player,isMirror){
        var cellsToUpdate =  player.playMove();
        cellsToUpdate = this.playerCellsValidation(cellsToUpdate);
        if((cellsToUpdate!= null && cellsToUpdate.length>0) && cellsToUpdate.length < player.getBudget()) {
            if(isMirror) {
                this.mirrorCellsForFighter(cellsToUpdate);
            }
            LifeCore.setLifeMatrixCells(cellsToUpdate);
            player.updateBudget((cellsToUpdate.length * -1));
        }
    },

    playerCellsValidation : function(cells){
        // not to allow a player to set a cell beyond his borders
        // each player can set a cell only in his half of the board.
        return cells.filter(function (value,index,arr) { return !(arr[index].row >= LifeCore.getRowsNumber() / 2) });

    },

    updatePlayersBudget : function (playerA, playerB) {
        playerA.updateBudget(BudgetIncreasePerCycle);
        playerB.updateBudget(BudgetIncreasePerCycle);
    },

    check4Hits: function (playerA, playerB) {

        this.checkPlayerHits(playerA,LifeCore.getRowsNumber() - 1); // check if there is a live cell at the last row, increase score for A
        this.checkPlayerHits(playerB,0);// check if there is a live cell at the first row, increase score for B
    },

    checkPlayerHits: function(player, rowToCheck){

        for(var i=0; i<LifeCore.getColmunsNumber(); i++){
            if(LifeCore.getCellValue(rowToCheck,i) === LifeStates.ALIVE){
                player.updateScore(1);
                this.fireHitEvent(rowToCheck,i);
                LifeCore.setLifeMatrixCell(new cell(rowToCheck,i), LifeStates.DEAD);
            }
        }

    },
    fireHitEvent : function (row,col) {
        var c = new cell(row,col);
        var event = new CustomEvent("hit",{detail: c});

        document.dispatchEvent(event);
    },
    mirrorCellsForFighter: function (cells) {

        cells.forEach(function (cell) {
            var mirrorRow = (LifeCore.getRowsNumber() -1) - cell.row;
            cell.row = mirrorRow;
        })
    },

    getPlayerBudget : function (botname) {
        if(this._playerA.getPlayerBotName() === botname){
            return this._playerA.getBudget();
        }
        if(this._playerB.getPlayerBotName() === botname){
            return this._playerB.getBudget();
        }
        console.error("you are trying to get budget for a bot that is not playing right now {" + botname + "}");
        return null;
    }

}


function playerBot (botExe) {

    this._botExe = botExe;
    this.score = 0;
    this.budget = 0;

    this.updateBudget = function (budgetTransaction) {
        //this._botExe.updateBotBudget(budgetTransaction);
        this.budget+=budgetTransaction;
    },

    this.getBudget = function () {
        //return this._botExe.getBotBudget();
        return this.budget;
    },

    this.updateScore = function (toAdd) {
        this.score += toAdd;
    },

    this.playMove = function () {

        var cellsToUpdate = this._botExe._logicFunction();
        if (cellsToUpdate == null || cellsToUpdate == undefined)
        {
            cellsToUpdate = [];
        }

        return cellsToUpdate;

    },

    this.getPlayerBotName = function () {
        return this._botExe.getBotName();
    }

}


