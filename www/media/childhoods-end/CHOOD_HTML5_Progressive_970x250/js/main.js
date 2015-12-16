var container;
var progExit;
var resExit;
var progC;

var video;
var mp4Src;
var resVideo;
var resMp4Src;
var trailerVideo;
var trailerMp4Src;
var playBtn;
var audioBtn;
var seekBar;
var largePlay;

var replayBtn;
var replayC;
var ctaTimer;

var today       = new Date();
var dec14       = new Date(2015,11,8);
var monday      = new Date(2015,11,14);
var tonight     = new Date(2015,11,15);
var ttUrl;
var pbarUrl;
var ttUrlProg;

function getTuneIn() {
  if(today <= dec14) {
    console.log(Number(0));
    ttUrl = "imgs/tune-00.png";
    pbarUrl = "imgs/prog-bar-00.jpg";
  } else if (today <= monday) {
    console.log(Number(1));
    ttUrl = "imgs/tune-01.png";
    pbarUrl = "imgs/prog-bar-01.jpg";
  } else if(today <= tonight) {
    console.log(Number(2));
    ttUrl = "imgs/tune-02.png";
    pbarUrl = "imgs/prog-bar-02.jpg";
  } else {
    console.log(Number(3));
    ttUrl = "imgs/tune-03.png";
    pbarUrl = "imgs/prog-bar-03.jpg";
  }
}

////////////////////////////////////
// Set ttDate var to correct number
getTuneIn();
////////////////////////////////////

Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function(){
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
});

function initEB() {
  // if (!EB.isInitialized()) {
  //   EB.addEventListener(EBG.EventName.EB_INITIALIZED, politeInit);
  // } else {
    politeInit();
  // }
}

function politeInit() {
  /////////////////////////////////////////////////////////////////////////////
  // Polite load the CSS file /////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////

  var extCSS = document.createElement('link');
  extCSS.setAttribute("rel", "stylesheet");
  extCSS.setAttribute("type", "text/css");
  extCSS.setAttribute("href", "styles/screen.css");
  document.getElementsByTagName("head")[0].appendChild(extCSS);

  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////

  container             = document.getElementById('container');
  progExit              = document.getElementById('progressive-exit');
  resExit               = document.getElementById('resolve-exit');
  progC                 = document.getElementById('progressive-c');

  video                 = document.getElementById('video');
  resVideo              = document.getElementById('resolve-video');
  trailerVideo          = document.getElementById('trailer-video');
  mp4Src                = document.getElementById('mp4-src');
  resMp4Src             = document.getElementById('resolve-mp4-src');
  trailerMp4Src         = document.getElementById('trailer-mp4-src');
  playBtn               = document.getElementById('play-toggle');
  audioBtn              = document.getElementById('audio-toggle');
  seekBar               = document.getElementById('seekBar');
  largePlay             = document.getElementById('play');

  replayBtn             = document.getElementById('cta-img');
  replayC               = document.getElementById('replay');

  if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/Android/i))) {
    hide(playBtn);
    hide(audioBtn);
    hide(seekBar);
    trailerVideo.setAttribute('controls', 'controls');
  }

  /////////////////////////////////////////////////////////////////////////////
  // Run base functions ///////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////

  addImages();
  addEventListeners();
  initVideo();
  startAd();

  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
} // END starAd()

function addImage(c, url) {
  var elem = document.createElement("img");
  elem.setAttribute("src", url);
  document.getElementById(c).appendChild(elem);
}

function addImages() {
  addImage('res-tune-c', ttUrl);
  addImage('progressive-bar', pbarUrl);
}

