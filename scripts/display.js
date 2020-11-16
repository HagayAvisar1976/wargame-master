
var GAME_TIMEOUT = 90; // 90 seconds per one game
var cellSize =  5; // default
var canvasHight =  LifeCore.getRowsNumber() * cellSize; // 700;
var canvasWidth = LifeCore.getColmunsNumber() * cellSize;//1200;

var playerAColor = "#11ffcc";
var playerBColor = "#ff3333"
var PLAYER_A = "PLAYER_A";
var PLAYER_B = "PLAYER_B";


function onLoad() {

    var c = document.getElementById("matrixCanvas");
    c.width = canvasWidth;
    c.height = canvasHight;
    setPlayersDisplayPanelWidth(canvasWidth);

    drawGridLines();

    document.addEventListener("gameStarted",function(e){
        gameStartedListener(e);
    });

    document.addEventListener("gameRound",function(e){
        gameRoundListener(e);
    });

    document.addEventListener("hit",function(e){
        hitListerer(e);
    });

    document.addEventListener("gameOver",function(e){
        gameOverListener(e);
    });


    fillPlayersSelecetOptions();
}

function fillPlayersSelecetOptions(){

    var registeredBots = GameEngineSDK.getRegisteredBotsNames();
    var playerASelection = document.getElementById("playerASelectOption");
    var playerBSelection = document.getElementById("playerBSelectOption");
    for(var i = 0; i <registeredBots.length; i++) {
        var optionA = document.createElement('option');
        var optionB = document.createElement('option');
        optionA.text = optionA.value = registeredBots[i];
        optionB.text = optionB.value = registeredBots[i];
        playerASelection.add(optionA, i +1);
        playerBSelection.add(optionB, i +1);
    }
}

function gameStartedListener(e){

    startBackgroundMusic();

    chooseRndIcon4Players();
}

function gameRoundListener(e) {

    displayGameInfo();

    updateScoreDisplay(e);

    updateGameTimeDisplay(e)
}

function  gameOverListener(e) {

    displayGameResults(e);
    stopBackgroundMusic();
    updateGameTimeDisplay(e);
}

