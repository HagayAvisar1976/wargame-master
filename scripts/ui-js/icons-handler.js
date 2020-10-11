var icon4EachBot = true;
var iconsFiles = [
  {file: 'bull.png',bot:'test'},
  {file: 'cobra.png',bot:'test'},
  {file: 'dragon.png',bot:'DefenderBot'},
  {file: 'eagle.png',bot:'EmptyBot'},
  {file: 'gladiator.png',bot:'test'},
  {file: 'hornet.png',bot:'test'},
  {file: 'king.png',bot:'test'},
  {file: 'knight.png',bot:'test'},
  {file: 'lion.png',bot:'test'},
  {file: 'pirate.png',bot:'AttackerBot'},
  {file: 'robot.png',bot:'sonicBot'},
  {file: 'scorpion.png',bot:'test'},
  {file: 'shark.png',bot:'test'},
  {file: 'tiger.png',bot:'test'},
  {file: 'viking.png',bot:'test'},
  {file: 'wizard.png',bot:'test'}];


function setPlayersDisplayPanelWidth(width) {
  document.getElementById('playerADisplayPanel').style.width = width +"px";
  document.getElementById('playerBDisplayPanel').style.width = width +"px";
}

function chooseRndIcon4Players(){

  if(icon4EachBot) return; // if icon for each bot is on, this method is doing nothing.

  var iconFile1 = Math.floor(Math.random() * iconsFiles.length);
  var iconFile2 = Math.floor(Math.random() * iconsFiles.length);

  document.getElementById("playerAIcon").src = "./images/icons/" + iconsFiles[iconFile1].file;
  document.getElementById("playerBIcon").src = "./images/icons/" + iconsFiles[iconFile2].file;
}

function setIcon4Players(botName,player){

  if(icon4EachBot === false) return; // if icon for each bot is off, this method is doing nothing.

  var iconFile = iconFileByBotName(botName);
  if(player === PLAYER_A){
    document.getElementById("playerAIcon").src = "./images/icons/" + iconFile;
  }
  else{
    document.getElementById("playerBIcon").src = "./images/icons/" + iconFile;
  }
}

function iconFileByBotName(botname) {

  var result = iconsFiles.find(e => e.bot == botname);
  if(result === undefined) {
    return iconsFiles[0].file;// returns the default if not finding anything
  }
  return  result.file;

}