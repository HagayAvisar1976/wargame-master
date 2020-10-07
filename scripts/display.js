var gameIntervalID =  null;
var gameInterval = 10;
var GAME_TIMEOUT = 90; // 90 seconds per one game
var startGameTime = null;
var cellSize =  5; // default
var canvasHight =  LifeCore.getRowsNumber() * cellSize; // 700;
var canvasWidth = LifeCore.getColmunsNumber() * cellSize;//1200;
//var fadeOutInterval;
var playerAColor = "#11ffcc";
var playerBColor = "#ff3333"
var PLAYER_A = "PLAYER_A";
var PLAYER_B = "PLAYER_B";
/*
var musicFiles = [
    {file: 'pirates_of_the_caribbean.mp3'},
    {file: 'terminator.mp3'},
    {file: 'mission_impossible.mp3'},
    {file: 'games_of_thrones.mp3'},
    {file: 'battlestar_galactica.mp3'},
    {file: 'dark_knight_rises.mp3'},
    {file: 'fury_road.mp3'},
    {file: 'transformers.mp3'},
    {file: 'wonder_woman.mp3'}];

 */


function onLoad() {

    localStorage.clear();
    var c = document.getElementById("matrixCanvas");
    c.width = canvasWidth;
    c.height = canvasHight;
    setPlayersDisplayPanelWidth(canvasWidth);


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

    drawExplosionOnBoard(e.detail.row*cellSize,e.detail.col*cellSize);
    playHitSound();
    /*
    if(callingBoomToMuch(hitListerer.lastCallToBoom) == false){
        playBooomSound();
        hitListerer.lastCallToBoom = Date.now();
    }

     */

}

/*
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

 */

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
    stopBackgroundMusic();

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

        startBackgroundMusic();

        chooseRndIcon4Players();
    }
    else
    {
        alert("There is a game in progress");
    }
}


/*
function handleBackgroundAudio(start){

    if(document.getElementById("useBackgroundAudio").checked === false) return;

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

    var m = (localStorage.getItem('game-of-life-music-index') || 0) % musicFiles.length;
    if(m<0 || m> musicFiles.length)
        alert("Invalid background music file index:"+ m );

    var backGroundSource = document.getElementById("backGroundSource");
    backGroundSource.src = "./audio/" + musicFiles[m].file;

    m = (m + 1) % musicFiles.length;
    localStorage.setItem('game-of-life-music-index', m);
}

 */

function stopGame(){

    if(gameIntervalID!=null && gameIntervalID!=undefined){
        clearInterval(gameIntervalID);
        gameIntervalID = null;
        $(".stopWatch").TimeCircles().stop();
        //stopBackgroundMusic(); // need to fix bug when pressing stop button to stop the music as well... this is not the way :-)
    }

}

function isTimeOver(){

    var millis = Date.now() - startGameTime;
    var seconds = Math.floor(millis/1000);

    return (seconds >= GAME_TIMEOUT);

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
    //$(".stopWatch").TimeCircles()
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

AFTER THE GAME :
//////////////////////////
- move control of the game to game engine instead of display
- push the data to bot and remove sdk objects
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