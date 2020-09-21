var gameIntervalID =  null;
var gameInterval = 10;
var GAME_TIMEOUT = 90; // 90 seconds per one game
var startGameTime = null;
var cellSize =  5; // default
var canvasHight =  LifeCore.getRowsNumber() * cellSize; // 700;
var canvasWidth = LifeCore.getColmunsNumber() * cellSize;//1200;
var fadeOutInterval;
var useBackgroundAudio = true;// if true we will have background audio
var playerAColor = "#11ffcc";
var playerBColor = "#ff3333"


function onLoad() {

    var c = document.getElementById("matrixCanvas");
    c.width = canvasWidth;
    c.height = canvasHight;

    drawGridLines();

    document.addEventListener("hit",function(e){
        hitListerer(e);
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
function hitListerer(e) {

    var c = document.getElementById("matrixCanvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "white";
    ctx.lineWidth = 1;
    ctx.fillRect(e.detail.col*cellSize, e.detail.row*cellSize, cellSize, cellSize);


    if(callingBoomToMuch(hitListerer.lastCallToBoom) == false){
        playBooomSound();
        hitListerer.lastCallToBoom = Date.now();
    }

}

function callingBoomToMuch(lastcall) {
    if(lastcall === undefined|| lastcall == null){
        return false;
    }
    const minWaitingTime = 200;

    var mili = Date.now() - lastcall;
    return (mili < minWaitingTime );
}

function playBooomSound(){
    var myAudio = document.createElement("audio");
    myAudio.volume = 0.3;
    myAudio.src ="./audio/bomb1.mp3";
    myAudio.load();
    myAudio.play();

    setTimeout(function () {myAudio.pause();},1000);
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

    drawCells();

    document.getElementById('lblGeneration').innerHTML = "G: " + LifeCore.getGeneration();

    document.getElementById("lblPlayer_A_Score").innerText = GameEngine.getPlayerScore(Players.PLAYER_A);
    document.getElementById("lblPlayer_B_Score").innerText = GameEngine.getPlayerScore(Players.PLAYER_B);

}

function playRound(){

    displayGameInfo();

    GameEngine.playRound();

    if(isTimeOver()){
        endGameOperations();
    }

}

function endGameOperations() {
    stopGame();
    displayGameResults();
    handleBackgroundAudio(false);

}

function displayGameResults()
{
    var results = GameEngine.getTheWinner();

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

    if(gameIntervalID==null) {

        var playerASelection = document.getElementById("playerASelectOption");
        var playerBSelection = document.getElementById("playerBSelectOption");
        if(playerASelection.selectedIndex == 0 || playerBSelection.selectedIndex == 0 )
        {
            alert("Invalid bot selection, could not start a new game");
            return;
        }
        GameEngine.newGame(playerASelection.options[playerASelection.selectedIndex].value,playerBSelection.options[playerBSelection.selectedIndex].value);
        document.getElementById("lblWinnerAnnouncement").style.display = "none"; // clean announcements label
        document.getElementById("resultDisplaySection").style.display = "none";

        gameIntervalID = setInterval(playRound, gameInterval);
        startGameTime = Date.now();
        $(".stopWatch").TimeCircles({timer:GAME_TIMEOUT, start:false, time: { Days: { show: false }, Hours: { show: false }, Minutes:{show:false}}});
        $(".stopWatch").TimeCircles().start();

        handleBackgroundAudio(true);
    }
    else
    {
        alert("There is a game in progress");
    }
}



function handleBackgroundAudio(start){

    if(useBackgroundAudio == false) return; // do nothing if define without background audio.

    var backGroundAudio = document.getElementById("backGroundAudio");
    if(start == true){
        setBackgroundAudioSource();
        backGroundAudio.volume = 1; // return volume back to normal after fadeout
        backGroundAudio.load();
        backGroundAudio.play();
    }else
    {
        fadeOutInterval = setInterval(function() { FadeOutBackgroundAudio() }, 150);
    }
}

function FadeOutBackgroundAudio() {

    var backGroundAudio = document.getElementById("backGroundAudio");
    var vol = backGroundAudio.volume;

    if ( vol > 0.05 )
    {
        backGroundAudio.volume -= 0.05;
        console.info("volume is:" + vol);
    }
    else
    {
        backGroundAudio.volume = 0;
        backGroundAudio.pause();
        clearInterval(fadeOutInterval);
        console.info("volume is:" + vol);
    }

}

function setBackgroundAudioSource() {

    (setBackgroundAudioSource.counter === undefined || setBackgroundAudioSource.counter == null ) ? setBackgroundAudioSource.counter = 0 : setBackgroundAudioSource.counter++;

    const numberOfAudioFiles = 4;

    var fileNumer = (setBackgroundAudioSource.counter % numberOfAudioFiles)+1; //Math.floor(Math.random() * 2) + 1;
    console.info("fileNumer:" + fileNumer + "counter:" + setBackgroundAudioSource.counter);
    var sourceFileName = "backGroundAudio_" + fileNumer +".mp3";

    var backGroundSource = document.getElementById("backGroundSource");
    backGroundSource.src = "./audio/" + sourceFileName;
}

function stopGame(){

    if(gameIntervalID!=null && gameIntervalID!=undefined){
        clearInterval(gameIntervalID);
        gameIntervalID = null;
        $(".stopWatch").TimeCircles().stop();
        //$(".stopWatch").TimeCircles().destroy();
    }

}

function isTimeOver(){

    var millis = Date.now() - startGameTime;
    var seconds = Math.floor(millis/1000);

    return (seconds >= GAME_TIMEOUT);

}


function updateEngineersNames(element,lblToUpdate){

    document.getElementById(lblToUpdate).innerText = GameEngineSDK.getBotEngineers(element.value).toString();

    if(lblToUpdate === "playerAEngineers"){
        document.getElementById("playerA_displayNameDiv").innerHTML = "Player A / " + element.value;
    }
    else
    {
        document.getElementById("playerB_displayNameDiv").innerHTML = "Player B / " + element.value;
    }
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
    GameEngine.newGame(playerASelection.options[playerASelection.selectedIndex].value,playerBSelection.options[playerBSelection.selectedIndex].value);
    alert("Dev mode: New game create...");
}

function onNextGenClick() {

    displayGameInfo();
    GameEngine.playRound();
}


/*
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