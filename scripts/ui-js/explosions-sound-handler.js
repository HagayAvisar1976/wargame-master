var hitSounds = [
  {file: 'explosion1.mp3', volume: 1},
  {file: 'explosion2.mp3', volume: 1},
  {file: 'explosion3.mp3', volume: 1},
  {file: 'explosion4.mp3', volume: 1},
  {file: 'explosion5.mp3', volume: 1},
  {file: 'explosion6.mp3', volume: 1},
  {file: 'explosion7.mp3', volume: 1},
  {file: 'explosion8.mp3', volume: 1},
  {file: 'explosion9.mp3', volume: 1}
];


function playHitSound() {

  if(callinghitSoundToMuch(playHitSound.lastCallToBoom) == false){
    playExplosionSound();
    playHitSound.lastCallToBoom = Date.now();
  }
}

function callinghitSoundToMuch(lastcall) {
  if(lastcall === undefined|| lastcall == null){
    return false;
  }
  const minWaitingTime = 150;

  var mili = Date.now() - lastcall;
  return (mili < minWaitingTime );
}

function playExplosionSound() {

  var myAudio = document.createElement("audio");
  myAudio.volume = 1;
  var explosionFile = Math.floor(Math.random() * hitSounds.length);
  myAudio.src ="./audio/explosions/" + hitSounds[explosionFile].file;
  myAudio.load();
  myAudio.play();

  setTimeout(function () {myAudio.pause();},1000);
}


