(function jKomandoBot() {

  var botName = "JKomando";
  var engineers = ["Pavel", "Jonatan", "Igor"];

  var patterns = [];

  function initPatterns(patterns) {
    let puffer2Pattern = rleToPattern(parse_rle(`b3o11b3o$o2bo10bo2bo$3bo4b3o6bo$3bo4bo2bo5bo$2bo4bo8bo!`), 90);
    puffer2Pattern.rules.push(createConsecutiveRule(puffer2Pattern, 35, [125,73], 30, 34, 20000));
    patterns.push(puffer2Pattern)

    let preBlockPattern = rleToPattern(parse_rle(`ob$2o!!`), 0);
    preBlockPattern.rules.push(createConsecutiveRule(preBlockPattern, 16, [225,27], -7, 18, 540));
    preBlockPattern.rules.push(createConsecutiveRule(preBlockPattern, 16, [9,15], 7, 360, 860));
    preBlockPattern.rules.push(createConsecutiveRule(preBlockPattern, 16, [15,9], 7, 1080, 1600));
    preBlockPattern.rules.push(createConsecutiveRule(preBlockPattern, 16, [221,21], -7, 1620, 2120));
    preBlockPattern.rules.push(createConsecutiveRule(preBlockPattern, 16, [21,39], 7, 2120, 2620));
    preBlockPattern.rules.push(createConsecutiveRule(preBlockPattern, 16, [217,33], -7, 2700, 3200));
    preBlockPattern.rules.push(createConsecutiveRule(preBlockPattern, 16, [210,63], -7, 3000, 3400));
    preBlockPattern.rules.push(createConsecutiveRule(preBlockPattern, 16, [30,68], -7, 3200, 3600));
    preBlockPattern.rules.push(createConsecutiveRule(preBlockPattern, 16, [30,3], 7, 3300, 3700));
    patterns.push(preBlockPattern)

  }

  function jKomandoBotLogic() {

    if (GameSDK.getCurrentGeneration() === 1){
      patterns = []
      initPatterns(patterns);
    }

    var budget = GameSDK.getMyBudget(botName);

    for (let patternPosition = 0; patternPosition < patterns.length;
        patternPosition++) {

      var currentPattern = patterns[patternPosition];

      for (let rulePosition = 0; rulePosition < currentPattern.rules.length;
          rulePosition++) {
        let currentRule = currentPattern.rules[rulePosition];
        if (currentRule.shouldApply(GameSDK.getCurrentGeneration(), budget)) {
          let currentPosition = currentRule.getNextPosition();
          let colStart = currentPosition[0];
          let rowStart = currentPosition[1];
          return setPattern(currentPattern, rowStart, colStart);
        }
      }
    }
    return null;
  }

  function setPattern(pattern, rowStart, colStart) {

    var cellsPosition = pattern.patternCells;

    return setCellsAccordingToPosition(cellsPosition,
        rowStart, colStart);

  }

  function rotatePattern(patternCells, angle) {
    angle = angle * (Math.PI / 180); // convert to radians
    var rotatedPatternCells = [];
    for (var i = 0; i < patternCells.length; i++) {
      var x = patternCells[i][0];
      var y = patternCells[i][1];

      var rotatedX = Math.round(Math.cos(angle) * x - Math.sin(angle) * y);
      var rotatedY = Math.round(Math.sin(angle) * x + Math.cos(angle) * y);

      rotatedPatternCells.push([rotatedX, rotatedY])
    }

    return rotatedPatternCells
  }

  function parse_rle(to_parse) {
    let a = [];
    let count = 0;
    for (let i = 0; i < to_parse.length || to_parse[i] == "!"; i += 1) {
      let it = to_parse[i];
      if (it == "b" || it == "o" || it == "$") {
        if (count == 0) { // probably shouldn't happen
          count = 1;
        }
        for (let j = 0; j < count; j += 1) {
          a.push(it);
        }
        count = 0;
      } else if ("0123456789".includes(it)) {
        count = count * 10 + Number(it);
      }
    }
    return a.join("");
  }

  function rleToPattern(parsedRLE, rotationAngle = 0){
    let x = 0;
    let maxX = 0;
    let y = 0;
    let patternCells = [];
    for (let i = 0; i < parsedRLE.length || parsedRLE[i] == "!"; i += 1) {
      let it = parsedRLE[i];
      if (it == "$") {
        if (maxX < x) {
          maxX = x;
        }
        x = 0;
        y++;
      } else {
        if (it == "o") {
          patternCells.push([x,y])
        }
        x++;
      }
    }

    if (maxX < x) {
      maxX = x;
    }
    let pattern = {};
    pattern.patternCells=rotatePattern(patternCells, rotationAngle);
    pattern.patternSize=patternCells.length;
    pattern.patternHeight=y + 1;
    pattern.patternWidth= maxX;
    pattern.rules = [];
    return pattern;
  }

  function createPositionalRule(pattern, positionsAtGeneration){
  let rule = {};
    rule.currentPositionAtGeneration = 0;
    rule.pattern = pattern;
    rule.shouldApply = function (currentGeneration, budget) {
      return  rule.currentPositionAtGeneration < positionsAtGeneration.length &&
          positionsAtGeneration[rule.currentPositionAtGeneration][0] === currentGeneration
          && rule.pattern.patternSize < budget;
    }

    rule.getNextPosition = function () {
      let position = positionsAtGeneration[rule.currentPositionAtGeneration][1];
      rule.currentPositionAtGeneration++;

      return position;
    }

    return rule;
  }

  function createConsecutiveRule(pattern, increaseGeneration,initialCoordinates, increaseXCoordinate,
      startGeneration = 10, endGeneration= 1000000){
    let rule = {};
    rule.nextPosition = initialCoordinates;
    rule.nextGeneration = startGeneration;
    rule.increaseXCoordinate = increaseXCoordinate;
    rule.pattern = pattern;
    rule.shouldApply = function(currentGeneration, budget) {
      return rule.nextGeneration <= currentGeneration && currentGeneration < endGeneration
          && rule.pattern.patternSize < budget;
    }

    rule.getNextPosition = function(){
      let position = rule.nextPosition;

      function calculateNextPosition(position, increaseXCoordinate,
          initialCoordinates) {
        let nextPosition = [];
        let X_COORDINATE = 0;
        let Y_COORDINATE = 1;
        let dimensions = GameSDK.getMatrixDimensions();

        if ((position[X_COORDINATE] + increaseXCoordinate >= dimensions.cols) ||
            (position[X_COORDINATE] + increaseXCoordinate <= 0)) {
          if (increaseXCoordinate > 0) {
            return [increaseXCoordinate, initialCoordinates[1]];
          } else {
            return [dimensions.cols + increaseXCoordinate, initialCoordinates[1]];
          }
        } else {
          nextPosition = [position[X_COORDINATE] + increaseXCoordinate, position[Y_COORDINATE]];
        }

        return nextPosition;
      }

      rule.nextPosition = calculateNextPosition(position, rule.increaseXCoordinate, initialCoordinates);
      rule.nextGeneration = rule.nextGeneration + increaseGeneration;

      return position;
    }

    return rule;
  }

  GameSDK.regiterBot(botName, engineers, jKomandoBotLogic);

})();