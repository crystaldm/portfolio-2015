// JavaScript Document
// DoubleClick HTML5 Rich

// -----------------------------
// INITIAL SET UP
// -----------------------------
// If true, start function. If false, listen for INIT.


window.onload = function() {
  if (Enabler.isInitialized()) {
      enablerInitHandler();
  } else {
      Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitHandler);
  }
}

function enablerInitHandler() {
  Enabler.setExpandingPixelOffsets(300, 0, 500, 600, false, false);
    // Start ad, initialize animation, load in your image assets, call Enabler methods,
    // and/or include other Studio modules. Or also, you can start the Polite Load

    if (Enabler.isPageLoaded()) {
    	pageLoadedHandler();
  	} else {
    	Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, pageLoadedHandler);
  	}
}

function pageLoadedHandler() {


  WebFontConfig = {
    google: {
      families: ['Montserrat:700:latin']
    }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();

  var extCSS = document.createElement('link');
	extCSS.setAttribute("rel", "stylesheet");
	extCSS.setAttribute("type", "text/css");
	extCSS.setAttribute("href", Enabler.getUrl("styles.css"));
	document.getElementsByTagName("head")[0].appendChild(extCSS);


  // Load in additional assets or add animation/video
  init();
}

var expandImgC;
var endImgC;
// Declare elements from the HTML
//var container;
var bgExit;
var exBgExit;
var container;
var startFrame;
var keyart_ex;
var netflix_ex;
var netflixDoc_ex;
var keith_ex;
var richards_ex;
var under_ex;
var nowStreaming_ex;
var ctaBtn_tab;
var ctaBG_tab;
var ex_ctaBtn_tab;
var ex_ctaBG_tab;

var vidPlayer;
var trailerMp4;
var vidControls;
var playBtn;
var pauseBtn;
var muteBtn;
var unmuteBtn;
var seekBar;
var clickSoundBtn;

var endFrame;
var keyart;
var netflix;
var netflixDoc;
var keith_tt;
var richards_tt;
var under_tt;
var film_by;
var nowStreaming;

var expandingC;
var expandedC;

var replayBtn;
var expandBtn;
var closeBtn;
var ctayBtn;
var ctaBG;
var replayOverlay;

var isFirstPlay = true;
var vidPlaying = false;
var resolved = false;
var userInteracted = false;
var isExpanded = false;

//Function to run with any animations starting on load, or bringing in images etc
init = function(){

	console.log('init called');
  expandImgC = document.getElementById('expand-image-c');
  endImgC = document.getElementById('end-image-c');
  addImages();
	//Assign All the elements to the element on the page
	container = document.getElementById('container');
	bgExit = document.getElementById('bg-exit');
  exBgExit = document.getElementById('ex-bg-exit');

	// START FRAME
	startFrame = document.getElementById('startFrame');
	keyart_ex = document.getElementById('keyart_ex');
	netflix_ex = document.getElementById('netflix_ex');
	netflixDoc_ex = document.getElementById('netflixDoc_ex');
	keith_ex = document.getElementById('keith_ex');
	richards_ex = document.getElementById('richards_ex');
	under_ex = document.getElementById('under_ex');
  nowStreaming_ex = document.getElementById('nowStreaming_ex');
  ctaBtn_tab = document.getElementById('ctaBtn_tab');
  ctaBG_tab = document.getElementById('ctaBG_tab');

	vidPlayer = document.getElementById('vidPlayer');
  trailerMp4 = document.getElementById('trailer_mp4');
  vidControls = document.getElementById('vidControls');
  playBtn = document.getElementById('playBtn');
  pauseBtn = document.getElementById('pauseBtn');
  muteBtn = document.getElementById('muteBtn');
  unmuteBtn = document.getElementById('unmuteBtn');
  seekBar = document.getElementById('seekBar');

	// END FRAME
	endFrame = document.getElementById('endFrame');
	keyart = document.getElementById('keyart');
	netflix = document.getElementById('netflix');
	netflixDoc = document.getElementById('netflixDoc');
	keith_tt = document.getElementById('keith_tt');
	richards_tt = document.getElementById('richards_tt');
	under_tt = document.getElementById('under_tt');
  film_by = document.getElementById('film_by');
  nowStreaming = document.getElementById('nowStreaming');
  expandingC = document.getElementById('expanding-c');
  expandedC = document.getElementById('expanded-c');

	replayBtn = document.getElementById('replayBtn');
  expandBtn = document.getElementById('expand-btn');
  closeBtn = document.getElementById('close-btn');
	ctaBtn = document.getElementById('ctaBtn');
  ctaBG = document.getElementById('ctaBG');
  replayOverlay = document.getElementById('replay_overlay');

	//Bring in listeners
	addListeners();

	//Show Ad
	container.style.display = "block";
	setTimeout(function(){
    trailerMp4.src = Enabler.getUrl('trailer.mp4');
    vidPlayer.load();
    resolve();
  },10);
}

function addImage(c, url, id) {
  var elem = document.createElement("img");
  elem.setAttribute("src", url);
  elem.setAttribute("id", id);
  c.appendChild(elem);
}

function addImages() {
  addImage(expandImgC, 'keyartExpanded.jpg', 'keyart_ex');
  addImage(expandImgC, 'netflix.png', 'netflix_ex');
  addImage(expandImgC, 'netflixDoc.png', 'netflixDoc_ex');
  addImage(expandImgC, 'keith_ex.png', 'keith_ex');
  addImage(expandImgC, 'richards_ex.png', 'richards_ex');
  addImage(expandImgC, 'under_ex.png', 'under_ex');
  addImage(expandImgC, 'nowStreaming_ex.png', 'nowStreaming_ex');
  addImage(expandImgC, 'replayBtn.png', 'replayBtn');

  addImage(endImgC, 'keyart.jpg', 'keyart');
  addImage(endImgC, 'netflix.png', 'netflix');
  addImage(endImgC, 'netflixDoc.png', 'netflixDoc');
  addImage(endImgC, 'keith_tt.png', 'keith_tt');
  addImage(endImgC, 'richards_tt.png', 'richards_tt');
  addImage(endImgC, 'under_tt.png', 'under_tt');
  addImage(endImgC, 'film_by.png', 'film_by');
  addImage(endImgC, 'nowStreaming.png', 'nowStreaming');
}

// -----------------------------
//EVENT LISTENERS
// -----------------------------
addListeners = function() {
	bgExit.addEventListener('click', bgExitHandler, false);
  exBgExit.addEventListener('click', bgExitHandler, false);

	vidPlayer.addEventListener('ended', videoEndHandler, false);
  vidPlayer.addEventListener('timeupdate', timeUpdater, false);
  vidPlayer.addEventListener('ended', videoShowOverlay, false);
  replayBtn.addEventListener('click', videoHideOverlay, false);

  playBtn.addEventListener('click', pausePlayHandler, false);
  pauseBtn.addEventListener('click', pausePlayHandler, false);
  muteBtn.addEventListener('click', muteUnmuteHandler, false);
  unmuteBtn.addEventListener('click', muteUnmuteHandler, false);
  seekBar.addEventListener('change', seekBarHandler, false);
  seekBar.addEventListener('mouseup', seekBarHandler, false);
  seekBar.addEventListener('mousedown', seekBarHandler, false);

	//clickSoundBtn.addEventListener('click', clickSoundHandler, false);

  ctaBtn_tab.addEventListener('click', ctaHandler, false);
  ctaBtn_tab.addEventListener('mouseover', ctaHandler, false);
	ctaBtn_tab.addEventListener('mouseout', ctaHandler, false);

  Enabler.addEventListener(studio.events.StudioEvent.EXPAND_START, expandStartHandler);
  Enabler.addEventListener(studio.events.StudioEvent.EXPAND_FINISH, expandFinishHandler);
  Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_START, collapseStartHandler);
  Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_FINISH, collapseFinishHandler);

  expandingC.addEventListener("transitionend", expandCollapseAnimationEnd, false);
  expandingC.addEventListener("webkitTransitionEnd", expandCollapseAnimationEnd, false);
  expandingC.addEventListener("MSTransitionEnd", expandCollapseAnimationEnd, false);
  expandingC.addEventListener("oTransitionEnd", expandCollapseAnimationEnd, false);

  ctaBtn.addEventListener('click', ctaHandler, false);
	ctaBtn.addEventListener('mouseover', ctaHandler, false);
	ctaBtn.addEventListener('mouseout', ctaHandler, false);

  expandBtn.addEventListener('click', expandCollapseToggle, false);
  closeBtn.addEventListener('click', expandCollapseToggle, false);
  replayOverlay.removeAttribute('class');
  replayBtn.addEventListener('click', showExpanded, false);
}

