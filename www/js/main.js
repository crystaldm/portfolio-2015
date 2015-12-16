var projectThumb;
var closeBtn;
var downloadBtn;
var lightbox;
var headerC;
var thumbnailC;
var footer;
var iFrameSrc;

var iFrame01;
var iFrame02;
var iFrame03;
var iFrame04;
var iFrame05;
var iFrame06;
var iFrame07;
var iFrame08;
var iFrame09;

function init() {
  projectThumb        = document.getElementsByClassName('thumbnail');
  iFrameSrc           = document.getElementsByClassName('iframe-src');
  closeBtn            = document.getElementById('close');
  downloadBtn         = document.getElementById('download-btn');
  lightbox            = document.getElementById('lightbox');
  headerC             = document.getElementById('header');
  thumbnailC          = document.getElementById('thumbnail-c');
  footer              = document.getElementById('footer');

  iFrame01            = document.getElementById('iframe-01');
  iFrame02            = document.getElementById('iframe-02');
  iFrame03            = document.getElementById('iframe-03');
  iFrame04            = document.getElementById('iframe-04');
  iFrame05            = document.getElementById('iframe-05');
  iFrame06            = document.getElementById('iframe-06');
  iFrame07            = document.getElementById('iframe-07');
  iFrame08            = document.getElementById('iframe-08');
  iFrame09            = document.getElementById('iframe-09');

  addListeners();
}

function addListeners() {
  closeBtn.addEventListener("click", closeLightbox, false);
  lightbox.addEventListener("click", closeLightbox, false);

  downloadBtn.addEventListener("click", downloadFile, false);

  for(var i=0; i < projectThumb.length; i++) {
    projectThumb[i].addEventListener("click", lightboxHandler, false);
  }
}

function lightboxHandler(event) {
  dataThumb = event.target.parentNode.getAttribute('data-thumb');
  dataProject = event.target.parentNode.getAttribute('data-project');
  var projName = "project-item-" + dataThumb;
  var projTarget = document.getElementById(projName);

  //lightbox fadein
  lightbox.className = '';
  projTarget.className = 'fadein';

  //background blur on lightbox
  headerC.className = 'blur-out';
  thumbnailC.className = 'blur-out';
  footer.className = 'blur-out';

  console.log(dataThumb);
 }

function closeLightbox() {
  var projName = "project-item-" + dataThumb;
  var projTarget = document.getElementById(projName);

  //lightbox fadein
  lightbox.className = 'hidden';
  projTarget.className = '';

  //background blur on lightbox
  headerC.className = '';
  thumbnailC.className = '';
  footer.className = '';

  for(var x=0; x < iFrameSrc.length; x++) {
    iFrameSrc[x].src = '';
  }

  setTimeout(function() {
    //load back sources in iFrames
    iFrame01.src = 'media/dinotrux/728x90_728x270-expandable/index.html';
    iFrame02.src = 'media/childhoods-end/CHOOD_HTML5_Progressive_970x250/index.html';
    iFrame03.src = 'media/croods/CROODS_Progressive_728x90/index.html';
    iFrame04.src = 'media/rogue-nation/300x250-progressive-post/index.html';
    iFrame05.src = 'media/rogue-nation/300x250-progressive-pre/index.html';
    iFrame06.src = 'media/rogue-nation/expandable/index.html';
    iFrame07.src = 'media/terminator/300x250-progressive-post/index.html';
    iFrame08.src = 'media/terminator/300x250-progressive-pre/index.html';
    iFrame09.src = 'https://www.youtube.com/embed/qhqCswZgLbA?rel=0';
  }, 1000)
}

function downloadFile() {
  window.open('moreno-crystal-resume-2015.pdf', '_blank');
}

init();
