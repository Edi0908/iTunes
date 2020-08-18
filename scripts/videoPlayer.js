import { addZero } from './supScript.js';

export const videoPlayerInit = () => {

  const videoPlayer = document.querySelector('.video-player'),
    videoButtonPlay = document.querySelector('.video-button__play'),
    videoButtonStop = document.querySelector('.video-button__stop'),
    videoTimePassed = document.querySelector('.video-time__passed'),
    videoProgress = document.querySelector('.video-progress'),
    videoTimeTotal = document.querySelector('.video-time__total'),
    volumeMute = document.querySelector('.volume-mute'),
    videoVolume = document.querySelector('.video-volume'),
    videoFullscreen = document.querySelector('.video-fullscreen');

  let prevVolume = 1;

  const toggleIcon = () => {
    if (videoPlayer.paused) {
      videoButtonPlay.classList.add('fa-play');
      videoButtonPlay.classList.remove('fa-pause');
    } else {
      videoButtonPlay.classList.add('fa-pause');
      videoButtonPlay.classList.remove('fa-play');
    }
  };

  const togglePlay = () => {
    if (videoPlayer.paused) {
      videoPlayer.play();
    } else {
      videoPlayer.pause();
    }
    // toggleIcon();
  };

  const stopPlay = () => {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;

  };

  videoPlayer.addEventListener('click', togglePlay);
  videoButtonPlay.addEventListener('click', togglePlay);

  videoPlayer.addEventListener('play', toggleIcon);
  videoPlayer.addEventListener('pause', toggleIcon);

  videoButtonStop.addEventListener('click', stopPlay);

  videoFullscreen.addEventListener('click', () => {
    videoPlayer.requestFullscreen();
  });

  videoVolume.addEventListener('input', () => {
    videoPlayer.volume = videoVolume.value / 100;
    prevVolume = videoPlayer.volume;
  });

  videoPlayer.volume = 0.5;
  videoVolume.value = videoPlayer.volume * 100;

  volumeMute.addEventListener('click', () => {
    if (videoPlayer.volume) {
      prevVolume = videoPlayer.volume;
      videoPlayer.volume = 0;
    } else {
      videoPlayer.volume = prevVolume;
    }
  });

  videoPlayer.addEventListener('timeupdate', () => {
    const currentTime = videoPlayer.currentTime;
    const duration = videoPlayer.duration;

    videoProgress.value = (currentTime / duration) * 100;

    let minutPassed = Math.floor(currentTime / 60);
    let secondsPassed = Math.floor(currentTime % 60);

    let minutTotal = Math.floor(duration / 60);
    let secondsTotal = Math.floor(duration % 60);

    // videoTimePassed.textContent = addZero(minutPassed) + ':' + addZero(secondsPassed);
    // videoTimeTotal.textContent = addZero(minutTotal) + ':' + addZero(secondsTotal);

    videoTimePassed.textContent = `${addZero(minutPassed)}:${addZero(secondsPassed)}`;
    videoTimeTotal.textContent = `${addZero(minutTotal)}:${addZero(secondsTotal)}`;
  });

  videoProgress.addEventListener('input', () => {
    const duration = videoPlayer.duration;
    const value = videoProgress.value;

    videoPlayer.currentTime = (value * duration) / 100;
  });

};