// -----------------------------
// INITIAL ANIMATION
// -----------------------------
function initialAnim(){
	console.log('resolve - startFrame');

	keyartStart.setAttribute('class','fadeIn');
	netflix_ex.setAttribute('class','fadeIn');
	netflixDoc_ex.setAttribute('class','fadeIn');
	keith_ex.setAttribute('class','fadeIn');
	richards_ex.setAttribute('class','fadeIn');
	under_ex.setAttribute('class','fadeIn');
  nowStreaming_ex.setAttribute('class','fadeIn');
  vidPlayer.setAttribute('class','fadeIn');

  if(isFirstPlay){
    trailerMp4.src = Enabler.getUrl('preview.mp4');
    vidPlayer.load();
    pauseVid();
   }

	setTimeout(function(){
    ctaBtn_ex.setAttribute('class','fadeIn');
		startVid();
	},1550);
}

function hideInitial(){
  // keyartStart.setAttribute('class','fadeIn quickFade');
	// netflix_ex.setAttribute('class','fadeIn quickFade');
	// netflixDoc_ex.setAttribute('class','fadeIn quickFade');
	// keith_ex.setAttribute('class','fadeIn quickFade');
	// richards_ex.setAttribute('class','fadeIn quickFade');
	// under_ex.setAttribute('class','fadeIn quickFade');
  // nowStreaming_ex.setAttribute('class','fadeIn quickFade');
  // ctaBtn_ex.setAttribute('class','fadeIn quickFade');
  // clickSoundBtn.setAttribute('class','fadeIn quickFade');
  // vidPlayer.setAttribute('class','fadeIn quickFade');
  // vidControls.setAttribute('class','fadeIn quickFade');
  //
  // setTimeout(function(){
  //   startFrame.style.display = 'none';
	// 	clickSoundBtn.style.display = 'none';
	// },800)
}


