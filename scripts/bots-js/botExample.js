
(function attackerBot(){

  var botName = "AttackerBot";
  var engineers =["Hagay","Avisar","Attacker"];

  function attackerBotLogic(){

    var budget = GameSDK.getMyBudget(botName);

    if((GameSDK.getCurrentGeneration() % 20) === 0){
      var dimensions = GameSDK.getMatrixDimensions();
      var colStart = GameSDK.getCurrentGeneration() % dimensions.cols;
      return createGlider(dimensions.rows - 20,colStart);
      //return createSpaceShip(dimensions.rows - 20,colStart);

    }
    else
    {
      return null;
    }
  }

  function createGlider (rowStart,colStart) {

    var cellsPosition = [[0, 0],
                                 [1, 1],
                [2, -1], [2, 0], [2, 1]];

    return setCellsAccordingToPosition(cellsPosition,rowStart,colStart);

  }

  function createSpaceShip(row,col) {
    /*
    var cellsPosition = [      [-1,1],      [-1,3],
      [0, 0],
      [1, 0],
      [2, 0],             [2,3],
      [3, 0], [3, 1],[3, 2]];

     */

    var cellsPosition = [[5, 5], [5, 4], [5, 3], [4, 5], [4, 2], [3, 5], [2, 5], [2, 1],
      [1, 5], [0, 4], [0, 2]]


    return setCellsAccordingToPosition(cellsPosition,row,col);
  }


  GameSDK.regiterBot(botName,engineers,attackerBotLogic);


})();


(function defenderBot(){

  var defenderBotName = "DefenderBot";
  var engineers =["Hagay","Avisar","Defender"];

  var defenderBotName_row = 40;

  function defenderLogic(){
    var budget = GameSDK.getMyBudget(defenderBotName);
    //console.info("defnder budget is" + budget);

    if(budget >=4 && (GameSDK.getCurrentGeneration() % 4) == 0) {
      var colStart = GameSDK.getCurrentGeneration() %  GameSDK.getMatrixDimensions().cols;
      if(colStart <= 3) {
        defenderBotName_row -= 5;
        if (defenderBotName_row <= 5) {
          defenderBotName_row = 40;
        }
      }
      return createBlock(defenderBotName_row, colStart);
    }

    return null;

  }

  function createBlock(rowStart,colStart){

    var cellsPosition = [[0,0],[0,1],
      [1,0],[1,1]];

    return setCellsAccordingToPosition(cellsPosition,rowStart,colStart);

  }

  GameSDK.regiterBot(defenderBotName,engineers,defenderLogic);

})();


(function emptyBotlogic(){

  var botName = "EmptyBot";
  var engineers =["Hagay","Avisar","Empty"];

  function emptyBotlogic(){

    return null;
  }

  GameSDK.regiterBot(botName,engineers,emptyBotlogic);

})();





