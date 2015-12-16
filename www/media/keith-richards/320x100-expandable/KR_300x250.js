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
  Enabler.setExpandingPixelOffsets(260, 0, 560, 300, false, false);
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
	extCSS.setAttribute("href", Enabler.getUrl("stylesheets/screen.css"));
	document.getElementsByTagName("head")[0].appendChild(extCSS);

  // Load in additional assets or add animation/video
  init();
}

var startImgC;
var endImgC;
var expandedImgC;
var container;
var bgExit;

// var startFrame;
// var topTab;
// var netflix_tab;
// var netflixDoc_tab;
// var keith_tab;
// var richards_tab;
// var under_tab;

var vidPlayer;
var trailerMp4;
var vidControls;
var playBtn;
var pauseBtn;
var muteBtn;
var unmuteBtn;
var seekBar;
// var clickSoundBtn;

var endFrame;
var keyart;
var netflix;
var netflixDoc;
var keith_tt;
var richards_tt;
var under_tt;
var film_tt;
var expand_bg;
var nowStreaming;

//var replayBtn;
var ctayBtn;
var ctaBG;

var expand_btn;
var close_btn;
var expandingC;
var collapsedC;
var expandedC;
var expandedState;

var isFirstPlay = true;
var vidPlaying = false;
var resolved = false;
var userInteracted = true;
var isExpanded = false;
// var userInteracted = false;

//Function to run with any animations starting on load, or bringing in images etc
init = function(){
	console.log('init called');
  startImgC = document.getElementById('start-image-c');
  endImgC = document.getElementById('end-image-c');
  expandedImgC = document.getElementById('expanded-img-c');
  addImages();
	//Assign All the elements to the element on the page
	container = document.getElementById('container');
	bgExit = document.getElementById('bg-exit');

	// START FRAME
	// startFrame = document.getElementById('startFrame');
	// topTab = document.getElementById('topTab');
	// netflix_tab = document.getElementById('netflix_tab');
	// netflixDoc_tab = document.getElementById('netflixDoc_tab');
	// keith_tab = document.getElementById('keith_tab');
	// richards_tab = document.getElementById('richards_tab');
	// under_tab = document.getElementById('under_tab');
	nowStreaming = document.getElementById('nowStreaming');
  //
	vidPlayer = document.getElementById('vidPlayer');
  trailerMp4 = document.getElementById('trailer_mp4');
  vidControls = document.getElementById('vidControls');
  playBtn = document.getElementById('playBtn');
  pauseBtn = document.getElementById('pauseBtn');
  muteBtn = document.getElementById('muteBtn');
  unmuteBtn = document.getElementById('unmuteBtn');
  seekBar = document.getElementById('seekBar');
	// clickSoundBtn = document.getElementById('clickSoundBtn');

	// END FRAME
	endFrame = document.getElementById('endFrame');
	keyart = document.getElementById('keyart');
	netflix = document.getElementById('netflix');
	netflixDoc = document.getElementById('netflixDoc');
	keith_tt = document.getElementById('keith_tt');
	richards_tt = document.getElementById('richards_tt');
	under_tt = document.getElementById('under_tt');
  film_tt = document.getElementById('film_tt');

	replayBtn = document.getElementById('replayBtn');
	ctaBtn = document.getElementById('ctaBtn');
  ctaBG = document.getElementById('ctaBG');
  expand_btn = document.getElementById('expand_btn');
  close_btn = document.getElementById('close_btn');
  expand_bg = document.getElementById('expand_bg');

  expandingC = document.getElementById('expanding-c');
  collapsedC = document.getElementById('collapsed-c');
  expandedC = document.getElementById('expanded-c');


	//Bring in listeners
	addListeners();

	//Show Ad
	container.style.display = "block";
  setTimeout(function(){
    // initialAnim();
    resolve();
    //transitionFrames();
  },500);
	//resolve();
}

function addImage(c, url, id, eClass) {
  var elem = document.createElement("img");
  elem.setAttribute("src", url);
  elem.setAttribute("id", id);
  elem.setAttribute("class", eClass);
  c.appendChild(elem);
}