// -----------------------------
// FUNCTIONS
// -----------------------------
function bgExitHandler(e) {
  if(isExpanded) {
    expandCollapseToggle();
    Enabler.exit('Expanded Background Exit');
  } else {
    Enabler.exit('Collapsed Background Exit');
  }
}

function ctaHandler(event) {
	switch(event.type){
		case 'mouseover':
      ctaBG.setAttribute('class','slideOut');
      ctaBG_tab.setAttribute('class','slideOut');
			break;
		case 'mouseout':
      ctaBG_tab.removeAttribute('class');
      ctaBG.removeAttribute('class');
			break;
		case 'click':
      if(vidPlaying){
         pauseVid();
         vidPlaying = false;
      }
      if(!resolved){
        transitionFrames();
      }
      Enabler.exit('Watch Now Exit');
	}
}

/////////////////////////////////////////////.DS_Store


function expandCollapseToggle() {
  isExpanded ? Enabler.requestCollapse() : Enabler.requestExpand();
}

function expandCollapseAnimationEnd(e) {
  if(e.target.id == 'expanding-c') {
    expandingC.className == 'expanded' ? Enabler.finishExpand() : Enabler.finishCollapse();
  }
}

function expandStartHandler() {
  hideResolve();
  setTimeout(function(){
    expandingC.className = 'expanded';
  }, 500);
  console.log('>>> Expand Started <<<');
}

