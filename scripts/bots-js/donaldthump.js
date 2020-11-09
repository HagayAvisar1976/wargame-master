(function DonaldThump() {
  var botName = "DonaldThump";
  var engineers = ["Sagar", "Long", "Madhura"];
  var cnt = 0;
  var colCnt = 0;
  var attack = true;
  var NUM_OF_SPACESHIP_PER_LINE = 22;
  var NUM_OF_DEFENDER_BLOCK_PER_LINE = 40;
  var DEFENDER_FONT_LINE = 69;
  var DEFENDER_BACK_LINE = 65;
  var ATTACKER_CELLS = 11;
  var DEFENDER_CELLS = 6;
  var defenderBotName_row = DEFENDER_FONT_LINE;

  function botLogic(data) {
    if (attack === true) {
      return attackerBotLogic(data);
    } else {
      return defenderLogic(data);
    }
  }

  function attackerBotLogic(data) {
    var budget = data.budget;
    var generation = data.generation;
    var dimensions = data.matrix;



    if ((generation % ATTACKER_CELLS) === 0) {
      cnt = (cnt + 1) % NUM_OF_SPACESHIP_PER_LINE;
      if (cnt === NUM_OF_SPACESHIP_PER_LINE - 1) {
        attack = false;
      }
      var rowStart = dimensions.rows - 6;
      var colStart = cnt * ATTACKER_CELLS;
      return createSpaceship(rowStart, colStart);
    } else {
      return null;
    }
  }

  function createSpaceship(rowStart, colStart) {
    var cellsPosition = [[0, 0], [0, 2],
      [1, -1],
      [2, -1], [2, 3],
      [3, -1],
      [4, -1], [4, 2],
      [5, -1], [5, 0], [5, 1]];
    return setCellsAccordingToPosition(cellsPosition, rowStart, colStart);
  }

  function defenderLogic(data) {
    var budget = data.budget;
    var generation = data.generation;
    var dimensions = data.matrix;


    if (budget >= DEFENDER_CELLS && (generation
        % DEFENDER_CELLS) == 0) {
      if (colCnt + 4 > NUM_OF_DEFENDER_BLOCK_PER_LINE) {
        attack = true;
      }
      colCnt = (colCnt + 2) % NUM_OF_DEFENDER_BLOCK_PER_LINE;
      var colStart = colCnt * DEFENDER_CELLS;
      if (colStart <= 3) {
        defenderBotName_row -= 8;
        if (defenderBotName_row <= DEFENDER_BACK_LINE) {
          defenderBotName_row = DEFENDER_FONT_LINE;
        }
      }
      return createBlock(defenderBotName_row, colStart);
    }
    return null;
  }

  function createBlock(rowStart, colStart) {
    var cellsPosition = [[0, 0], [0, 1], [0, 2],
      [1, -1], [1, 0], [1, 1]];
    return setCellsAccordingToPosition(cellsPosition, rowStart, colStart);
  }

  GameSDK.regiterBot(botName, engineers, botLogic);
})();
