(function AuntyPythonlogic(){

  var botName = "AuntyPython";
  var engineers =["Karthik","Renil","Kavya"];
  var preblock = "2o$o!"; // pre block 3
  var blinker_bomb = "bob$3o$3o!" // blinker traffic light 7
  var spaceship = "o2bo$4bo$o3bo$b4o!"; //lightweight spaceShip 8
  var lGlider = "3o$2bo$bo!"; //glider 5
  var rGlider = "bo$2bo$3o!"; //glider 5
  var bomb = "o$2o$bo!"; // creates a boat(6) costs 4


  function getRnd(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  function getPixelsFromRle(rle, c, r, pixels) {
        var pixels = [];
        var num = '';
        var x = 0;
        var y = 0;
        var l;

        for (var s in rle) {
            var s = rle[s];
            if (s === 'b') {
                x = num === '' ? x + 1 : x + parseInt(num);
                num = '';
            } else if (s === 'o') {
                var i = num === '' ? 1 : parseInt(num);
                while (i--)
                    pixels.push([c + x + i, r + y]);

                x = num === '' ? x + 1 : x + parseInt(num);
                num = '';
            } else if (s === '$') {
                y += num === '' ? 1 : parseInt(num);
                x = 0;
                num = '';
            } else if (s === '!')
                break;
            else if (parseInt(s).toString() !== 'NaN') {
                num += s;
            }
        }
        return pixels;
    };

  function AuntyPythonlogic(){

  	var budget = GameSDK.getMyBudget(botName);
    var changeParam=GameSDK.getCurrentGeneration() %  GameSDK.getMatrixDimensions().cols;
    var plan;
        if (GameSDK.getCurrentGeneration() === 1) {
            planIndex = 0;
        }
        if (GameSDK.getCurrentGeneration() < GameSDK.getMatrixDimensions().cols*3){
          plan=['spaceship','fence','block'];
          // plan=['glider']
        }
        else if (GameSDK.getCurrentGeneration() < 2000) {
            plan = ['spaceship','glider','block','spaceship'];

        } else if (GameSDK.getCurrentGeneration() < 4000) {
            plan = ['spaceship','bomb','block'];

        } else if (GameSDK.getCurrentGeneration() < 6000){
            plan = ['spaceship','glider','block'];

        }
        else if (GameSDK.getCurrentGeneration() < 8000){
          plan = ['spaceship'];
        }
        else {
          plan = ['bomb','block']
        }

      
      if ((changeParam % GameSDK.getMatrixDimensions().cols) == 0){
          if (planIndex > plan.length){
          planIndex = planIndex % plan.length;
          }
          else{planIndex = (planIndex + 1) % plan.length;}
        }


        if (plan[planIndex] === 'block') {
          if (budget >=3 && (GameSDK.getCurrentGeneration() % 4) == 0){
           blockCol=GameSDK.getCurrentGeneration() %  (GameSDK.getMatrixDimensions().cols-2);
           blockRow=50
            return createBlock(blockRow, blockCol);
          }
        } else if (plan[planIndex] === 'fence') {
          if (budget>=9 && (GameSDK.getCurrentGeneration()%9 )==0){
              fpRow=60
              fpCol= GameSDK.getCurrentGeneration() %  (GameSDK.getMatrixDimensions().cols-2);
            return createFidgetSpinner(fpRow,fpCol)
          }
        } else if (plan[planIndex] === 'glider') {
          if (budget>=5 && (GameSDK.getCurrentGeneration()%5 )==0){
          gliderType=getRnd(0,1)
          // gliderType=0
          if (gliderType){
            gCol =getRnd(Math.floor(GameSDK.getMatrixDimensions().cols/2 - 2), GameSDK.getMatrixDimensions().cols-10);
          }
          else{
            
            gCol = getRnd(10, Math.floor(GameSDK.getMatrixDimensions().cols/2 - 2));
          }

          gRow = 76;  //Decide where
          
            return genGlider(gliderType, gRow, gCol);
          }
        } else if (plan[planIndex] === 'spaceship') {
          if (budget >= 8 && (GameSDK.getCurrentGeneration()%8 )==0){
            // console.log(GameSDK.getMatrixDimensions())
          sCol = getRnd(0, GameSDK.getMatrixDimensions().cols - 2);
          sRow = getRnd(70, 75);  //Decide where

            return genSpaceship(sRow,sCol)
        }
      }
      else if (plan[planIndex] === 'bomb') {
        if (budget >=4 && (GameSDK.getCurrentGeneration() % 6) == 0){
            bombCol = GameSDK.getCurrentGeneration() %  (GameSDK.getMatrixDimensions().cols-2);
            bombRow = 75
          return createBomb(bombRow,bombCol)
        }
      }
      return null;
    };
    
  function createFidgetSpinner(rowStart,colStart){

    var cellsPosition = [[0,0],[0,-1],[0,-2],
      [-3,-5],[-2,-5],[-1,-5],[1,-5],[2,-5],[3,-5]];
    
    if (colStart > GameSDK.getMatrixDimensions().cols - 2) {
            colStart = 0;
            rowStart += 10;
        }

    return setCellsAccordingToPosition(cellsPosition,rowStart,colStart);

  }

  function createBlock(rowStart,colStart){
    var cellsPosition = getPixelsFromRle(preblock,0,0)

    return setCellsAccordingToPosition(cellsPosition,rowStart,colStart);

  }

  function genSpaceship(rowStart,colStart){

    var cellsPosition = getPixelsFromRle(spaceship,0,0)
      return setCellsAccordingToPosition(cellsPosition,rowStart,colStart);
  }

  function createBomb(rowStart,colStart){
    var cellsPosition = getPixelsFromRle(bomb,0,0)

      return setCellsAccordingToPosition(cellsPosition,rowStart,colStart);
  }

  function genGlider(gliderType,rowStart,colStart){

    var cellsPosition = []
    if (gliderType){
      cellsPosition = getPixelsFromRle(rGlider,0,0)
    }
    else{
      cellsPosition = getPixelsFromRle(lGlider,0,0)
    }
    return setCellsAccordingToPosition(cellsPosition,rowStart,colStart);
  }

  GameSDK.regiterBot(botName,engineers,AuntyPythonlogic);

})();