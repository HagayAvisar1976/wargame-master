
(function LifeGamer() {
  function createGliderLeft(rowStart, colStart) {

    var cellsPosition = [[0, 0],
      [1, -1],
      [2, 1], [2, 0], [2, -1]];

    return setCellsAccordingToPosition(cellsPosition, rowStart, colStart);

  }

  function createGliderRight(rowStart, colStart) {

    var cellsPosition = [[0, 0],
      [1, 1],
      [2, -1], [2, 0], [2, 1]];

    return setCellsAccordingToPosition(cellsPosition, rowStart, colStart);
  }

  var botName = "LifeGamer";
  var engineers = ["Tal, Moran, Pete"];
  var leftGliders = {}
  var rightGliders = {}
  var block_count = 0

  function LifeGamerLogic() {
    var budget = GameSDK.getMyBudget(botName);
    var generation = GameSDK.getCurrentGeneration();
    if (block_count < (240 / 3) && budget > 3) {
      var cellsPosition = [[0, 0], [0, 1], [-1, 0], [-1, 1]];
      block_count++;
      return setCellsAccordingToPosition(cellsPosition, 70, block_count * 3);
    } else if (generation % 500 < 250) {
      var col = Math.floor(Math.random() * 150) + (237 - 150);
      if (budget > 5) {
        var toDel = []
        for (let [key, value] of Object.entries(leftGliders)) {
          if ((generation - parseInt(key)) > 18) {
            toDel.push(key)
          }
        }
        toDel.forEach(k => delete leftGliders[k])

        while (Object.values(leftGliders).some(
            k => ((Math.abs(k - col)) < 7))) {
          col = Math.floor(Math.random() * 150) + (237 - 150);
        }
        leftGliders[generation] = col
        return createGliderLeft(77, col);
      }

    } else if (generation % 500 > 268 && generation % 500 < 482) {
      var col = Math.floor(Math.random() * 150) + 3;
      if (budget > 5) {
        var toDel = []
        for (let [key, value] of Object.entries(rightGliders)) {
          if ((generation - parseInt(key)) > 18) {
            toDel.push(key)
          }
        }
        toDel.forEach(k => delete rightGliders[k])

        while (Object.values(rightGliders).some(
            k => ((Math.abs(k - col)) < 7))) {
          col = Math.floor(Math.random() * 150) + 3;
        }
        rightGliders[generation] = col
        return createGliderRight(77, col);
      }
    }
  }

  GameSDK.regiterBot(botName, engineers, LifeGamerLogic);

})();