function expandFinishHandler() {
  isExpanded = true;
  resetResolve();
  showExpanded();
  console.log('>>> Expand Finished <<<');
}

function collapseStartHandler() {
  hideExpanded();
  setTimeout(function(){
    expandingC.className = 'collapsed';
  }, 500);

  Enabler.reportManualClose();
  console.log('Close Ad');
  console.log('>>> Collapse Started <<<');
}

function collapseFinishHandler() {
  isExpanded = false;
  resolve();
  resetExpanded();
  console.log('>>> Collapse Finished <<<');
}


// -----------------------------
// VIDEO FUNCTIONS
// -----------------------------
function startVid(){
	console.log('video started');

  if(isFirstPlay){
   clickSoundBtn.setAttribute('class','fadeIn');
   vidPlayer.volume = 0.0;
  }else{
    trailerMp4.src = Enabler.getUrl('trailer.mp4');
    vidPlayer.load();

    vidControls.setAttribute('class','fadeIn');
    unmuteVid();
    playCheck();
    audioCheck();

    Enabler.loadModule(studio.module.ModuleId.VIDEO, function() {
      studio.video.Reporter.attach('Keith Richards Trailer', vidPlayer);
    });
    vidPlayer.addEventListener('click', videoEventsHandler, false);

    if(!userInteracted) {
      userInteracted = true;
    }
  }

  //vidPlayer.currentTime = 26;
  playVid();
	vidPlaying = true;
  resolved = false;
}

function timeUpdater(event){
	currTime = vidPlayer.currentTime;

  // Calculate the slider value
  var value = (100 / vidPlayer.duration) * currTime;

  // Update the slider value
  seekBar.value = value;

	// if(isFirstPlay && currTime >= 11){
  //   isFirstPlay = false;
  //   transitionFrames();
	// }
}

function videoEventsHandler(e){
  if(vidPlaying){
     pauseVid();
     vidPlaying = false;
  }
  if(!resolved){
    transitionFrames();
  }
  Enabler.exit('Background Exit');
}

function videoEndHandler(e) {
	//transitionFrames();
}

function playVid() {
  pauseBtn.style.visibility = 'visible';
  playBtn.style.visibility = 'hidden';
  vidPlayer.play();
  vidPlaying = true;
}

function pauseVid() {
  pauseBtn.style.visibility = 'hidden';
  playBtn.style.visibility = 'visible';
  vidPlayer.pause();
  vidPlaying = false;
}

function muteVid() {
  vidPlayer.volume = 0;
  muteBtn.style.visibility = 'hidden';
  unmuteBtn.style.visibility = 'visible';
}

function unmuteVid() {
  vidPlayer.volume = 1;
  muteBtn.style.visibility = 'visible';
  unmuteBtn.style.visibility = 'hidden';
}

function playCheck() {
  if (vidPlayer.paused) {
      // If paused
       // Show pause button and hide play button
      pauseBtn.style.visibility = 'visible';
      playBtn.style.visibility = 'hidden';
  } else {
      // If playing
      // Show play button and hide pause button
      pauseBtn.style.visibility = 'hidden';
      playBtn.style.visibility = 'visible';
  }
}

function audioCheck() {
  if (vidPlayer.volume == 1.0) {
      // If muted
      // Show mute button and hide unmute button
      muteBtn.style.visibility = 'visible';
      unmuteBtn.style.visibility = 'hidden';
  } else {
      // If unmuted
      // Show unmute button and hide mute button
      muteBtn.style.visibility = 'hidden';
      unmuteBtn.style.visibility = 'visible';
  }
}

