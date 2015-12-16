var container;
var bgExit;
var cta;
var video;
var videoC;
var videoToggle;
var audioToggle;
var replay;
var isMuted;
var overlay;
var fullTrailer;
var animVideo;
var animVideoC;
var innerC;
var innerCResolve;
var audioLarge;
var videoControls;
var ctaR;
var whiteOverlay;
var bgImg;

var addTimer  = setTimeout(function() {
  videoEndTimeout();
  console.log('>>>> VIDEO TIMED OUT <<<<');
}, 12000);


function init() {
  container             = document.getElementById('ad');
  bgExit                = document.getElementById('background-exit');
  cta                   = document.getElementById('cta');
  ctaR                   = document.getElementById('cta-r');
  video                 = document.getElementById('video');
  videoC                = document.getElementById('video-c');
  videoToggle           = document.getElementById('play-pause');
  audioToggle           = document.getElementById('audio-toggle');
  replay                = document.getElementById('replay-btn');
  overlay               = document.getElementById('replay-overlay');
  animVideo             = document.getElementById('anim-video');
  innerC                = document.getElementById('ad-inner-c');
  innerCResolve         = document.getElementById('ad-inner-c-resolve');
  audioLarge            = document.getElementById('audio-large');
  animVideoC            = document.getElementById('anim-video-c');
  videoControls         = document.getElementById('video-controls');
  whiteOverlay          = document.getElementById('white-overlay');
  bgImg                 = document.getElementById('bg');


  isMuted               = true;
  fullTrailer           = false;
  videoScreen           = true;

  container.style.display = "block";

  addImages();
  addListeners();
  start();
}

function start() {
  show(innerC);
  video.currentTime = 0;
  video.volume = 0;
  video.play();
  hide(replay);
  hide(overlay);
  clickAudioToggle();
}

function addListeners() {
  bgExit.addEventListener('click', bgExitHandler, false);
  cta.addEventListener('click', watchNow, false);
  ctaR.addEventListener('click', watchNow, false);
  videoToggle.addEventListener("click", clickVideoToggle, false);
  audioToggle.addEventListener("click", clickAudioToggle, false);
  audioLarge.addEventListener("click", replayTrailer, false);
  audioLarge.addEventListener("click", showControls, false);

  replay.addEventListener("click", replayTrailer, false);

  video.addEventListener("mouseover", showControls, false);
  video.addEventListener("mouseout", hideControls, false);
  videoControls.addEventListener("mouseover", showControls, false);


  video.addEventListener("ended", videoEnd, false);
  animVideo.addEventListener("ended", videoEnd, false);
  whiteOverlay.addEventListener("mozAnimationEnd", hideWhite);
  whiteOverlay.addEventListener("webkitAnimationEnd", hideWhite);
  whiteOverlay.addEventListener("oanimationend", hideWhite);
  whiteOverlay.addEventListener("MSAnimationEnd", hideWhite);
  whiteOverlay.addEventListener("animationend", hideWhite);

  // whiteOverlay.addEventListener("webkitTransitionEnd", hideWhite);
  // whiteOverlay.addEventListener("transitionend", hideWhite);
}



// function addImages()
function addImages() {
 //addImage('bg', 'imgs/bg.jpg');
 addImage('logo', 'imgs/logo.png');
 addImage('copyright', 'imgs/copyright.png');
 addImage('copy', 'imgs/copy.png');
 addImage('cta', 'imgs/cta.png');

 addImage('logo-r', 'imgs/logo.png');
 addImage('copyright-r', 'imgs/copyright.png');
 addImage('copy-r', 'imgs/copy.png');
 addImage('cta-r', 'imgs/cta.png');
}

// function addImage()
function addImage(c, url) {
  var elem = document.createElement("img");
  elem.setAttribute("src", url);
  document.getElementById(c).appendChild(elem);
}

function watchNow(e) {
  video.pause();
  animVideo.pause();


  if(videoScreen) {
    Enabler.exit('Watch Now Exit');
    console.log('CTA Exit');
    scene02();
  } else {
    Enabler.exit('Watch Now Exit');
    console.log('CTA Exit');
  }
}

function bgExitHandler(e) {
  video.pause();
  animVideo.pause();

  if(videoScreen) {
    Enabler.exit('Background Exit');
    console.log('Background Exit');
    scene02();
  } else {
    Enabler.exit('Background Exit');
    console.log('Background Exit');
  }
}

function clickVideoToggle() {
  if(video.paused) {
    video.play();
    videoToggle.className = '';
    console.log('>>>> VIDEO PLAY <<<<');
  } else {
    video.pause();
    videoToggle.className = 'paused';
    console.log('>>>> VIDEO PAUSE <<<<');
  }
}

function show(id) {
  id.style.display = 'block';
}

function hide(id) {
  id.style.display = 'none';
}

function showControls() {
  //console.log("mouseover");
  show(videoControls);
}

function hideControls() {
  //console.log("mouseoff");
  hide(videoControls);
}

function clickAudioToggle() {
  if(fullTrailer == false) {
    fullTrailer = true;
    //playTrailer();
    return
  }
  if(isMuted) {
    isMuted = false;
    video.volume = 1;
    audioToggle.className = '';
    console.log('>>>> SOUND ON <<<<');
  } else {
    isMuted = true;
    video.volume = 0;
    audioToggle.className = 'sound-off';
    console.log('>>>> SOUND OFF <<<<');
  }
}

function playTrailer() {
  video.play();
  fullTrailer = true;
  audioToggle.className = '';
  video.currentTime = 0;
  video.volume = 1;
  clickVideoToggle()
}

function replayTrailer() {
  video.play();
  video.currentTime = 0;
  video.volume = 1;
  show(videoToggle);
  show(audioToggle);
  hide(replay);
  hide(overlay);
  fullTrailer = true;
  clickAudioToggle();
  clearTimeout(addTimer);
  hide(audioLarge);
}

function animVideoHandler() {
  console.log('>>>> ANIMATION STARTED <<<<');
  videoScreen = false;
  show(animVideoC);
  animVideo.play();
  hide(videoC);
  hide(innerC);

}

function videoEndTimeout() {
  video.pause();
  video.currentTime = 0;
  hide(audioLarge);
  show(replay);
  show(overlay);
  hide(videoToggle);
  hide(audioToggle);
}

function scene02() {
  console.log(">>>> SCENE02 <<<<");
  bgImg.style.backgroundImage = 'url("imgs/bg.jpg")';
  hide(animVideoC);
  show(innerCResolve);
  hide(innerC);
  container.className = 'scene02';
}

function videoEnd(e) {
  if(e.target.id == "video") {
    if(fullTrailer == false) {
      videoEndTimeout();
    } else {
      animVideoHandler();
      console.log(">>>> animVideoHandler init <<<<");
    }
  } else {
    console.log(">>>> scene02 init <<<<");
    scene02();
  }
}

function hideWhite() {
  console.log()
  whiteOverlay.style.display = 'none';
}

init();
