var container;
var content;
var progExit;
var progCta;
var resExit;
var resCta;
var progCta;
var progressiveC;
var resolveC;
var trailerVideo;
var trailerSrcMp4;
var white;
var unmute;
var replay;
var playBtn;
var audioBtn;
var audioClicked;

function init() {
  container             = document.getElementById('container');
  content               = document.getElementById('content');
  progExit              = document.getElementById('progressive-exit');
  progCta               = document.getElementById('progressive-cta');
  resExit               = document.getElementById('resolve-exit');
  resCta                = document.getElementById('resolve-cta');
  progCta               = document.getElementById('progressive-cta');
  progressiveC          = document.getElementById('progressive-c');
  resolveC              = document.getElementById('resolve-c');
  trailerVideo          = document.getElementById('trailer-v');
  trailerSrcMp4         = document.getElementById('trailer-mp4-src');
  white                 = document.getElementById('white');
  unmute                = document.getElementById('large-audio');
  replay                = document.getElementById('replay');
  playBtn               = document.getElementById('play-toggle');
  audioBtn              = document.getElementById('audio-toggle');
  audioClicked          = false;

  Enabler.loadModule(studio.module.ModuleId.VIDEO, function() {
    studio.video.Reporter.attach('trailer', trailerVideo);
  });

  if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/Android/i))) {
    playBtn.style.display = 'none';
    audioBtn.style.display = 'none';
    trailerVideo.setAttribute('controls', 'controls');
  }

  trailerSrcMp4.src = Enabler.getUrl('preview.mp4');
  trailerVideo.load();

  addListeners();
  start();
}

function start() {
  container.style.display = "block";
  playVideo();
}

function addListeners() {
  trailerVideo.addEventListener('ended', videoEnd, false);
  unmute.addEventListener('click', restartVideo, false);
  replay.addEventListener('click', replayAd, false);
  playBtn.addEventListener('click', playToggle, false);
  audioBtn.addEventListener('click', audioToggle, false);
  progExit.addEventListener('click', backgroundExit, false);
  resExit.addEventListener('click', backgroundExit, false);
  resCta.addEventListener('click', ctaExit, false);
  progCta.addEventListener('click', ctaExit, false);

  white.addEventListener("mozAnimationEnd", hideWhite, false);
  white.addEventListener("webkitAnimationEnd", hideWhite, false);
  white.addEventListener("oanimationend", hideWhite, false);
  white.addEventListener("MSAnimationEnd", hideWhite, false);
  white.addEventListener("animationend", hideWhite, false);
}

// function addImages() {
//   addImage('background-c', 'imgs/sky-bg.jpg');
// }
//
// function addImage(c, url) {
//   var elem = document.createElement("img");
//   elem.setAttribute("src", url);
//   document.getElementById(c).appendChild(elem);
// }

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
    playResolve();
    white.style.display = 'none';
    Enabler.exit('CTA Exit');
    console.log('CTA Exit');
  } else {
    Enabler.exit('CTA Exit');
    console.log('CTA Exit');
  }
}

function backgroundExit(e) {
  if(e.target.id == 'resolve-exit') {
    Enabler.exit('Background Exit');
    console.log('Background Exit');
  } else {
    trailerVideo.pause();
    playResolve();
    white.style.display = 'none';
    Enabler.exit('Background Exit');
    console.log('Background Exit');
  }
}

function hideWhite() {
  white.style.display = 'none';
  content.className = 'resolve-anim';
}

function restartVideo() {
  show(progressiveC);
  progressiveC.className = '';
  resolveC.className = 'fadeout';
  audioClicked = true;
  unmute.style.display = 'none';
  trailerSrcMp4.src = Enabler.getUrl('trailer.mp4');
  trailerVideo.load();
  playVideo();
  unmuteVideo();
}

function replayAd() {
  show(progressiveC);
  progressiveC.className = '';
  resolveC.className = 'fadeout';
  white.style.display = 'block';
  white.classname = '';
  restartVideo();
  playVideo();
  unmuteVideo();
}

function videoEnd(event) {
      playResolve();
      white.style.display = 'none';
}

function playResolve() {
  audioClicked = true;
  progressiveC.className = 'fadeout';
  setTimeout(function(){
    hide(progressiveC);
    resolveC.className = '';
    content.className = 'resolve-anim';
  }, 500);
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

init();
