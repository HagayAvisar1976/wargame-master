(function talusBot() {
  let botName = "Talus";
  let engineers = ["Ariel", "Yulian"];
  let lwssC = 0;
  let engineC = 0;
  let blockC = 0;
  let tetrominoC = 0;
  let expolsionC = 0;

  function botLogic(data) {
    var budget = data.budget;
    var dimensions = data.matrix;
    let currentGeneration = data.generation

    let result;
    if (currentGeneration < 338) {
      result = attackStrategy(currentGeneration,budget,dimensions);
    } else if (currentGeneration < 420) {
      result = tetrominoStrategy(currentGeneration,budget);
    } else if (currentGeneration < 800) {
      result = blockStrategy(budget);
    } else if (currentGeneration < 1500) {
      result = attackStrategy(currentGeneration,budget,dimensions);
    } else if (currentGeneration < 1800) {
      result = explosionStrategy(currentGeneration,budget,dimensions);
    } else {
      result = attackStrategy(currentGeneration,budget,dimensions);
    }

    if (result == null && budget > 20) {
      let cg = currentGeneration;
      return build("Dot", getDot(), 40 - Math.floor(cg / 1000),
          currentGeneration % dimensions.cols);
    } else {
      return result;
    }

    function tetrominoStrategy(generation,budget) {
      let cg = generation;
      if (budget < 5) return null;

      if (cg % 4 === 1) {
        return startTetromino();
      }
    }

    function explosionStrategy(generation,budget,dimensions) {
      let cg = generation;
      if (budget < 8) return null;

      if (cg % 8 === 0) {
        return startExplosion(dimensions);
      }
    }

    function attackStrategy(generation,budget,dimensions) {
      let cg = generation;
      if (budget < 10) return null;

      if (cg % 82 === 8) {
        return startEngine(dimensions);
      } else if ((cg % 82 - 10) % 9 === 0) {
        return startLwss(dimensions);
      }
    }

    function blockStrategy(budget) {
      if (budget < 5) return null;

      return startBlock();
    }

    function startBlock() {
      let direction = Math.pow(-1, blockC % 2);
      let nsign = direction > 0 ? 0 : 1;
      let offset = Math.floor(blockC / 2) % 20 // 20 each side
      let start = nsign * 235 + direction * offset * 6 + Math.floor(blockC / 41)
          * 4;
      if (start > 240) start = start - 240;
      blockC++;
      return build("Block ", getBlockCells(), 7 + Math.floor(blockC / 41) * 6,
          start);
    }

    function startTetromino() {
      let direction = Math.pow(-1, tetrominoC % 2);
      let nsign = direction > 0 ? 0 : 1;
      let offset = Math.floor(tetrominoC) % 20 // 20 each side
      let start = nsign * 235 + (direction * offset * 6 + 5) + Math.floor(
          tetrominoC / 40) * 4;
      if (start > 240) start = start - 240;
      tetrominoC++;
      return build("Tetromino ", getTTetrominoCells(),
          35 + Math.floor(blockC / 40) * 4, start);
    }

    function startEngine(dimensions) {
      let direction = Math.pow(-1, engineC % 2);
      let nsign = direction > 0 ? 0 : 1;
      let offset = Math.floor(engineC / 2) % 2 + 1 // 3 each side
      let start = nsign * 235 + direction * offset * 40;
      engineC++;
      return build("Engine", getSwitchEngineCells(),
          dimensions.rows - 5, start);
    }

    function startExplosion(dimensions) {
      let direction = Math.pow(-1, expolsionC % 2);
      let nsign = direction > 0 ? 0 : 1;
      let offset = Math.floor(expolsionC / 2) % 3 + 1 // 3 each side
      let start = nsign * 235 + direction * offset * 40;
      expolsionC++;
      return build("EHeptomino", getEHeptominoCells(),
          dimensions.rows - 5, start);
    }

    function startLwss(dimensions) {
      lwssC++;
      let direction = Math.pow(-1, lwssC % 2);
      let start = lwssC % 2 * 235;
      let offset = Math.ceil(lwssC / 2) % 6 // 6 lwss each side
      return build("Lwss ", getLwssCells(),
          dimensions.rows - 5,
          start + direction * offset * 5);
    }

    function build(name, cells, row, col) {
      return setCellsAccordingToPosition(cells, row, col);
    }
  }

  function getBlockCells() {
    return [[0,0],[0,1],[1,0]];
  }

  function getLwssCells() {
    return [[0,0], [0,2], [1,3],[2,3], [3,0], [3,3] , [4,1], [4,2], [4,3]];
  }

  function getSwitchEngineCells() {
    return [[0,0], [0,1], [0,2],[1,1], [1,4], [2,5], [3,2], [3,4]];
  }

  function getEHeptominoCells() {
    return [[0,1], [0,2], [1,2], [1,3],[2,0], [2,1], [2,2]];
  }

  function getTTetrominoCells() {
    return [[0,0], [0,1], [0,2],[1,1]];
  }

  function getDot() {
    return [[0, 0]];
  }


  GameSDK.regiterBot(botName, engineers, botLogic);
})();


