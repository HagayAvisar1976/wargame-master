(function JokerBot() {

    var jokerBotName = "JokerBot";
    var engineers = ["Amir", "Yuan", "Shoham"];
    var defenderBotName_row = 68;

    function JokerBotLogic() {
        if (GameSDK.getCurrentGeneration() <= 956) {
            if ((GameSDK.getCurrentGeneration() % 4) === 0) {
                var colStart = GameSDK.getCurrentGeneration() % GameSDK.getMatrixDimensions().cols;
                if (colStart <= 3) {
                    defenderBotName_row -= 6;
                    if (defenderBotName_row <= 6) {
                        defenderBotName_row = 68;
                    }
                }
                return createBlock(defenderBotName_row, colStart);
            }
        } else {
            if ((GameSDK.getCurrentGeneration() % 7) === 0) {
                var dimensions = GameSDK.getMatrixDimensions();
                colStart = GameSDK.getCurrentGeneration() % dimensions.cols;
                return createGlider(dimensions.rows - 3, colStart <= 150 ? colStart + 80 : colStart >= 230 ? colStart - 15 : colStart);
            } else {
                return null;
            }
        }
        return null;
    }

    function createBlock(rowStart, colStart) {

        var cellsPosition = [[0, 0], [0, 1],
            [1, 0], [1, 1]];

        return setCellsAccordingToPosition(cellsPosition, rowStart, colStart);

    }

    function createGlider(rowStart, colStart) {

        var cellsPosition = [
            [0, 1],
            [1, 0],
            [2, 0],  [2, 1], [2, 2]];

        return setCellsAccordingToPosition(cellsPosition, rowStart, colStart);

    }

    GameSDK.regiterBot(jokerBotName, engineers, JokerBotLogic);

})();
