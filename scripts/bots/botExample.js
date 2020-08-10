
(function attackerBot(){

  var botName = "AttackerBot";
  var engineers =["Hagay","Avisar","Attacker"];

  function attackerBotLogic(){
    var budget = GameEngineSDK.getMyBudget(botName);

    if((GameEngineSDK.currentGeneration() % 20) === 0){
      var dimensions = GameEngineSDK.getMatrixDimensions();
      var colStart = GameEngineSDK.currentGeneration() % dimensions.cols;
      return createGlider(dimensions.rows - 20,colStart);
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

  GameEngineSDK.regiterBot(botName,engineers,attackerBotLogic);


})();


(function defenderBot(){

  var defenderBotName = "DefenderBot";
  var engineers =["Hagay","Avisar","Defender"];

  var defenderBotName_row = 40;

  function defenderLogic(){
    var budget = GameEngineSDK.getMyBudget(defenderBotName);

    if(budget >=4 && (GameEngineSDK.currentGeneration() % 4) == 0) {
      var colStart = GameEngineSDK.currentGeneration() %  GameEngineSDK.getMatrixDimensions().cols;
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

  GameEngineSDK.regiterBot(defenderBotName,engineers,defenderLogic);

})();


(function emptyBotlogic(){

  var engineers =["Hagay","Avisar","Empty"];

  function emptyBotlogic(){

    return null;
  }

  GameEngineSDK.regiterBot("EmptyBot",engineers,emptyBotlogic);

})();



function setCellsAccordingToPosition (cellsPosition,rowStart,colStart) {
  var cellsToUpdate = [];
  for(var i=0; i< cellsPosition.length;i++){
    var offset = cellsPosition[i];
    var row = rowStart + offset[0];
    var col = colStart + offset[1];
    cellsToUpdate.push(new cell(row, col));
  }

  return cellsToUpdate;
}
