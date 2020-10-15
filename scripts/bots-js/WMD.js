(function WMDBot() {

  var botName = "WMD";
  var engineers = ["Tom", "Alpha", "Raji"];
  var col = 11;
  var col_space2 = 26;
  var dimensions = GameSDK.getMatrixDimensions();
  var gen = 0;
  var defenderBotName_row = 50;
  var colStart = (dimensions.cols + 5);
  var colStart1 = (dimensions.cols + 5);

  function WMDBotLogic() {
    var budget = GameSDK.getMyBudget(botName);
    if (col_space2 < dimensions.cols && colStart1 <= 0) {
      gen += 1;
      if (((gen) % 8) === 1 && col <= 180) {
        col += 14;
        return createGlider(77, col - 22);
      }
      if ((gen - 129) % 8 === 1) {
        col_space2 += 14;
        return createSpaceship2(75, col_space2 - 16);
      }
    }
    if (budget >= 32) {
      colStart -= 8;
      colStart1 -= 4;
      if (colStart <= 0) {
        if (defenderBotName_row === 60) {
          defenderBotName_row -= 20;
        }
        defenderBotName_row += 10;
        colStart = (dimensions.cols + 5);
        if (defenderBotName_row === 60) {
          colStart = (dimensions.cols + 9);
        }
      }
      return createBlock(defenderBotName_row, colStart - 4);
    }

    if (col_space2 >= dimensions.cols) {
      gen = 0;
      col = 11;
      col_space2 = 26;
    }
  }

  function createGlider(rowStart, colStart) {

    var cellsPosition = [[0, 1],
      [1, 2],
      [2, 0], [2, 1], [2, 2]];

    return setCellsAccordingToPosition(cellsPosition, rowStart, colStart);

  }

  function createBlock(rowStart, colStart) {

    var cellsPosition = [[0, 0], [0, 1],
      [1, 0]];

    return setCellsAccordingToPosition(cellsPosition, rowStart, colStart);

  }

  function createSpaceship2(rowStart, colStart) {
    var cellsPosition = [[0, 0], [0, 2],
      [1, 3],
      [2, 3],
      [3, 0], [3, 3],
      [4, 1], [4, 2], [4, 3]];
    return setCellsAccordingToPosition(cellsPosition, rowStart, colStart);
  }

  GameSDK.regiterBot(botName, engineers, WMDBotLogic);

})();
