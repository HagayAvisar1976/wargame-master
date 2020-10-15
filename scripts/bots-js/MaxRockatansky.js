(function MaxRockatansky() {

  var botName = "MaxRockatansky";
  var engineers = ["Cleiver", "Vlad", "Rich"];
  var dimensions = GameSDK.getMatrixDimensions();
  var rows = dimensions.rows
  var col = dimensions.col
  var rowsStart = Math.floor(dimensions.rows * 1 / 3);
  var rowsEnd = Math.floor(dimensions.rows * 2 / 3);
  var defenderBotName_row = rows * 0.7;
  var counter = 10

  function maxRockatanskyLogic() {
    var budget = GameSDK.getMyBudget(botName);
    /* console.log("generation: ", GameSDK.getCurrentGeneration(), "budget: ", budget) */
    if (((GameSDK.getCurrentGeneration() > 0) && (GameSDK.getCurrentGeneration()
        < 225))
        || ((GameSDK.getCurrentGeneration() > 4000)
            && (GameSDK.getCurrentGeneration() < 4225))
        /* || ((GameSDK.getCurrentGeneration() > 6450) && (GameSDK.getCurrentGeneration() < 6675))  */
        /* || ((GameSDK.getCurrentGeneration() > 8000) && (GameSDK.getCurrentGeneration() < 8225))	 */

    ) {

      var rowStart = rowsEnd;
      var colStart = GameSDK.getCurrentGeneration() % dimensions.cols;
      attack = createEater1(rows * 0.8, colStart)
      return attack

    }

    if (GameSDK.getCurrentGeneration() % 10 == 0) {
      var rowStart = rowsEnd;
      var colStart = GameSDK.getCurrentGeneration()
          % GameSDK.getMatrixDimensions().cols

      if (colStart <= 3) {
        defenderBotName_row -= 5;
        if (defenderBotName_row <= rows * 0.55) {
          defenderBotName_row = rows * 0.7;
        }
      }
      defend = createBlock(defenderBotName_row, colStart)
      return defend

    } else if (GameSDK.getCurrentGeneration() < 1000) {
      if (GameSDK.getCurrentGeneration() % 16 == 0) {
        var rowStart = rowsEnd;
        // rowsStart + Math.floor((rowsEnd-rowsStart)/2);
        var colStart = GameSDK.getCurrentGeneration() % dimensions.cols;
        attack = createGlider(dimensions.rows - 10, dimensions.rows + 15)
        return attack
      } else if (GameSDK.getCurrentGeneration() % 16 == 4) {
        var rowStart = rowsEnd;
        var colStart = GameSDK.getCurrentGeneration() % dimensions.cols;
        attack = createGlider(dimensions.rows - 10, dimensions.rows + 25)
        return attack

      } else if (GameSDK.getCurrentGeneration() % 16 == 8) {
        var rowStart = rowsEnd;
        var colStart = GameSDK.getCurrentGeneration() % dimensions.cols;
        attack = createGlider(dimensions.rows - 10, dimensions.rows + 35)
        return attack

      }

    } else if ((GameSDK.getCurrentGeneration() > 1050)
        && (GameSDK.getCurrentGeneration() < 2050)) {
      if (GameSDK.getCurrentGeneration() % 16 == 0) {
        var rowStart = rowsEnd;
        // rowsStart + Math.floor((rowsEnd-rowsStart)/2);
        var colStart = GameSDK.getCurrentGeneration() % dimensions.cols;
        attack = createGlider2(dimensions.rows - 10, dimensions.rows + 15)
        return attack
      } else if (GameSDK.getCurrentGeneration() % 16 == 4) {
        var rowStart = rowsEnd;
        var colStart = GameSDK.getCurrentGeneration() % dimensions.cols;
        attack = createGlider2(dimensions.rows - 10, dimensions.rows + 35)
        return attack

      }

      if (GameSDK.getCurrentGeneration() % 16 == 8) {
        var rowStart = rowsEnd;
        // rowsStart + Math.floor((rowsEnd-rowsStart)/2);
        var colStart = GameSDK.getCurrentGeneration() % dimensions.cols;
        attack = createGlider2(dimensions.rows - 10, dimensions.rows + 55)
        return attack
      }

    } else if ((GameSDK.getCurrentGeneration() > 2100)
        && (GameSDK.getCurrentGeneration() < 3100)) {
      if (GameSDK.getCurrentGeneration() % 16 == 0) {
        var rowStart = rowsEnd;
        // rowsStart + Math.floor((rowsEnd-rowsStart)/2);
        var colStart = GameSDK.getCurrentGeneration() % dimensions.cols;
        attack = createGlider(dimensions.rows - 10, dimensions.rows + 10)
        return attack
      } else if (GameSDK.getCurrentGeneration() % 16 == 4) {
        var rowStart = rowsEnd;
        var colStart = GameSDK.getCurrentGeneration() % dimensions.cols;
        attack = createGlider(dimensions.rows - 10, dimensions.rows + 40)
        return attack

      } else if (GameSDK.getCurrentGeneration() % 16 == 8) {
        var rowStart = rowsEnd;
        var colStart = GameSDK.getCurrentGeneration() % dimensions.cols;
        attack = createGlider(dimensions.rows - 10, dimensions.rows + 70)
        return attack

      }

    } else if ((GameSDK.getCurrentGeneration() > 3150)
        && (GameSDK.getCurrentGeneration() < 4150)) {
      if (GameSDK.getCurrentGeneration() % 16 == 0) {
        var rowStart = rowsEnd;
        // rowsStart + Math.floor((rowsEnd-rowsStart)/2);
        var colStart = GameSDK.getCurrentGeneration() % dimensions.cols;
        attack = createGlider2(dimensions.rows - 10, dimensions.rows + 10)
        return attack
      } else if (GameSDK.getCurrentGeneration() % 16 == 4) {
        var rowStart = rowsEnd;
        var colStart = GameSDK.getCurrentGeneration() % dimensions.cols;
        attack = createGlider2(dimensions.rows - 10, dimensions.rows + 40)
        return attack

      }

      if (GameSDK.getCurrentGeneration() % 16 == 8) {
        var rowStart = rowsEnd;
        // rowsStart + Math.floor((rowsEnd-rowsStart)/2);
        var colStart = GameSDK.getCurrentGeneration() % dimensions.cols;
        attack = createGlider2(dimensions.rows - 10, dimensions.rows + 70)
        return attack
      }

    } else if ((GameSDK.getCurrentGeneration() > 4200)
        && (GameSDK.getCurrentGeneration() < 5200)) {
      if (GameSDK.getCurrentGeneration() % 16 == 0) {
        var rowStart = rowsEnd;
        // rowsStart + Math.floor((rowsEnd-rowsStart)/2);
        var colStart = GameSDK.getCurrentGeneration() % dimensions.cols;
        attack = createGlider(dimensions.rows - 10, dimensions.rows + 5)
        return attack
      } else if (GameSDK.getCurrentGeneration() % 16 == 4) {
        var rowStart = rowsEnd;
        var colStart = GameSDK.getCurrentGeneration() % dimensions.cols;
        attack = createGlider(dimensions.rows - 10,
            dimensions.rows + (counter + 15))
        return attack

      } else if (GameSDK.getCurrentGeneration() % 16 == 8) {
        var rowStart = rowsEnd;
        var colStart = GameSDK.getCurrentGeneration() % dimensions.cols;
        attack = createGlider(dimensions.rows - 10,
            dimensions.rows + (counter + 65))
        return attack

      }

    } else if ((GameSDK.getCurrentGeneration() > 5250)
        && (GameSDK.getCurrentGeneration() < 6250)) {
      if (GameSDK.getCurrentGeneration() % 16 == 0) {
        var rowStart = rowsEnd;
        // rowsStart + Math.floor((rowsEnd-rowsStart)/2);
        var colStart = GameSDK.getCurrentGeneration() % dimensions.cols;
        attack = createGlider2(dimensions.rows - 10, dimensions.rows + 5)
        return attack
      } else if (GameSDK.getCurrentGeneration() % 16 == 4) {
        var rowStart = rowsEnd;
        var colStart = GameSDK.getCurrentGeneration() % dimensions.cols;
        attack = createGlider2(dimensions.rows - 10, dimensions.rows + 15)
        return attack

      }

      /* 	if (GameSDK.getCurrentGeneration()%16 == 2 ){
            var rowStart = rowsEnd;
            // rowsStart + Math.floor((rowsEnd-rowsStart)/2);
            var colStart = GameSDK.getCurrentGeneration() %  dimensions.cols;
              attack =  createGlider2(dimensions.rows -10, dimensions.rows+40)
            return attack
          } */

      if (GameSDK.getCurrentGeneration() % 16 == 8) {
        var rowStart = rowsEnd;
        // rowsStart + Math.floor((rowsEnd-rowsStart)/2);
        var colStart = GameSDK.getCurrentGeneration() % dimensions.cols;
        attack = createGlider2(dimensions.rows - 10, dimensions.rows + 65)
        return attack
      }

    } else if ((GameSDK.getCurrentGeneration() > 6300)
        && (GameSDK.getCurrentGeneration() < 7300)) {
      if (GameSDK.getCurrentGeneration() % 16 == 0) {
        var rowStart = rowsEnd;
        // rowsStart + Math.floor((rowsEnd-rowsStart)/2);
        var colStart = GameSDK.getCurrentGeneration() % dimensions.cols;
        attack = createGlider(dimensions.rows - 10, dimensions.rows + 20)
        return attack
      } else if (GameSDK.getCurrentGeneration() % 16 == 4) {
        var rowStart = rowsEnd;
        var colStart = GameSDK.getCurrentGeneration() % dimensions.cols;
        attack = createGlider(dimensions.rows - 10, dimensions.rows + 40)
        return attack

      } else if (GameSDK.getCurrentGeneration() % 16 == 8) {
        var rowStart = rowsEnd;
        var colStart = GameSDK.getCurrentGeneration() % dimensions.cols;
        attack = createGlider(dimensions.rows - 10, dimensions.rows + 60)
        return attack

      }

    } else if ((GameSDK.getCurrentGeneration() > 7350)
        && (GameSDK.getCurrentGeneration() < 8350)) {
      if (GameSDK.getCurrentGeneration() % 16 == 0) {
        var rowStart = rowsEnd;
        // rowsStart + Math.floor((rowsEnd-rowsStart)/2);
        var colStart = GameSDK.getCurrentGeneration() % dimensions.cols;
        attack = createGlider2(dimensions.rows - 10, dimensions.rows + 20)
        return attack
      } else if (GameSDK.getCurrentGeneration() % 16 == 4) {
        var rowStart = rowsEnd;
        var colStart = GameSDK.getCurrentGeneration() % dimensions.cols;
        attack = createGlider2(dimensions.rows - 10, dimensions.rows + 40)
        return attack

      }

      /* 	if (GameSDK.getCurrentGeneration()%16 == 2 ){
            var rowStart = rowsEnd;
            // rowsStart + Math.floor((rowsEnd-rowsStart)/2);
            var colStart = GameSDK.getCurrentGeneration() %  dimensions.cols;
              attack =  createGlider2(dimensions.rows -10, dimensions.rows+40)
            return attack
          } */

      if (GameSDK.getCurrentGeneration() % 16 == 8) {
        var rowStart = rowsEnd;
        // rowsStart + Math.floor((rowsEnd-rowsStart)/2);
        var colStart = GameSDK.getCurrentGeneration() % dimensions.cols;
        attack = createGlider2(dimensions.rows - 10, dimensions.rows + 60)
        return attack
      }

    } else if (GameSDK.getCurrentGeneration() > 8400) {
      if (GameSDK.getCurrentGeneration() % 16 == 0) {
        var rowStart = rowsEnd;
        // rowsStart + Math.floor((rowsEnd-rowsStart)/2);
        var colStart = GameSDK.getCurrentGeneration() % dimensions.cols;
        attack = createGlider(dimensions.rows - 10, dimensions.rows + 10)
        return attack
      } else if (GameSDK.getCurrentGeneration() % 16 == 4) {
        var rowStart = rowsEnd;
        var colStart = GameSDK.getCurrentGeneration() % dimensions.cols;
        attack = createGlider(dimensions.rows - 10, dimensions.rows + 50)
        return attack

      } else if (GameSDK.getCurrentGeneration() % 16 == 8) {
        var rowStart = rowsEnd;
        var colStart = GameSDK.getCurrentGeneration() % dimensions.cols;
        attack = createGlider(dimensions.rows - 10, dimensions.rows + 65)
        return attack

      }

    }

    return null

  }

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function createEater1(rowStart, colStart) {
    var cellsPosition = [

      [-3, -1], [-3, -2],
      [-2, -2],
      [-1, -2],
      [-1, -4], [0, -3], [0, -4]
    ];
    return setCellsAccordingToPosition(cellsPosition, rowStart, colStart);

  }

  function createGlider(rowStart, colStart) {

    var cellsPosition = [[0, 0],
      [1, 1],
      [2, -1], [2, 0], [2, 1]];

    return setCellsAccordingToPosition(cellsPosition, rowStart, colStart);
  }

  function createGlider2(rowStart, colStart) {

    var cellsPosition = [[0, 0],
      [1, -1],
      [2, -1], [2, 0], [2, 1]];

    return setCellsAccordingToPosition(cellsPosition, rowStart, colStart);
  }

  function createBlock(rowStart, colStart) {

    var cellsPosition = [[0, 0], [0, 1],
      [1, 0], [1, 1]];

    return setCellsAccordingToPosition(cellsPosition, rowStart, colStart);

  }

  function createtube(rowStart, colStart) {

    var cellsPosition = [[1, 0], [0, 1],
      [-1, 0], [0, -1]];

    return setCellsAccordingToPosition(cellsPosition, rowStart, colStart);

  }

  GameSDK.regiterBot(botName, engineers, maxRockatanskyLogic);

})();
