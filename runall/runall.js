
var runall_gameIntervalID = null;
var runall_startGameTime = null;
var runall_gameInterval = 10;
var runall_GAME_TIMEOUT = 90; // 90 seconds per one game

var resultsTable = null;

function onLoad() {

  resultsTable = new Tabulator("#example-table", {
        height:"311px",
        columns:[
          {title:"PlayerA", field:"PlayerA"},
          {title:"PlayerB", field:"PlayerB"},
          {title:"Score A", field:"ScoreA"},
          {title:"Score B", field:"ScoreB"},
          {title:"Generations", field:"Generations"},
          {title:"Delta", field:"Delta"},
          {title:"Winner", field:"Winner"},
        ],
    });
}

function runAll() {

  initPlayersIndexes();

  nextGame();
}

function initPlayersIndexes() {
  localStorage.setItem("playerAIndex",0);
  localStorage.setItem("playerBIndex",1);
}



function nextGame() {

  var playerAIndex = localStorage.getItem("playerAIndex");
  var playerBIndex = localStorage.getItem("playerBIndex");
  console.info("Now playing A_index[" + playerAIndex + "] vs B_index[" + playerBIndex +"]");
  startNewGame(playerAIndex,playerBIndex);
}

function startNewGame(playerAIndex,playerBIndex) {

  if (runall_gameIntervalID == null) {

    var registeredBots = GameEngineSDK.getRegisteredBotsNames();
    if(playerAIndex >= registeredBots || playerBIndex >= registeredBots){
      alert("players index is out of registered bots limits A:" + playerAIndex + "B:" + playerBIndex);
      return;
    }

    GameEngine.newGame(registeredBots[playerAIndex],
        registeredBots[playerBIndex]);

    runall_gameIntervalID = setInterval(playRound, runall_gameInterval);
    runall_startGameTime = Date.now();

    updateCurrentGameDisplay(registeredBots[playerAIndex],registeredBots[playerBIndex]);
  } else {
    alert("There is a game in progress");
  }
}

function updateCurrentGameDisplay(playerA,playerB) {

  document.getElementById("PlayerA").innerText = playerA;
  document.getElementById("PlayerB").innerText = playerB;

}

function playRound(){

  GameEngine.playRound();

  updateGameDisplay();

  if(isTimeOver()){
    endGameOperations();
  }
}

function updateGameDisplay() {
  var millis = Date.now() - runall_startGameTime;
  var seconds = Math.floor(millis/1000);
  document.getElementById("gameTimeDisplay").innerText = seconds;

  document.getElementById("scoreA").innerText = GameEngine.getPlayerScore(Players.PLAYER_A);
  document.getElementById("scoreB").innerText = GameEngine.getPlayerScore(Players.PLAYER_B);
  document.getElementById('generation').innerHTML = LifeCore.getGeneration();
}

function isTimeOver(){

  var millis = Date.now() - runall_startGameTime;
  var seconds = Math.floor(millis/1000);

  return (seconds >= runall_GAME_TIMEOUT);

}

function endGameOperations() {
  stopGame();
  registerGameResults();
  updateNextGameRivels();
  nextGame();
}

function stopGame(){

  if(runall_gameIntervalID!=null && runall_gameIntervalID!=undefined){
    clearInterval(runall_gameIntervalID);
    runall_gameIntervalID = null;
  }

}

function registerGameResults() {

  var playerA = document.getElementById("PlayerA").innerText;
  var playerB = document.getElementById("PlayerB").innerText;
  var scoreA = GameEngine.getPlayerScore(Players.PLAYER_A);//document.getElementById("scoreA").innerText;
  var scoreB = GameEngine.getPlayerScore(Players.PLAYER_B);//document.getElementById("scoreB").innerText;
  var generation = LifeCore.getGeneration();//document.getElementById("generation").innerText;
  var delta =(parseInt(scoreA) - parseInt(scoreB));
  delta <0 ? delta = delta*-1:delta;
  var winner = GameEngine.getTheWinner().winner;


  resultsTable.addData({PlayerA:playerA,PlayerB:playerB,ScoreA:scoreA,ScoreB:scoreB,Generations:generation,Delta:delta,Winner:winner});

}

function updateNextGameRivels() {

  var playerAIndex = parseInt(localStorage.getItem("playerAIndex"));
  var playerBIndex = parseInt(localStorage.getItem("playerBIndex"));
  var playerAIndex_prev = playerAIndex;
  var playerBIndex_prev = playerBIndex;
  var registeredBots = GameEngineSDK.getRegisteredBotsNames().length;

  for(playerAIndex;playerAIndex < registeredBots;playerAIndex++){
    for(playerBIndex;playerBIndex< registeredBots;playerBIndex++){
      if(playerAIndex === playerBIndex) continue; // if we have the same bot, continue to next one
      if(playerAIndex === playerAIndex_prev && playerBIndex ===playerBIndex_prev) continue;

      // store the next bots
      localStorage.setItem("playerAIndex",playerAIndex);
      localStorage.setItem("playerBIndex",playerBIndex);
      //console.info("A:" + playerAIndex + " B:" + playerBIndex);
      return; // exit this method.
    }
    playerBIndex = 0;
  }

  // if I reach this line it means that I am starting a new round again
  console.info("Doing another run-all round!!!");
  initPlayersIndexes();


}

function downloadData() {
  var date_time_suffix =  Date.now().toString();
  var filename = "botswar-runall" + date_time_suffix +".csv";
  resultsTable.download("csv", filename);
}

