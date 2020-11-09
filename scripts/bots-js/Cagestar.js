

(function Cagestarlogic() {
  var botName = "Cagestar";
  var engineers = ["Carol", "Vivek"];
  var defend_row = 55;
  var vv = 1;

  function Cagebotlogic(data) {
    var budget = data.budget;
    var generation = data.generation;
    var dimensions = data.matrix;


    if ((generation % 9) === 0
        & (generation / 9) <= 24) {
      var colStart = (generation / 9 - 1) * 9 + 7;
      return createGlider_1(
          dimensions.rows - 6 - ((generation / 9) % 2) * 6,
          colStart);
    }
    if ((generation / 9) > 24
        && (generation % 13) === 0) {
      var colStart = (generation - 216) % dimensions.cols;
      if (colStart <= 13) {
        defend_row -= 6;
        if (defend_row <= 15) {
          defend_row = 55;
        }
      }
      return createGlider_3(dimensions.rows - 6, colStart).concat(
          createGlider_2(defend_row, colStart));
    } else {
      return null;
    }
  }

  function createGlider_1(rowStart, colStart) {
    if ((vv % 2) === 0) {
      vv = vv + 1;
      var cellsPosition = [[0, 1], [0, 3],
        [1, 0],
        [2, 0],
        [3, 0], [3, 3],
        [4, 0], [4, 1], [4, 2]];
      return setCellsAccordingToPosition(cellsPosition, rowStart, colStart);
    } else {
      vv = vv + 1;
      var cellsPosition = [[0, 0],
        [1, 1],
        [2, -1], [2, 0], [2, 1]];
      return setCellsAccordingToPosition(cellsPosition, rowStart - 5, colStart);
    }
  }

  function createGlider_2(rowStart, colStart) {
    var cellsPosition = [[0, 0], [0, 1],
      [1, 0], [1, 1]];
    return setCellsAccordingToPosition(cellsPosition, rowStart, colStart);
  }

  function createGlider_3(rowStart, colStart) {
    var cellsPosition = [[0, 1], [0, 3],
      [1, 0],
      [2, 0],
      [3, 0], [3, 3],
      [4, 0], [4, 1], [4, 2]];
    return setCellsAccordingToPosition(cellsPosition, rowStart, colStart);
  }

  GameSDK.regiterBot(botName, engineers, Cagebotlogic);
})();



