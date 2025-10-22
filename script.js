const video = document.querySelector('video.flex');
const playButton = document.getElementById('toggle');
const rewindBtn = document.getElementById('rewind');
const forwardBtn = document.getElementById('forward');
const volumeSlider = document.getElementById('volume');
const speedSlider = document.getElementById('speed');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');

// Play/Pause toggle
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}
function updatePlayButton() {
  playButton.textContent = video.paused ? '►' : '❚ ❚';
}

// Volume and Speed
function handleVolume() {
  video.volume = volumeSlider.value;
}
function handleSpeed() {
  video.playbackRate = speedSlider.value;
}

// Progress bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.width = percent + '%';
}
function setProgress(e) {
  const newTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = newTime;
}

// Skipping
function rewind10() {
  video.currentTime = Math.max(0, video.currentTime - 10);
}
function forward25() {
  video.currentTime = Math.min(video.duration, video.currentTime + 25);
}

// Events
playButton.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
video.addEventListener('timeupdate', handleProgress);

volumeSlider.addEventListener('input', handleVolume);
speedSlider.addEventListener('input', handleSpeed);

rewindBtn.addEventListener('click', rewind10);
forwardBtn.addEventListener('click', forward25);

let mousedown = false;
progress.addEventListener('click', setProgress);
progress.addEventListener('mousemove', e => mousedown && setProgress(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// Initialize
video.volume = volumeSlider.value;
video.playbackRate = speedSlider.value;
updatePlayButton();
