(function sonicBot(){

    var botName = "sonicBot";
    var engineers =["Anna","Itay","Phantom of the Opera"];
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    function quarterSplitter(objLength){
        var dim_interval = []
        for (var i=0; i<objLength; i+=Math.ceil(objLength/5)){
           dim_interval.push([i, Math.ceil(i+objLength/5)]);
            };
        return dim_interval;
    }



    var setting_lines = [0.4,0.25,0.2,0.15]
    var generations_int = [0,400,500,800]
    var spaceShipLauncher = 0
    var yes_no = 0
    var last_loop = 3
    var looped = 7
    bound_0 = Math.ceil(80 * setting_lines[0])
    bound_1 = Math.ceil(80 * setting_lines[1])
    bound_2 = Math.ceil(80 * setting_lines[2])
    bound_3 = Math.ceil(80 * setting_lines[3])
    safe_area = [0, bound_0-1]
    land_mines_area = [bound_0+2, bound_0+bound_1-2]
    no_mens_land_area = [bound_0+bound_1, bound_0+bound_1+bound_2-1]
    danger_zone = [bound_0+bound_1+bound_2, 80-1]

    function sonicBotlogic(data){
        var budget = data.budget;
        var generation = data.generation;
        var dimensions = data.matrix;
        var rows = dimensions.rows
        var cols = dimensions.cols

        if(generation ==1){
            bound_0 = Math.ceil(rows * setting_lines[0])
            bound_1 = Math.ceil(rows * setting_lines[1])
            bound_2 = Math.ceil(rows * setting_lines[2])
            bound_3 = Math.ceil(rows * setting_lines[3])
            danger_zone = [bound_0+bound_1+bound_2, rows-1]
        }


        if (generation<2000 && budget%9==0){
        spaceShipLauncher =spaceShipLauncher+1
            if (spaceShipLauncher%looped==5){
                return createSpaceShip(rows-5, cols*.1)}
            else if (spaceShipLauncher%looped==4){
                return createSpaceShip(rows-5, cols*.25)}
            else if (spaceShipLauncher%looped==3){
                return createSpaceShip(rows-5, cols*.4)}
            else if (spaceShipLauncher%looped==2){
                return createSpaceShip(rows-5, cols*.55)}
            else if (spaceShipLauncher%looped==1){
                return createSpaceShip(rows-5, cols*.7)}
            else if (spaceShipLauncher%looped==0){
                return createSpaceShip(rows-5, cols*.85)}
            else {
                return createMine(Math.ceil(rows/4), generation % dimensions.cols)}
            }
        else if (generation<3000 && budget%9==0) {
             spaceShipLauncher =spaceShipLauncher+1
               if (spaceShipLauncher%last_loop==0){
                return createSpaceShip(rows-5, cols*.25)}
            else if (spaceShipLauncher%last_loop==1){
                return createSpaceShip(rows-5, cols*.2)}
            else if (spaceShipLauncher%last_loop==2){
                return createSpaceShip(rows-5, cols*.15)}
            else {
                return null}
            }
        else if (generation<3500 && budget%9==0) {
             spaceShipLauncher =spaceShipLauncher+1
               if (spaceShipLauncher%last_loop==0){
                return createSpaceShip(rows-5, cols*.74)}
            else if (spaceShipLauncher%last_loop==1){
                return createSpaceShip(rows-5, cols*.76)}
            else if (spaceShipLauncher%last_loop==2){
                return createSpaceShip(rows-5, cols*.8)}
            else {
                return null}
            }
        else if (generation>3500 && budget%9==0) {
             spaceShipLauncher =spaceShipLauncher+1
               if (spaceShipLauncher%last_loop==0){
                return createSpaceShip(rows-5, cols*.4)}
            else if (spaceShipLauncher%last_loop==1){
                return createSpaceShip(rows-5, cols*.5)}
            else if (spaceShipLauncher%last_loop==2){
                return createSpaceShip(rows-5, cols*.6)}
            else {
                return null}
            }            };

    //Shapes' functions
    function range(start, end) {
    var ans = [];
    for (let i = start; i <= end; i++) {
        ans.push(i);
    }
    return ans;
    }

    function createMine(rowStart,colStart){
        //console.log("creating Mine - ", rowStart,colStart);
        var cellsPosition = [[0,0],[0,1],[0,2]];
        return setCellsAccordingToPosition(cellsPosition,rowStart,colStart);
        }
    function create_64P2H1V0(rowStart, colStart){
    var cellsPosition = [[8, 5], [8, 6], [8, 7], [8, 23], [8, 24], [8, 25], [7, 4], [7, 8], [7, 22], [7, 26], [6, 3], [6, 4], [6, 9], [6, 21], [6, 26], [6, 27], [5, 2], [5, 4], [5, 6], [5, 7], [5, 9], [5, 10], [5, 14], [5, 15], [5, 16], [5, 20], [5, 21], [5, 23], [5, 24], [5, 26], [5, 28], [4, 1], [4, 2], [4, 4], [4, 9], [4, 11], [4, 12], [4, 14], [4, 15], [4, 16], [4, 18], [4, 19], [4, 21], [4, 26], [4, 28], [4, 29], [3, 0], [3, 5], [3, 9], [3, 14], [3, 16], [3, 21], [3, 25], [3, 30], [2, 12], [2, 18], [1, 0], [1, 1], [1, 9], [1, 10], [1, 20], [1, 21], [1, 29], [1, 30]]
    return setCellsAccordingToPosition(cellsPosition,rowStart,colStart);
    };
    function create_37P4H1V0(rowStart, colStart){
    var cellsPosition = [[12, 1], [11, 1], [11, 10], [10, 0], [10, 2], [10, 8], [10, 12], [9, 8], [9, 12], [9, 13], [8, 5], [8, 7], [8, 8], [8, 14], [8, 15], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 9], [7, 16], [6, 2], [6, 3], [6, 10], [6, 14], [6, 15], [6, 16], [5, 10], [5, 14], [5, 16], [5, 17], [4, 13], [3, 18], [2, 17], [1, 17]]
    return setCellsAccordingToPosition(cellsPosition,rowStart,colStart);
    };
    function create_55P9H3V0(rowStart, colStart){
    var cellsPosition = [[13, 6], [13, 7], [13, 8], [13, 12], [13, 13], [13, 14], [12, 2], [12, 4], [12, 5], [12, 9], [12, 11], [12, 15], [12, 16], [12, 18], [11, 1], [11, 2], [11, 3], [11, 7], [11, 9], [11, 11], [11, 13], [11, 17], [11, 18], [11, 19], [10, 0], [10, 4], [10, 9], [10, 11], [10, 16], [10, 20], [9, 1], [9, 9], [9, 11], [9, 19], [8, 8], [8, 10], [8, 12], [7, 8], [7, 10], [7, 12], [5, 10], [4, 9], [4, 11], [3, 7], [3, 8], [3, 12], [3, 13], [2, 7], [2, 9], [2, 11], [2, 13], [1, 7], [1, 8], [1, 12], [1, 13]]
    return setCellsAccordingToPosition(cellsPosition,rowStart,colStart);
    }
    function createSpaceShip(rowStart,colStart){
        var cellsPosition = [
        [4,1],[4,2],[4,3],
        [3,0], [3,3],
        [2,3],
        [1,3],
        [0,0], [0,2]
        ];
        return setCellsAccordingToPosition(cellsPosition,rowStart,colStart);
        }
    function createGlider (rowStart,colStart) {
    // 5 cells
    var cellsPosition = [[0, 0],
      [1, 1],
      [2, -1], [2, 0], [2, 1]];
    return setCellsAccordingToPosition(cellsPosition,rowStart,colStart);
  }
    function createBlock(rowStart,colStart){
    var cellsPosition = [[0,0],[0,1],
      [1,0],[1,1]];
    return setCellsAccordingToPosition(cellsPosition,rowStart,colStart);
  }

  GameSDK.regiterBot(botName,engineers,sonicBotlogic);
})();