function addImages() {
  // addImage(startImgC, 'topTab.jpg', 'topTab');
  // addImage(startImgC, 'netflix_tab.png', 'netflix_tab');
  // addImage(startImgC, 'netflixDoc_tab.png', 'netflixDoc_tab');
  // addImage(startImgC, 'keith_tab.png', 'keith_tab', 'scale75');
  // addImage(startImgC, 'richards_tab.png', 'richards_tab', 'scale75');
  // addImage(startImgC, 'under_tab.png', 'under_tab', 'scale75');

  addImage(endImgC, 'keyart.jpg', 'keyart');
  addImage(endImgC, 'netflix.png', 'netflix');
  addImage(endImgC, 'netflixDoc.png', 'netflixDoc');
  addImage(endImgC, 'keith_tt.png', 'keith_tt');
  addImage(endImgC, 'richards_tt.png', 'richards_tt');
  addImage(endImgC, 'under_tt.png', 'under_tt');
  addImage(endImgC, 'film_tt.png', 'film_tt');
  addImage(endImgC, 'nowStreaming.png', 'nowStreaming');
  addImage(endImgC, 'expand.png', 'expand_btn');
  //addImage(endImgC, 'replayBtn.png', 'replayBtn');

  addImage(expandedImgC, 'expand-bg.jpg', 'expand_bg');
  addImage(expandedImgC, 'close.png', 'close_btn');
}

// -----------------------------
//EVENT LISTENERS
// -----------------------------
addListeners = function() {
  console.log('listeners added');
	bgExit.addEventListener('click', bgExitHandler, false);

  vidPlayer.addEventListener('ended', videoEndHandler, false);
  vidPlayer.addEventListener('timeupdate', timeUpdater, false);

  playBtn.addEventListener('click', pausePlayHandler, false);
  pauseBtn.addEventListener('click', pausePlayHandler, false);
  muteBtn.addEventListener('click', muteUnmuteHandler, false);
  unmuteBtn.addEventListener('click', muteUnmuteHandler, false);
  seekBar.addEventListener('change', seekBarHandler, false);
  seekBar.addEventListener('mouseup', seekBarHandler, false);
  seekBar.addEventListener('mousedown', seekBarHandler, false);

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

  expand_btn.addEventListener('click', expandToggle, false);
  close_btn.addEventListener('click', collapseToggle, false);
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
  // topTab.setAttribute('class','fadeIn quickFade');
	// netflix_tab.setAttribute('class','fadeIn quickFade');
	// netflixDoc_tab.setAttribute('class','fadeIn quickFade');
	// keith_tab.setAttribute('class','scale75 fadeIn quickFade');
	// richards_tab.setAttribute('class','scale75 fadeIn quickFade');
	// under_tab.setAttribute('class','scale75 fadeIn quickFade');
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
	if(vidPlaying){
	   //vidPlayer.pause();
     pauseVid();
		 vidPlaying = false;
	}
  if(!resolved){
    transitionFrames();
  }
	Enabler.exit('Background Exit');
}

function ctaHandler(e) {
	switch(event.type){
		case 'mouseover':
      ctaBG.setAttribute('class','slideOut');
			break;
		case 'mouseout':
      ctaBG.removeAttribute('class');
			break;
		case 'click':
      Enabler.exit('Watch Now Exit');
	}
}