function addEventListeners() {
  container.addEventListener('mouseover', hoverAd);
  replayBtn.addEventListener('mouseover', hoverCta);

  replay.addEventListener('click', backgroundExit, false);
  progExit.addEventListener('click', backgroundExit, false);
  resExit.addEventListener('click', backgroundExit, false);

  video.addEventListener('ended', videoEnd, false);
  trailerVideo.addEventListener('ended', videoEnd, false);
  trailerVideo.addEventListener('timeupdate', timeUpdater, false);
  playBtn.addEventListener('click', playToggle, false);
  audioBtn.addEventListener('click', audioToggle, false);
  seekBar.addEventListener('change', seekBarHandler, false);
  seekBar.addEventListener('mouseup', seekBarHandler, false);
  seekBar.addEventListener('mousedown', seekBarHandler, false);
  largePlay.addEventListener('click', playToggle, false);
}

function initVideo() {
  var videoTrackingModule = new EBG.VideoModule(video);
  // Main video player
  mp4Src.src = 'preview.mp4';
  video.load();
  // Resolve video player
  resMp4Src.src = 'resolve.mp4';
  resVideo.load();
  // Trailer video player
  trailerMp4Src.src = 'trailer.mp4';
  trailerVideo.load();
}

function startAd() {
  container.style.display = "block";
  container.className = 'start';
  playVideo(video);
}


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

function show(id) {
  id.style.display = 'block';
}

function hide(id) {
  id.style.display = 'none';
}

function backgroundExit() {
  console.log('Background Exit');
  if(trailerVideo.playing) {
    pauseVideo(trailerVideo);
    trailerVideo.currentTime = 0;
    show(largePlay);
  }
  EB.clickthrough();
  startResolve();
}

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

function videoEnd(event) {
  startResolve();
  resetVideo();
}

function resetVideo() {
  console.log("resetVideo();");
  largePlay.style.display = "block";
  trailerVideo.currentTime = 0;
  pauseVideo(trailerVideo);
}

function playVideo(player) {
  player.play();

  if(player.id == 'trailer-video') {
    playBtn.className = '';
  }
}

function pauseVideo(player) {
  player.pause();

  if(player.id == 'trailer-video') {
    playBtn.className = 'play';
  }
}

function muteVideo() {
  trailerVideo.volume = 0;
  audioBtn.className = 'off';
}

function unmuteVideo() {
  trailerVideo.volume = 1;
  audioBtn.className = '';
}

function playToggle() {
  if(trailerVideo.paused == true) {
    playVideo(trailerVideo);
    hide(largePlay);
  } else {
    pauseVideo(trailerVideo);
  }
}

function audioToggle() {
  console.log('clicked audio toggle');
  if(trailerVideo.volume == 0) {
    unmuteVideo();
  } else {
    muteVideo();
  }
}

function timeUpdater(event) {
	currTime = trailerVideo.currentTime;
  var value = (100 / trailerVideo.duration) * currTime;
  seekBar.value = value;
}

function seekBarHandler(event) {
  switch(event.type) {
      case 'change':
        var time = trailerVideo.duration * (seekBar.value / 100);
        trailerVideo.currentTime = time;
        break;
      case 'mousedown':
        pauseVideo(trailerVideo);
        break;
      case 'mouseup':
        playVideo(trailerVideo);
  }
}

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

function restartVideo() {
  show(videoControls);
  mp4Src.src = 'preview.mp4';
  video.load();
  playVideo(video);
}

function startResolve(e) {
  pauseVideo(video);
  playVideo(resVideo);
  container.className = 'resolve';

  setTimeout(function() {
    hide(progC);
  }, 1500);
}

function startProgressive() {
  video.currentTime = 0;
  container.className = 'progressive';

  setTimeout(function(){
    playVideo(video);
  }, 500);
}

ctaTimer = function() {
  setTimeout(function() {
    console.log('Cancel timer.');
    replayC.className = '';
  }, 1000);
};


function hoverCta() {
  console.log('Mouse over ad.');
  if(replayC.className == 'hover') {
    return;
  } else {
    replayC.className = 'hover';
    ctaTimer();
  }
}

function hoverAd() {
  if(resVideo.playing) {
    return;
  } else {
    resVideo.currentTime = 0;
    resVideo.play();
  }
}

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

window.addEventListener("load", initEB);
