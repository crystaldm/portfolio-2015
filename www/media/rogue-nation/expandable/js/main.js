var container;
var content;
var progExit;
var progCta;
var resExit;
var resCta;
var progCta;
var expandedC;
var collapsedC;
var trailerVideo;
var trailerSrcMp4;
var unmute;
var replay;
var replayOverlay;
var playBtn;
var audioBtn;
var audioClicked;
var closeBtn;
var expandBtn;
var expandingC;
var vidControls;
var ctaClickTag = 'https://www.google.com';
var bgClickTag = 'https://www.google.com';

function init() {
  container             = document.getElementById('container');
  content               = document.getElementById('content');
  progExit              = document.getElementById('expand-exit');
  resExit               = document.getElementById('collapse-exit');
  resCta                = document.getElementById('c-cta');
  progCta               = document.getElementById('e-cta');
  expandedC             = document.getElementById('expanded-c');
  collapsedC            = document.getElementById('collapsed-c');
  trailerVideo          = document.getElementById('trailer-v');
  trailerSrcMp4         = document.getElementById('trailer-mp4-src');
  unmute                = document.getElementById('large-audio');
  replay                = document.getElementById('replay');
  replayOverlay         = document.getElementById('replay-overlay');
  playBtn               = document.getElementById('play-toggle');
  audioBtn              = document.getElementById('audio-toggle');
  closeBtn              = document.getElementById('close-btn-c');
  expandBtn             = document.getElementById('expand-btn-c');
  expandingC            = document.getElementById('expanding-c');
  vidControls           = document.getElementById('video-controls-c');
  audioClicked          = false;

  if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/Android/i))) {
    playBtn.style.display = 'none';
    audioBtn.style.displasy = 'none';
    trailerVideo.setAttribute('controls', 'controls');
  }

  trailerSrcMp4.src = ('preview.mp4');
  trailerVideo.load();

  addImages();
  addListeners();
  start();
}

function start() {
  container.style.display = "block";
  playVideo();
}

function addListeners() {
  trailerVideo.addEventListener('ended', videoEnd, false);
  trailerVideo.addEventListener('ended', showOverlay, false);
  unmute.addEventListener('click', restartVideo, false);
  replay.addEventListener('click', replayAd, false);
  playBtn.addEventListener('click', playToggle, false);
  audioBtn.addEventListener('click', audioToggle, false);

  progExit.addEventListener('click', backgroundExit, false);
  resExit.addEventListener('click', backgroundExit, false);
  resCta.addEventListener('click', ctaExit, false);
  progCta.addEventListener('click', ctaExit, false);

  closeBtn.addEventListener('click', showCollapsed, false);
  expandBtn.addEventListener('click', showExpanded, false);
}

function addImages() {
  addImage('c-bg', 'imgs/c-bg.jpg');
  addImage('c-messaging', 'imgs/c-messaging.png');
  addImage('c-dvd', 'imgs/dvd.png');
  addImage('c-tt', 'imgs/tt.png');
  addImage('c-cta', 'imgs/cta.png');

  addImage('e-bg', 'imgs/e-bg.jpg');
  addImage('tom', 'imgs/tom.png');
  addImage('e-messaging', 'imgs/e-messaging.png');
  addImage('e-dvd', 'imgs/dvd.png');
  addImage('e-tt', 'imgs/tt.png');
  addImage('e-cta', 'imgs/cta.png');
  addImage('replay', 'imgs/replay.png');
}

function addImage(c, url) {
  var elem = document.createElement("img");
  elem.setAttribute("src", url);
  document.getElementById(c).appendChild(elem);
}

function show(id) {
  id.style.display = 'block';
}

function hide(id) {
  id.style.display = 'none';
}

function ctaExit(e) {
  if(e.target.id == 'progressive-cta') {
    audioClicked = true;
    pauseVideo();
    showCollapsed();
    console.log('CTA Exit');
  } else {
    console.log('CTA Exit');
    window.open(ctaClickTag, "_blank");
  }
}

function backgroundExit(e) {
  if(e.target.id == 'resolve-exit') {
    console.log('Background Exit');
  } else {
    trailerVideo.pause();
    showCollapsed();
    window.open(bgClickTag, "_blank");
    console.log('Background Exit');
  }
}

function restartVideo() {
  audioClicked = true;
  unmute.style.display = 'none';
  trailerSrcMp4.src = ('trailer.mp4');
  trailerVideo.load();
  playVideo();
  unmuteVideo();
}

function replayAd() {
  show(expandedC);
  restartVideo();
  playVideo();
  unmuteVideo();
}

function videoEnd(event) {
  if(audioClicked) {
    //do nothing
  } else {
    showCollapsed();
  }
}

function showCollapsed() {
  hide(progExit);
  show(resExit);
  pauseVideo();
  muteVideo();
  collapsedC.className = '';
  content.className = '';
  setTimeout(function(){
    expandedC.className = 'fadeout';
    expandingC.className = 'collapsed';
    overlayFix();
  }, 800);
}

function showExpanded() {
  hide(resExit);
  show(progExit);
  restartVideo();
  unmute.style.display = 'none';
  expandedC.className = '';
  collapsedC.className = 'fadeout';
  expandingC.className = 'expanded';
  content.className = 'initial-anim';
  show(expandedC);
}

// hides expanded div
function overlayFix() {
  setTimeout(function(){
    hide(expandedC);
  }, 400);
}

function playVideo() {
  hideOverlay();
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

function showOverlay() {
  if(audioClicked) {
    show(replay);
    show(replayOverlay);
  } else {
    hideOverlay();
  }
}

function hideOverlay() {
  hide(replay);
  hide(replayOverlay);
}


init();
