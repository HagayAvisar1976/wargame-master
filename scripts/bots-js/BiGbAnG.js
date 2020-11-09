
(function BiGbAnGBot() {

  var botName = "BiGbAnG";
  var engineers = ["Abin", "Max", "Tony"];

  var gliderGunCounter = 0;
  var gliderCol = 0;
  var leftGun = true;

  function BiGbAnGBotLogic(data) {
    var budget = data.budget;
    var generation = data.generation;
    var dimensions = data.matrix;
    var rows = dimensions.rows;
    var cols = dimensions.cols;

    if (budget > 36 && gliderGunCounter < (cols / 35)) {
      return createGosperGliderGunRight(rows - 37, 35 * gliderGunCounter++);
    }
    if (budget > 6 && generation > 600 && leftGun == true) {
      let temp = gliderCol;
      if (6 * gliderCol >= (cols / 1.3)) {
        gliderCol = -1;
        leftGun = false;
      }
      gliderCol++;
      return createGliderLeft(rows - 3, (6 * temp) + 1);
    } else if (budget > 6 && generation > 600 && leftGun
        != true) {
      let temp = gliderCol;
      if ((Math.floor(cols * 0.26) + (6 * gliderCol)) >= (cols - 2)) {
        gliderCol = -1;
        leftGun = true;
      }
      gliderCol++;
      return createGliderRight(rows - 3,
          Math.floor(cols * 0.26) + (6 * temp) - 4);
    }
  }

  function createGliderRight(rowStart, colStart) {
    var cellsPosition = [[0, 0],
      [1, -1],
      [2, 1], [2, 0], [2, -1]];

    return setCellsAccordingToPosition(cellsPosition, rowStart, colStart);
  }

  function createGliderLeft(rowStart, colStart) {
    var cellsPosition = [[0, 0],
      [1, 1],
      [2, -1], [2, 0], [2, 1]];

    return setCellsAccordingToPosition(cellsPosition, rowStart, colStart);
  }

  function createGosperGliderGunRight(rowStart, colStart) {
    var cellsPosition = [[1, 5], [1, 6], [2, 5], [2, 6], [11, 5],
      [11, 6], [11, 7], [12, 4], [12, 8], [13, 3], [13, 9],
      [14, 3], [14, 9], [15, 6], [16, 4], [16, 8], [17, 5],
      [17, 6], [17, 7], [18, 6], [21, 3], [21, 4], [21, 5],
      [22, 3], [22, 4], [22, 5], [23, 2], [23, 6], [25, 1], [25, 2],
      [25, 6], [25, 7], [35, 3], [35, 4], [36, 3], [36, 4]];
    return setCellsAccordingToPosition(cellsPosition, rowStart, colStart);
  }

  GameSDK.regiterBot(botName, engineers, BiGbAnGBotLogic);
})();
