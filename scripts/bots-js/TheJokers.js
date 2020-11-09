(function JokerBot() {

    var jokerBotName = "JokerBot";
    var engineers = ["Amir", "Yuan", "Shoham"];
    var defenderBotName_row = 68;

    function JokerBotLogic(data) {
        var budget = data.budget;
        var generation = data.generation;
        var dimensions = data.matrix;

        if (generation <= 956) {
            if ((generation % 4) === 0) {
                var colStart = generation % dimensions.cols;
                if (colStart <= 3) {
                    defenderBotName_row -= 6;
                    if (defenderBotName_row <= 6) {
                        defenderBotName_row = 68;
                    }
                }
                return createBlock(defenderBotName_row, colStart);
            }
        } else {
            if ((generation % 7) === 0) {
                colStart = generation % dimensions.cols;
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
