(function MaxRockatansky() {

  var botName = "MaxRockatansky";
  var engineers = ["Cleiver", "Vlad", "Rich"];


  function maxRockatanskyLogic(data) {
    var budget = data.budget;
    var generation = data.generation;
    var dimensions = data.matrix;
    var rows = dimensions.rows
    var col = dimensions.col
    var rowsStart = Math.floor(dimensions.rows * 1 / 3);
    var rowsEnd = Math.floor(dimensions.rows * 2 / 3);
    var defenderBotName_row = rows * 0.7;
    var counter = 10


    if (((generation > 0) && (generation < 225))
        || ((generation > 4000)
            && (generation < 4225))
        /* || ((generation > 6450) && (generation < 6675))  */
        /* || ((generation > 8000) && (generation < 8225))	 */

    ) {

      var rowStart = rowsEnd;
      var colStart = generation % dimensions.cols;
      attack = createEater1(rows * 0.8, colStart)
      return attack

    }

    if (generation % 10 == 0) {
      var rowStart = rowsEnd;
      var colStart = generation
          % dimensions.cols

      if (colStart <= 3) {
        defenderBotName_row -= 5;
        if (defenderBotName_row <= rows * 0.55) {
          defenderBotName_row = rows * 0.7;
        }
      }
      defend = createBlock(defenderBotName_row, colStart)
      return defend

    } else if (generation < 1000) {
      if (generation % 16 == 0) {
        var rowStart = rowsEnd;
        // rowsStart + Math.floor((rowsEnd-rowsStart)/2);
        var colStart = generation % dimensions.cols;
        attack = createGlider(dimensions.rows - 10, dimensions.rows + 15)
        return attack
      } else if (generation % 16 == 4) {
        var rowStart = rowsEnd;
        var colStart = generation % dimensions.cols;
        attack = createGlider(dimensions.rows - 10, dimensions.rows + 25)
        return attack

      } else if (generation % 16 == 8) {
        var rowStart = rowsEnd;
        var colStart = generation % dimensions.cols;
        attack = createGlider(dimensions.rows - 10, dimensions.rows + 35)
        return attack

      }

    } else if ((generation > 1050)
        && (generation < 2050)) {
      if (generation % 16 == 0) {
        var rowStart = rowsEnd;
        // rowsStart + Math.floor((rowsEnd-rowsStart)/2);
        var colStart = generation % dimensions.cols;
        attack = createGlider2(dimensions.rows - 10, dimensions.rows + 15)
        return attack
      } else if (generation % 16 == 4) {
        var rowStart = rowsEnd;
        var colStart = generation % dimensions.cols;
        attack = createGlider2(dimensions.rows - 10, dimensions.rows + 35)
        return attack

      }

      if (generation % 16 == 8) {
        var rowStart = rowsEnd;
        // rowsStart + Math.floor((rowsEnd-rowsStart)/2);
        var colStart = generation % dimensions.cols;
        attack = createGlider2(dimensions.rows - 10, dimensions.rows + 55)
        return attack
      }

    } else if ((generation > 2100)
        && (generation < 3100)) {
      if (generation % 16 == 0) {
        var rowStart = rowsEnd;
        // rowsStart + Math.floor((rowsEnd-rowsStart)/2);
        var colStart = generation % dimensions.cols;
        attack = createGlider(dimensions.rows - 10, dimensions.rows + 10)
        return attack
      } else if (generation % 16 == 4) {
        var rowStart = rowsEnd;
        var colStart = generation % dimensions.cols;
        attack = createGlider(dimensions.rows - 10, dimensions.rows + 40)
        return attack

      } else if (generation % 16 == 8) {
        var rowStart = rowsEnd;
        var colStart = generation % dimensions.cols;
        attack = createGlider(dimensions.rows - 10, dimensions.rows + 70)
        return attack

      }

    } else if ((generation > 3150)
        && (generation < 4150)) {
      if (generation % 16 == 0) {
        var rowStart = rowsEnd;
        // rowsStart + Math.floor((rowsEnd-rowsStart)/2);
        var colStart = generation % dimensions.cols;
        attack = createGlider2(dimensions.rows - 10, dimensions.rows + 10)
        return attack
      } else if (generation % 16 == 4) {
        var rowStart = rowsEnd;
        var colStart = generation % dimensions.cols;
        attack = createGlider2(dimensions.rows - 10, dimensions.rows + 40)
        return attack

      }

      if (generation % 16 == 8) {
        var rowStart = rowsEnd;
        // rowsStart + Math.floor((rowsEnd-rowsStart)/2);
        var colStart = generation % dimensions.cols;
        attack = createGlider2(dimensions.rows - 10, dimensions.rows + 70)
        return attack
      }

    } else if ((generation > 4200)
        && (generation < 5200)) {
      if (generation % 16 == 0) {
        var rowStart = rowsEnd;
        // rowsStart + Math.floor((rowsEnd-rowsStart)/2);
        var colStart = generation % dimensions.cols;
        attack = createGlider(dimensions.rows - 10, dimensions.rows + 5)
        return attack
      } else if (generation % 16 == 4) {
        var rowStart = rowsEnd;
        var colStart = generation % dimensions.cols;
        attack = createGlider(dimensions.rows - 10,
            dimensions.rows + (counter + 15))
        return attack

      } else if (generation % 16 == 8) {
        var rowStart = rowsEnd;
        var colStart = generation % dimensions.cols;
        attack = createGlider(dimensions.rows - 10,
            dimensions.rows + (counter + 65))
        return attack

      }

    } else if ((generation > 5250)
        && (generation < 6250)) {
      if (generation % 16 == 0) {
        var rowStart = rowsEnd;
        // rowsStart + Math.floor((rowsEnd-rowsStart)/2);
        var colStart = generation % dimensions.cols;
        attack = createGlider2(dimensions.rows - 10, dimensions.rows + 5)
        return attack
      } else if (generation % 16 == 4) {
        var rowStart = rowsEnd;
        var colStart = generation % dimensions.cols;
        attack = createGlider2(dimensions.rows - 10, dimensions.rows + 15)
        return attack

      }

      /* 	if (generation%16 == 2 ){
            var rowStart = rowsEnd;
            // rowsStart + Math.floor((rowsEnd-rowsStart)/2);
            var colStart = generation %  dimensions.cols;
              attack =  createGlider2(dimensions.rows -10, dimensions.rows+40)
            return attack
          } */

      if (generation % 16 == 8) {
        var rowStart = rowsEnd;
        // rowsStart + Math.floor((rowsEnd-rowsStart)/2);
        var colStart = generation % dimensions.cols;
        attack = createGlider2(dimensions.rows - 10, dimensions.rows + 65)
        return attack
      }

    } else if ((generation > 6300)
        && (generation < 7300)) {
      if (generation % 16 == 0) {
        var rowStart = rowsEnd;
        // rowsStart + Math.floor((rowsEnd-rowsStart)/2);
        var colStart = generation % dimensions.cols;
        attack = createGlider(dimensions.rows - 10, dimensions.rows + 20)
        return attack
      } else if (generation % 16 == 4) {
        var rowStart = rowsEnd;
        var colStart = generation % dimensions.cols;
        attack = createGlider(dimensions.rows - 10, dimensions.rows + 40)
        return attack

      } else if (generation % 16 == 8) {
        var rowStart = rowsEnd;
        var colStart = generation % dimensions.cols;
        attack = createGlider(dimensions.rows - 10, dimensions.rows + 60)
        return attack

      }

    } else if ((generation > 7350)
        && (generation < 8350)) {
      if (generation % 16 == 0) {
        var rowStart = rowsEnd;
        // rowsStart + Math.floor((rowsEnd-rowsStart)/2);
        var colStart = generation % dimensions.cols;
        attack = createGlider2(dimensions.rows - 10, dimensions.rows + 20)
        return attack
      } else if (generation % 16 == 4) {
        var rowStart = rowsEnd;
        var colStart = generation % dimensions.cols;
        attack = createGlider2(dimensions.rows - 10, dimensions.rows + 40)
        return attack

      }

      /* 	if (generation%16 == 2 ){
            var rowStart = rowsEnd;
            // rowsStart + Math.floor((rowsEnd-rowsStart)/2);
            var colStart = generation %  dimensions.cols;
              attack =  createGlider2(dimensions.rows -10, dimensions.rows+40)
            return attack
          } */

      if (generation % 16 == 8) {
        var rowStart = rowsEnd;
        // rowsStart + Math.floor((rowsEnd-rowsStart)/2);
        var colStart = generation % dimensions.cols;
        attack = createGlider2(dimensions.rows - 10, dimensions.rows + 60)
        return attack
      }

    } else if (generation > 8400) {
      if (generation % 16 == 0) {
        var rowStart = rowsEnd;
        // rowsStart + Math.floor((rowsEnd-rowsStart)/2);
        var colStart = generation % dimensions.cols;
        attack = createGlider(dimensions.rows - 10, dimensions.rows + 10)
        return attack
      } else if (generation % 16 == 4) {
        var rowStart = rowsEnd;
        var colStart = generation % dimensions.cols;
        attack = createGlider(dimensions.rows - 10, dimensions.rows + 50)
        return attack

      } else if (generation % 16 == 8) {
        var rowStart = rowsEnd;
        var colStart = generation % dimensions.cols;
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
