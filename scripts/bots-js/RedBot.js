(function redBot(){

  var botName = "RED";
  var engineers =["Evgeny", "Rawan", "Diana"];

  var ALW = 10;
  var AC = 9;
  var AL = 7;
  var AC2 = 11;
  var AL2 = 7;

  function doLogic() {

    var budget = GameSDK.getMyBudget(botName);
    var generation = GameSDK.getCurrentGeneration()
    var dimensions = GameSDK.getMatrixDimensions();

    var AN = Math.round(dimensions.cols / ALW);
    if (AN % 2 == 1) {
      AN--;
    }

    var M = ((AN + 1) * AC);
    var g = generation % M;
    var b = budget;
    var i;

    var mirror = Math.random() > 0.5;
    var offset = Math.round(2 * Math.random());
    var phase1 = (generation < 5 * AN * AC);
    var phase2 = (generation < 6 * AN * AC);

    if (phase1) {
      i = Math.floor(g / AC) - 1;
      if (i >= 0 && i < AN) {
        var j = (i % 2 == 0) ? i : AN - i;
        if (b > AC) {
          var x = getLaneCenter(j, AN, ALW, dimensions.cols);
          return createLWSS(dimensions.rows - AL - offset, x, mirror);
        }
        return null;
      }
    }

    if (budget >= AC2) {
      j = Math.floor(Math.random() * AN);
      if (phase2) {
        j = Math.floor(5 + Math.random() * (AN - 6));
      }
      var x = getLaneCenter(j, AN, ALW, dimensions.cols) + Math.round(2 * Math.random());
      if (phase2 || Math.random() < 0.7) {
        return createMWSS(dimensions.rows - AL - offset, x, mirror);
      }
      return nukeIt(dimensions.rows - AL2 - offset, x, mirror);
    }

    return null;
  }

  function getLaneCenter(i,N,LW,cols) {
    var edge = Math.round((cols - N * LW) / 2);
    return Math.round(edge + i * LW + LW / 2);
  }

  function createLWSS(rowStart,colStart,mirror) {
    var cells = [ [4,0],  [4,1],  [4,2],
                  [3,0],                 [3,3],
                  [2,0],
                  [1,0],
                          [0,1],         [0,3]];
    if (mirror) {
      cells = mirrorVert(cells);
    }
    return setCellsAccordingToPosition(cells, rowStart, colStart);
  }

  function createMWSS(rowStart,colStart,mirror) {
    var cells = [         [0,-1],         [0,1],
      [1,2],
      [2,-2],                         [2,2],
      [3,2],
      [4,-1],                 [4,2],
      [5,0],  [5,1],  [5,2]];
    if (mirror) {
      cells = mirrorVert(cells);
    }
    return setCellsAccordingToPosition(cells, rowStart, colStart);
  }

  function mirrorVert(cells) {
    for (var i = 0; i < cells.length; i++) {
      var c = cells[i];
      c[1] = -c[1]
    }
    return cells;
  }

  function nukeIt(rowStart,colStart,mirror) {
    var cells = [
      [0,-1],         [0,1],
      [1,-1], [1,0]   [1,1],
              [2,0],
    ];
    return setCellsAccordingToPosition(cells, rowStart, colStart);
  }

  GameSDK.regiterBot(botName,engineers,doLogic);


})();