function pausePlayHandler(e) {
   if (vidPlayer.paused) {
     playVid();
   } else {
     pauseVid();
   }
}

function muteUnmuteHandler(e) {
   if (vidPlayer.volume == 0.0) {
      //  // If muted, then turn it on
      //  vidPlayer.volume = 1.0;
      //  // Show mute button and hide unmute button
      //  muteBtn.style.visibility = 'visible';
      //  unmuteBtn.style.visibility = 'hidden';
      unmuteVid();
   } else {
      //  // If unmuted, then turn it off
      //  vidPlayer.volume = 0.0;
      //  // Show unmute button and hide mute button
      //  muteBtn.style.visibility = 'hidden';
      //  unmuteBtn.style.visibility = 'visible';
      muteVid();
   }
}

function seekBarHandler(event) {
  switch(event.type){
      case 'change':
        var time = vidPlayer.duration * (seekBar.value / 100);
        // Update the video time
        vidPlayer.currentTime = time;
        break;
      case 'mousedown':
        pauseVid();
        break;
      case 'mouseup':
        playVid();
  }
}

function clickSoundHandler(e) {
  Enabler.counter('Sound Button Clicked');
  clickSoundBtn.setAttribute('class','fadeIn quickFade');
	watchWithSound();

  setTimeout(function(){
    clickSoundBtn.style.display = 'none';
    clickSoundBtn.removeAttribute('class');
	},1500)
}

function transitionFrames(){
  vidPlayer.removeEventListener('click', videoEventsHandler, false);
  pauseVid();
  vidPlaying = false;
  isFirstPlay = false;
  hideInitial();

  setTimeout(function(){
    resolve();
	},500)
}

function replayHandler(e) {
  Enabler.counter('Replay Button Clicked');
  Enabler.counter('Keith Richards Trailer Replayed');
  startFrame.style.display = 'block';
  muteVid();
  hideResolve();

  setTimeout(function(){
    initialAnim();
	},600)
}

function watchWithSound(){
  userInteracted = true;
  isFirstPlay = false;
  vidControls.setAttribute('class','fadeIn');
  Enabler.loadModule(studio.module.ModuleId.VIDEO, function() {
    studio.video.Reporter.attach('Keith Richards Trailer', vidPlayer);
  });
  vidPlayer.addEventListener('click', videoEventsHandler, false);

  trailerMp4.src = Enabler.getUrl('trailer.mp4');
  vidPlayer.load();
  unmuteVid();
  playVid();
  // audioCheck();
}


// -----------------------------
// RESLOVE ANIMATIONS
// -----------------------------
function resolve(){
	console.log('resolve - endFrame');
	endFrame.style.display = 'block';
  resolved = true;

	setTimeout(function(){
		keyart.setAttribute('class','fadeIn');
		netflix.setAttribute('class','fadeIn');
		netflixDoc.setAttribute('class','fadeIn');

		keith_tt.setAttribute('class','slideIn');
		richards_tt.setAttribute('class','slideIn');
		under_tt.setAttribute('class','slideIn');
    film_by.setAttribute('class','slideIn');

    nowStreaming.setAttribute('class','slideIn');
	},100);

  setTimeout(function(){
    ctaBtn.setAttribute('class','slideIn');
    expandBtn.setAttribute('class','fadeIn');
    //replayBtn.setAttribute('class','fadeIn');
  },1550);

}

function hideResolve(){
  // FADE OUT END FRAME
  keyart.setAttribute('class','quickFade');
  netflix.setAttribute('class','quickFade');
  netflixDoc.setAttribute('class','quickFade');
  keith_tt.setAttribute('class','slideIn quickFade');
  richards_tt.setAttribute('class','slideIn quickFade');
  under_tt.setAttribute('class','slideIn quickFade');
  film_by.setAttribute('class','slideIn quickFade');

  nowStreaming.setAttribute('class','slideIn quickFade');
  ctaBtn.setAttribute('class','slideIn quickFade');
  expandBtn.setAttribute('class','slideIn quickFade');
  //replayBtn.setAttribute('class','quickFade');

  setTimeout(function(){
    resetResolve()
  },1000);
}

