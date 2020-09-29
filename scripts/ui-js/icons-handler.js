var iconsFiles = [
  {file: 'bull.png'},
  {file: 'cobra.png'},
  {file: 'dragon.png'},
  {file: 'eagle.png'},
  {file: 'gladiator.png'},
  {file: 'hornet.png'},
  {file: 'king.png'},
  {file: 'knight.png'},
  {file: 'lion.png'},
  {file: 'pirate.png'},
  {file: 'robot.png'},
  {file: 'scorpion.png'},
  {file: 'shark.png'},
  {file: 'tiger.png'},
  {file: 'viking.png'},
  {file: 'wizard.png'}];


function setPlayersDisplayPanelWidth(width) {
  document.getElementById('playerADisplayPanel').style.width = width +"px";
  document.getElementById('playerBDisplayPanel').style.width = width +"px";
}

function chooseIcon4Players(){

  var iconFile1 = Math.floor(Math.random() * iconsFiles.length) + 1;
  var iconFile2 = Math.floor(Math.random() * iconsFiles.length) + 1;

  document.getElementById("playerAIcon").src = "./images/icons/" + iconsFiles[iconFile1].file;
  document.getElementById("playerBIcon").src = "./images/icons/" + iconsFiles[iconFile2].file;
}