
function golSettings(gameTimeOut) {

  this.gameInterval =10;
  this.gameTimeOut = gameTimeOut;

  this.gameModes = {
    REGULAR_GAME: 0,
    DEV_MODE: 1
  };

  this.gameMode = this.gameModes.REGULAR_GAME;

 /* this.getGameTimeOut = function () {
    return this.gameTimeOut;
  },

  this.getGameInterval = function () {
    return this.gameInterval;
  },*/

  this.setGameMode = function(value){
    this.gameMode = value;
  }



}

