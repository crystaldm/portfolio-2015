var container;
var innerC;
var cast;
var bgExit;
var ctaExit;
var trailerVideo;
var trailerSrcMp4;
var unmute;
var replay;
var replayOverlay;
var playBtn;
var audioBtn;
var audioClicked;
var largeAudio;
var ctaClickTag = 'https://www.google.com';
var bgClickTag = 'https://www.google.com';

function init() {
  container             = document.getElementById('container');
  innerC                = document.getElementById('inner-c');
  cast                  = document.getElementById('cast');
  bgExit                = document.getElementById('bg-exit');
  ctaExit               = document.getElementById('cta');
  trailerVideo          = document.getElementById('trailer-v');
  trailerSrcMp4         = document.getElementById('trailer-mp4-src');
  unmute                = document.getElementById('large-audio');
  replay                = document.getElementById('replay');
  replayOverlay         = document.getElementById('replay-overlay');
  playBtn               = document.getElementById('play-toggle');
  audioBtn              = document.getElementById('audio-toggle');
  largeAudio            = document.getElementById('large-audio');
  audioClicked          = false;

  trailerSrcMp4.src = ('preview.mp4');
  trailerVideo.load();

  addImages();
  addListeners();
  start();
}

function addListeners() {
  trailerVideo.addEventListener('ended', videoEnd, false);
  unmute.addEventListener('click', restartVideo, false);
  replay.addEventListener('click', restartVideo, false);
  playBtn.addEventListener('click', playToggle, false);
  audioBtn.addEventListener('click', audioToggle, false);

  bgExit.addEventListener('click', backgroundExit, false);
  ctaExit.addEventListener('click', ctaExitHandler, false);

  cast.addEventListener("mozAnimationEnd", scene02, false);
  cast.addEventListener("webkitAnimationEnd", scene02, false);
  cast.addEventListener("oanimationend", scene02, false);
  cast.addEventListener("MSAnimationEnd", scene02, false);
  cast.addEventListener("animationend", scene02, false);
}

function addImages() {
  addImage('inner-c', 'imgs/background.png');
  addImage('fire1', 'imgs/fire1.png');
  addImage('fire2', 'imgs/fire2.png');
  addImage('tom', 'imgs/tom.png');
  addImage('tt', 'imgs/tt.png');
  addImage('tagline', 'imgs/tagline.png');
  addImage('copyright', 'imgs/copyright.png');
  addImage('cta', 'imgs/cta.png');
  addImage('messaging', 'imgs/messaging.png');
  addImage('dvd', 'imgs/dvd.png');
  addImage('cast', 'imgs/cast.png');
}

function addImage(c, url) {
  var elem = document.createElement("img");
  elem.setAttribute("src", url);
  document.getElementById(c).appendChild(elem);
}

function backgroundExit() {
  window.open(bgClickTag, "_blank");
  resetVideo();
  console.log("Background Exit");
}

function ctaExitHandler() {
  window.open(ctaClickTag, "_blank");
  resetVideo();
  console.log("CTA Exit");
}

function show(id) {
  id.style.display = 'block';
}

function hide(id) {
  id.style.display = 'none';
}

function videoEnd(event) {
  if(audioClicked) {
    showOverlay();
  }
    hide(largeAudio);
    showOverlay();
}

function restartVideo() {
  hideOverlay();
  audioClicked = true;
  unmute.style.display = 'none';
  trailerSrcMp4.src = ('trailer.mp4');
  trailerVideo.load();
  playVideo();
  unmuteVideo();
}

function resetVideo() {
  audioClicked = true;
  hide(largeAudio);
  showOverlay();
  trailerVideo.currentTime = 0;
  pauseVideo();
  muteVideo();
}

function playVideo() {
  trailerVideo.play();
  playBtn.className = '';
}

function pauseVideo() {
  trailerVideo.pause();
  playBtn.className = 'paused';
}

function muteVideo() {
  trailerVideo.volume = 0;
  audioBtn.className = 'muted'
}

function unmuteVideo() {
  trailerVideo.volume = 1;
  audioBtn.className = ''
}

function start() {
  playVideo();
  container.className = 'start';
  setTimeout(function(){
    container.className = 'start fadein';
  }, 500);
}

function playToggle() {
  if(trailerVideo.paused == true) {
    playVideo();
  } else {
    pauseVideo();
  }
}

function audioToggle() {
  if(trailerVideo.volume == 0) {
    unmuteVideo();
  } else {
    muteVideo();
  }
}

function scene02() {
  innerC.className = 'scene02';
}

function showOverlay() {
  show(replay);
  show(replayOverlay);
}

function hideOverlay() {
  hide(replay);
  hide(replayOverlay);
}

init();
