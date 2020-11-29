var gameContrller = {

  _gameSettings: null,
  _gameIntervalID: null,
  _startGameTime: null,

  startNewGame: function (gameSettings, playerA, playerB) {

    if (this.isGameInProgress()) {
      throw "There is a game in progress";
    }

    if (playerA === "" || playerB === "") {
      throw "Invalid bot selection, could not start a new game";
    }

    if (gameSettings === null || gameSettings === undefined) {
      throw "gameSettings is null or undefined";
    }

    this._gameSettings = gameSettings;
    GameEngine.newGame(playerA, playerB);

    if(this._gameSettings.gameMode === this._gameSettings.gameModes.REGULAR_GAME){
      var interval = this._gameSettings.gameInterval;
      this._gameIntervalID = setInterval(this.playRound, interval);
      this._startGameTime = Date.now();
      this.fireGameStartedEvent();
    }

  },


  playRound: function () {

    GameEngine.playRound();

    gameContrller.firePlayRoundEvent();

    // in dev mode there is no need to check for game end time.
    if(gameContrller._gameSettings.gameMode === gameContrller._gameSettings.gameModes.REGULAR_GAME) {

      if (gameContrller.isTimeOver()) {
        gameContrller.endGameOperations();
      }
    }
  },

  currentGameMode : function (){
    return gameContrller._gameSettings.gameMode;
  },

  isGameInProgress : function(){
    return (this._gameIntervalID != null);
  },
  isTimeOver: function () {

    var seconds = gameContrller.getGameTime();

    return (seconds >= gameContrller._gameSettings.gameTimeOut);
  },

  getGameTime: function () {
    var millis = Date.now() - gameContrller._startGameTime;
    var seconds = Math.floor(millis / 1000);

    return seconds;
  },

  endGameOperations: function(){

    var gameIntervalID = gameContrller._gameIntervalID;
    if(gameIntervalID!=null && gameIntervalID!=undefined){
      clearInterval(gameIntervalID);
      gameContrller._gameIntervalID = null;
    }

    gameContrller.fireGameOverEvent();
  },

  setHalfBudgetFlag : function(value){
    GameEngine.setHalfBudgetFlag(value);
  },

  /// EVENTS
  fireGameStartedEvent: function () {
    var event = new CustomEvent("gameStarted", null);

    document.dispatchEvent(event);
  },

  firePlayRoundEvent: function () {

    var playerAScore = GameEngine.getPlayerScore(Players.PLAYER_A);
    var playerBScore = GameEngine.getPlayerScore(Players.PLAYER_B);
    var remainingSeconds = gameContrller._gameSettings.gameTimeOut - gameContrller.getGameTime();

    var data =  {"playerAScore":playerAScore,"playerBScore":playerBScore,remainingSeconds:remainingSeconds};

    var event = new CustomEvent("gameRound", {detail:data});

    document.dispatchEvent(event);
  },

  fireGameOverEvent : function () {
    var data = GameEngine.getTheWinner();
    data["remainingSeconds"] = 0;
    var event = new CustomEvent("gameOver", {detail:data});

    document.dispatchEvent(event);
  }

}