// -----------------------------
// VIDEO FUNCTIONS
// -----------------------------
function startVid() {
	console.log('video started');

  if(isFirstPlay) {
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

function videoEndHandler(e) {
  collapseToggle();
}

function timeUpdater(event){
	currTime = vidPlayer.currentTime;

  // Calculate the slider value
  var value = (100 / vidPlayer.duration) * currTime;

  // Update the slider value
  seekBar.value = value;

// 	if(isFirstPlay && currTime >= 11){
//     isFirstPlay = false;
//     transitionFrames();
// 	}
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


// function watchWithSound(){
//   userInteracted = true;
//   vidControls.setAttribute('class','fadeIn');
//   Enabler.loadModule(studio.module.ModuleId.VIDEO, function() {
//     studio.video.Reporter.attach('Keith Richards Trailer', vidPlayer);
//   });
//   vidPlayer.addEventListener('click', videoEventsHandler, false);
//
//   trailerMp4.src = Enabler.getUrl('trailer.mp4');
//   vidPlayer.load();
//   vidPlayer.volume = 1.0;
//   playVid();
// }



// -----------------------------
// RESLOVE ANIMATIONS
// -----------------------------
function resolve(){
	console.log('resolve - endFrame');
	endFrame.style.display = 'block';
  // resolved = true;

	setTimeout(function(){
		keyart.setAttribute('class','fadeIn');
		netflix.setAttribute('class','fadeIn');
		netflixDoc.setAttribute('class','fadeIn');

		keith_tt.setAttribute('class','slideIn');
		richards_tt.setAttribute('class','slideIn');
    under_tt.setAttribute('class','slideIn');
		film_tt.setAttribute('class','slideIn');
    expand_btn.setAttribute('class','fadeIn');

    nowStreaming.setAttribute('class','slideIn');
	},100)

  setTimeout(function(){
    ctaBtn.setAttribute('class','slideIn');
    //replayBtn.setAttribute('class','fadeIn');
  },1650)

}

function hideResolve(){
  // FADE OUT END FRAME
  keyart.setAttribute('class','quickFade');
  netflix.setAttribute('class','quickFade');
  netflixDoc.setAttribute('class','quickFade');
  keith_tt.setAttribute('class','slideIn quickFade');
  richards_tt.setAttribute('class','slideIn quickFade');
  under_tt.setAttribute('class','slideIn quickFade');
  film_tt.setAttribute('class','slideIn quickFade');
  expand_btn.setAttribute('class','slideIn quickFade');
  nowStreaming.setAttribute('class','slideIn quickFade');
  ctaBtn.setAttribute('class','slideIn quickFade');
  //replayBtn.setAttribute('class','quickFade');

  setTimeout(function(){
    resetResolve()
  },1000)
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
	film_tt.removeAttribute('class');
  expand_btn.removeAttribute('class');
	nowStreaming.removeAttribute('class');

	//replayBtn.removeAttribute('class');
	ctaBtn.removeAttribute('class');
}

function showExpanded() {
  console.log('we made it!!!!');
  close_btn.setAttribute('class','fadeIn');
  expand_bg.setAttribute('class','fadeIn');
  vidPlayer.setAttribute('class', 'fadeIn');
  vidControls.setAttribute('class','fadeIn');

  setTimeout(function(){
    // trailerMp4.src = Enabler.getUrl('trailer.mp4');
    vidPlayer.load();
    vidPlayer.currentTime = 0;
    vidPlayer.volume = 1.0;
    playVid();
	},1000);
}

function hideExpanded() {
  close_btn.setAttribute('class','quickFade');
  vidPlayer.setAttribute('class', 'quickFade');
  vidControls.setAttribute('class','quickFade');

  vidPlayer.volume = 0;
  pauseVid();
}

function resetExpanded() {
  close_btn.removeAttribute('class');
  expand_bg.removeAttribute('class');
}

// function expandCollapseToggle() {
//   isExpanded ? Enabler.requestCollapse() : Enabler.requestExpand();
// }

function expandCollapseAnimationEnd(e) {
  // if(e.target.id == 'expanding-c') {
  //   expandingC.className == 'expanded' ? Enabler.finishExpand() : Enabler.finishCollapse();
  //   //expandingC.className == 'expanded' ? expandFinishHandler() : collapseFinishHandler();
  // }
}

function expandToggle()
{
  Enabler.requestExpand();
  expandingC.className = 'expanded';
}

function collapseToggle()
{
  Enabler.requestCollapse();
  expandingC.className = 'collapsed';
}

function expandStartHandler() {
  vidPlayer.currentTime = 0;
  hideResolve();
  console.log('>>> Expand Started <<<');
   Enabler.finishExpand();
}

function expandFinishHandler() {
  collapsedC.style.display = 'none';
  isExpanded = true;
  resetResolve();
  showExpanded();
  console.log('>>> Expand Finished <<<');
}

function collapseStartHandler() {
  collapsedC.style.display = 'block';
  hideExpanded();

  Enabler.reportManualClose();
  console.log('Close Ad');
  console.log('>>> Collapse Started <<<');
  Enabler.finishCollapse();
}

function collapseFinishHandler() {
  isExpanded = false;
  resolve();
  resetExpanded();
  console.log('>>> Collapse Finished <<<');
}

function videoShowOverlay() {
  replayOverlay.setAttribute('class','fadeIn');
  //replayBtn.setAttribute('class','fadeIn');
  vidControls.removeAttribute('class');
}

function videoHideOverlay() {
  replayOverlay.removeAttribute('class');
  //replayBtn.removeAttribute('class');
}