function resetResolve(){
	console.log('resolve - endFrame');
  endFrame.style.display = 'none';

	keyart.removeAttribute('class');
	netflix.removeAttribute('class');
	netflixDoc.removeAttribute('class');
	keith_tt.removeAttribute('class');
	richards_tt.removeAttribute('class');
	under_tt.removeAttribute('class');
  film_by.removeAttribute('class');
	nowStreaming.removeAttribute('class');

	//replayBtn.removeAttribute('class');
  expandBtn.removeAttribute('class');
	ctaBtn.removeAttribute('class');
}

function showExpanded() {
	expandedC.style.display = 'block';

	setTimeout(function(){
    keyart_ex.setAttribute('class','fadeIn');
  	netflix_ex.setAttribute('class','fadeIn');
  	netflixDoc_ex.setAttribute('class','fadeIn');
  	keith_ex.setAttribute('class','fadeIn');
  	richards_ex.setAttribute('class','fadeIn');
  	under_ex.setAttribute('class','fadeIn');

    vidPlayer.setAttribute('class','fadeIn');
    closeBtn.setAttribute('class','fadeIn');
	},100);

  // if(isFirstPlay){
  //   trailerMp4.src = Enabler.getUrl('preview.mp4');
  //   vidPlayer.load();
  //   pauseVid();
  //  }

	setTimeout(function(){
    nowStreaming_ex.setAttribute('class','fadeIn');
    ctaBtn_tab.setAttribute('class','fadeIn');
    vidControls.setAttribute('class','fadeIn');
    unmuteVid();
    vidPlayer.currentTime = 0;
    playVid();
	},1000);
}

function hideExpanded() {
  pauseVid();
  keyart_ex.setAttribute('class','fadeIn quickFade');
	netflix_ex.setAttribute('class','fadeIn quickFade');
	netflixDoc_ex.setAttribute('class','fadeIn quickFade');
	keith_ex.setAttribute('class','fadeIn quickFade');
	richards_ex.setAttribute('class','fadeIn quickFade');
	under_ex.setAttribute('class','fadeIn quickFade');
  nowStreaming_ex.setAttribute('class','fadeIn quickFade');
  ctaBtn_tab.setAttribute('class','fadeIn quickFade');
  vidPlayer.setAttribute('class','fadeIn quickFade');
  vidControls.setAttribute('class','fadeIn quickFade');
  closeBtn.setAttribute('class','fadeIn quickFade');

  setTimeout(function(){
    // startFrame.style.display = 'none';
  	// clickSoundBtn.style.display = 'none';
  },800);
}

function resetExpanded() {
  expandedC.style.display = 'none';

  keyart_ex.removeAttribute('class');
  netflix_ex.removeAttribute('class');
  netflixDoc_ex.removeAttribute('class');
  keith_ex.removeAttribute('class');
  richards_ex.removeAttribute('class');
  under_ex.removeAttribute('class');
  nowStreaming_ex.removeAttribute('class');
  vidPlayer.removeAttribute('class');
  closeBtn.removeAttribute('class');
  ctaBtn_tab.removeAttribute('class');
  vidControls.removeAttribute('class');
  replayOverlay.removeAttribute('class');
	replayBtn.removeAttribute('class');
  // expandBtn.removeAttribute('class');
	// ctaBtn.removeAttribute('class');
}

function videoShowOverlay() {
  replayOverlay.setAttribute('class','fadeIn');
  replayBtn.setAttribute('class','fadeIn');
  vidControls.removeAttribute('class');
}

function videoHideOverlay() {
  replayOverlay.removeAttribute('class');
  replayBtn.removeAttribute('class');
}
