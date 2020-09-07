
//*********************************************************************************
//*********************************************************************************
// DO NOT EDIT THIS FILE - IT CONTAINS JUST AN OPTIONAL HELPER METHOD IF YOU WISH TO
// USE IT IN YOUR BOT.
//*********************************************************************************
//*********************************************************************************

function setCellsAccordingToPosition (cellsPosition,rowStart,colStart) {
  var cellsToUpdate = [];
  for(var i=0; i< cellsPosition.length;i++){
    var offset = cellsPosition[i];
    var row = rowStart + offset[0];
    var col = colStart + offset[1];
    cellsToUpdate.push(new cell(row, col));
  }

  return cellsToUpdate;
}

//*********************************************************************************
//*********************************************************************************
// DO NOT EDIT THIS FILE - IT CONTAINS JUST AN OPTIONAL HELPER METHOD IF YOU WISH TO
// USE IT IN YOUR BOT.
//*********************************************************************************
//*********************************************************************************