function hitListerer(e) {

    var c = document.getElementById("matrixCanvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "white";
    ctx.lineWidth = 1;
    ctx.fillRect(e.detail.col*cellSize, e.detail.row*cellSize, cellSize, cellSize);

    drawExplosionOnBoard(e.detail.row*cellSize,e.detail.col*cellSize);
    playHitSound();

}


function drawCells() {

    var c = document.getElementById("matrixCanvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "white";
    ctx.strokeStyle = "#999";

    ctx.clearRect(0,0,canvasWidth,canvasHight);

    drawGridLines();

    // draw cells
    for(var row = 0; row < LifeCore.getRowsNumber(); row++){
        for (var col = 0; col < LifeCore.getColmunsNumber(); col++){
            if(LifeCore.getCellValue(row,col) === LifeStates.ALIVE)
            {
                ctx.lineWidth = 1;
                ctx.fillRect(col*cellSize, row*cellSize, cellSize, cellSize);
            }
        }
    }

    drawWalls();
}

function drawWalls(){

    drawPlayerWall(0, playerAColor);
    drawPlayerWall(LifeCore.getRowsNumber() - 1, playerBColor);
}

function drawPlayerWall(row,color){

    var c = document.getElementById("matrixCanvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = color;

    var halfCellSize  = cellSize / 2; // make wall line a little thiner..
    for (var col = 0; col < LifeCore.getColmunsNumber(); col++) {

        ctx.lineWidth = 1;
        ctx.fillRect(col * cellSize, row * cellSize, halfCellSize, halfCellSize);
    }

}

function drawGridLines() {

    if (document.getElementById("drawGridLines").checked === false) return;

    var c = document.getElementById("matrixCanvas");
    var ctx = c.getContext("2d");
    ctx.strokeStyle = "#999";

    // draw grid lines
    for(var n = cellSize; n < canvasWidth; n += cellSize) {
        ctx.beginPath();
        ctx.moveTo(n+.5, 0);
        ctx.lineTo(n+.5, canvasHight);
        ctx.stroke();
    }
    for(n = cellSize; n < canvasHight; n += cellSize) {
        ctx.beginPath();
        ctx.moveTo(0, n+.5);
        ctx.lineTo(canvasWidth, n+.5);
        ctx.stroke();
    }

}

function displayGameInfo(){

    var refreshRate =  document.getElementById("screenRefreshRate").value;
    var generation = LifeCore.getGeneration();
    if((generation % refreshRate) ===0 ){
        drawCells();
    }
    document.getElementById('lblGeneration').innerHTML = "G: " + generation;//LifeCore.getGeneration();

}

function updateScoreDisplay(data) {

    var playerAScore = data.detail.playerAScore;//GameEngine.getPlayerScore(Players.PLAYER_A);
    var playBScore = data.detail.playerBScore;//GameEngine.getPlayerScore(Players.PLAYER_B);

    document.getElementById("lblPlayer_A_Score").innerText = playerAScore;
    document.getElementById("lblPlayer_B_Score").innerText = playBScore;
    document.getElementById("playerAscore").innerText = playerAScore;
    document.getElementById("playerBscore").innerText = playBScore;
}



function displayGameResults(e) {
    var results = e.detail;//GameEngine.getTheWinner();

    document.getElementById("drawDivSection").style.display = "none";
    document.getElementById("resultDivSection").style.display = "none";
    if(results.winner === "" && results.loser ===""){
        document.getElementById("drawDivSection").style.display = "block";
    }
    else
    {
        document.getElementById("resultDivSection").style.display = "block";
        document.getElementById("lblwinnerText").innerText = results.winner;
        document.getElementById("lblloserText").innerText = results.loser;
    }

    document.getElementById("resultDisplaySection").style.display = "block";

}

function startNewGame() {

    if(!gameContrller.isGameInProgress()) {

        var playerASelection = document.getElementById("playerASelectOption");
        var playerBSelection = document.getElementById("playerBSelectOption");
        if(playerASelection.selectedIndex == 0 || playerBSelection.selectedIndex == 0 )
        {
            alert("Invalid bot selection, could not start a new game");
            return;
        }
        var gameSettings = new golSettings(GAME_TIMEOUT - 80);
        gameContrller.startNewGame(gameSettings,playerASelection.options[playerASelection.selectedIndex].value,playerBSelection.options[playerBSelection.selectedIndex].value);

        document.getElementById("lblWinnerAnnouncement").style.display = "none"; // clean announcements label
        document.getElementById("resultDisplaySection").style.display = "none";

    }
    else
    {
        alert("There is a game in progress");
    }
}


function updateGameTimeDisplay(data) {

    var remainingSeconds = data.detail.remainingSeconds;//GAME_TIMEOUT - getGameTime();
    document.getElementById("gameTimeDisplay").className = "timeDisplay";
    if(remainingSeconds <=10){
        document.getElementById("gameTimeDisplay").className = "timeDisplay-blinking";
    }

    if(remainingSeconds <= 0){
        document.getElementById("gameTimeDisplay").className = "timeDisplay-end";
    }

    document.getElementById("gameTimeDisplay").innerText = remainingSeconds + " - Seconds";

}

function onPlayerSelectionChange(element,lblToUpdate){

    if(lblToUpdate === PLAYER_A){
        document.getElementById("playerAEngineers").innerText = GameEngineSDK.getBotEngineers(element.value).toString();
        document.getElementById("playerA_displayName").innerHTML = "Player A / " + element.value;
        setIcon4Players(element.value, PLAYER_A);
    }
    else
    {
        document.getElementById("playerBEngineers").innerText = GameEngineSDK.getBotEngineers(element.value).toString();
        document.getElementById("playerB_displayName").innerHTML = "Player B / " + element.value;
        setIcon4Players(element.value,PLAYER_B);
    }
}

function gameTimeSelectionChange(element){

    updateNewGameTime(element.value);
}

function updateNewGameTime(newTime){
    GAME_TIMEOUT = newTime;
}
//-----------------------------------------------------------------------
//=================== Method for Developer mode only ====================
//-----------------------------------------------------------------------

function newGame()
{
    var playerASelection = document.getElementById("playerASelectOption");
    var playerBSelection = document.getElementById("playerBSelectOption");
    if(playerASelection.selectedIndex == 0 || playerBSelection.selectedIndex == 0 )
    {
        alert("Invalid bot selection, could not start a new game");
        return;
    }
    var gameSettings = new golSettings(GAME_TIMEOUT);
    gameSettings.setGameMode(gameSettings.gameModes.DEV_MODE);
    gameContrller.startNewGame(gameSettings,playerASelection.options[playerASelection.selectedIndex].value,playerBSelection.options[playerBSelection.selectedIndex].value);

    alert("Dev mode: New game create...");
}

function onNextGenClick() {

    gameContrller.playRound();
    displayGameInfo();
}

function useHalfBudegtOnChange(element) {
    // we use this option only when we have tie games.
    gameContrller.setHalfBudgetFlag(element.checked);
}


/*

AFTER THE GAME :
//////////////////////////
- push the data to bot and remove sdk objects - done
- move control of the game from display to game controller
- create a mode of playing X games in a row to cancel the random affect.
- create demo mode for bot (so we can see bot strategy)
- color each cell according to payer

- create small star when cell is created
- display pictures of winners and losers.
- splash screen before starting a game displaying the players.
//////////////////////////

http://conwaylife.appspot.com/library
- fix the watch (maybe find other component)
- design the game UX
- make all elements size relative to screen

- Nice to have:
- register the results history

Style:
- style the players information panel



Open Issues:
- display hits on board - UI, decide if I would like to leave it colored or not
- stop the game and display the results - need to display bot choosen name

DONE tasks:
- write player sdk that they need to implement - done
- how to register a bot - done
- fix canvas UI so it will display what I need - DONE
- report hits on board - Done
- create complex life shapes and test behavior - done
- load players from list of names and selects bots from list - done
- write sample bots - done
- display game clock / - progress bar according to game time - done
- update bot additional info when selecting it in select option combobox. - done
- reduce budget to 1 again- done.
- add music while game is on & fade out when ends - done
- Randomaly select backgroud music - done
- Make boom sound when we have a hit - done.
- display positions of player A & B - done
 */