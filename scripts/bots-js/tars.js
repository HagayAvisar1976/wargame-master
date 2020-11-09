(function attackerBot() {

  var botName = "TARS";
  var engineers = ["Rainer Luiz", "Felipe Silva", "Herycklys"];
  var shipOffset = true;

  function attackerBotLogic(data) {

    var budget = data.budget;
    var generation = data.generation;
    var dimensions = data.matrix;
    var edgeX = dimensions.rows;

    if (generation > 7 && generation <= 70) {
      if ((generation % 7) === 0) {
        return createFPentomino(edgeX - 7, ((generation / 7) * 24) - 24);
      }
    }

    if (generation > 70) {
      if ((generation % 9) === 0) {
        if ((generation % 2) === 0) {
          shipOffset = !shipOffset;
          if (shipOffset) {
            return createShip(edgeX - 5, dimensions.cols - 5)
          }
          return createShip(edgeX - 5, dimensions.cols - 6)
        } else {
          if (shipOffset) {
            return createShip(edgeX - 5, 0);
          }
          return createShip(edgeX - 5, 1);
        }
      }
    }

  }

  function createShip(r, c) {
    var position = [
      [0, 0], [0, 2],
      [1, 3],
      [2, 3],
      [3, 0], [3, 3],
      [4, 1], [4, 2], [4, 3]
    ];
    return setCellsAccordingToPosition(position, r, c);
  }

  function createFPentomino(r, c) {
    var position =
        [
          [5, 0],
          [3, 1],
          [0, 2], [1, 2], [2, 2], [5, 2], [6, 2]
        ];
    return setCellsAccordingToPosition(position, r, c);
  }

  GameSDK.regiterBot(botName, engineers, attackerBotLogic);

})();