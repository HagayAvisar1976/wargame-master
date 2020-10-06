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

var fadeOutInterval;


function startBackgroundMusic() {
  if (document.getElementById("useBackgroundAudio").checked === false) return;

  var backGroundAudio = document.getElementById("backGroundAudio");
  setBackgroundAudioSource();
  backGroundAudio.volume = 1; // return volume back to normal after fadeout
  backGroundAudio.load();
  backGroundAudio.play();
}

function stopBackgroundMusic() {
  fadeOutInterval = setInterval(function() { FadeOutBackgroundAudio() }, 150);
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
