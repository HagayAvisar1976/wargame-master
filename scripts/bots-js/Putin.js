(function PutinBot(){

  var botName = "Putin";
  var engineers =["Sharon Jonathan","Soleman Tsuria"];


    function mineColMaker(mineLocator){

        if (mineLocator>cols*0.05){
            return mineLocator
            }

    }

    function createMine(rowStart,colStart){

        var cellsPosition = [[0,0],[1,0],[2,0]];
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
        return setCellsAccordingToPosition(cellsPosition,rowStart-5,colStart);
        }

    function createGlider_up(rowStart,colStart) {

        var cellsPosition = [[0, 0],
          [1, 1],
          [2, -1], [2, 0], [2, 1]];

        return setCellsAccordingToPosition(cellsPosition,rowStart,colStart);

      }

    function createGlider_down(rowStart,colStart) {

                var cellsPosition = [[0, 2],
          [1, 0],
          [2, 0], [2, 1], [2, 2]];

        return setCellsAccordingToPosition(cellsPosition,rowStart,colStart);

      }

    function PutinLogic(data){
      var budget = data.budget;
      var generation = data.generation;
      var dimensions = data.matrix;

      var rows = dimensions.rows
      var cols = dimensions.cols
      var mineLocator = cols*0.95

        if (0<generation && generation<=10 && budget%3==0 && generation%4==0)
        {return createMine(rows-15, generation%cols)
        }
        else if (10<generation && generation<=500)
        {
        if (generation%23==0){
        return createSpaceShip(rows, cols*0.8)}
         else if (generation%23==7){
        return createSpaceShip(rows, cols*0.85)}
         else if (generation%23==20){
        return createSpaceShip(rows, cols*0.9)
        } else if (generation%23==3){
        return createMine(rows-20, generation%cols)}
        }
         else if (500<generation && generation<=1000){
         if (generation%23==0){
        return createSpaceShip(rows, cols*0.95)}
        else if (generation%23==1){
        return createSpaceShip(rows, cols*0.9)}
         else if (generation%23==18){
        return createGlider_up(rows-5,  cols*0.9-85)}
         else if (generation%23==20){
        return createGlider_up(rows-5,  cols*0.9-90)}
         }// end gen 1300
         else if (1000<generation && generation<=1500){
         if (generation%40==0){
         return createGlider_down(rows-5, cols*0.5)
         }
         else if(generation%40==20){
         return createGlider_down(rows-5, cols*0.5+3)
         }
         else if(generation%40==14 || generation%40==15){
         mineLocator = mineLocator-14
         return createMine(rows*.3, mineColMaker(mineLocator))
         }}
         else if (1500<generation && generation<=2100){
        if (generation%23==0){
        return createSpaceShip(rows, cols*0.05)}
         else if (generation%23==1){
        return createSpaceShip(rows, cols*0.1)}
         else if (generation%23==2){
        return createSpaceShip(rows, cols*0.55)
        } else if (generation%23==3){
        return createSpaceShip(rows, 0.5)}}
         else if (2100<generation && generation<=2600){
         if (generation%40==0){
         return createGlider_up(rows-5, cols*0.2)
         }
         else if(generation%40==20){
         return createGlider_up(rows-5, cols*0.2+5)
         }}
         else if (generation>2650){
         if (generation%65==0){
         return createSpaceShip(rows, cols*0.05)
         } else if (generation%65==17){
          return createGlider_down(rows-5, cols*0.9)}
          else if (generation%65==15){
          return createSpaceShip(rows-5, cols*0.95)}
          else if (generation%65==19){
          return createSpaceShip(rows-5, cols*0.05)}
          else if (generation%65==20){
          return createSpaceShip(rows-5, cols*0.25)}
          else if (generation%65==25){
          return createSpaceShip(rows-5, cols*0.3)}
          else if (generation%65==35){
          return createSpaceShip(rows-5, cols*0.45)}
          else if (generation%65==59){
          return createSpaceShip(rows-5, cols*0.85)}
          else if (generation%65==42){
          return createSpaceShip(rows-5, cols*0.15)}
          else if (generation%65==55){
          return createSpaceShip(rows-5, cols*0.5)}
         }
     }//end logic

  GameSDK.regiterBot(botName,engineers,PutinLogic);

})();