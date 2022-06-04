import * as THREE from 'three';

const createAudio = (src, volume = 1, loop = false) => {
  const listener = new THREE.AudioListener();
  const audio = new THREE.Audio(listener);
  const audioLoader = new THREE.AudioLoader();
  audioLoader.load(src, (buffer) => {
    audio.setBuffer(buffer);
    audio.setVolume(volume);
    audio.setLoop(loop);
  });
  return audio;
};

const openAudio = createAudio('./audio/open.wav');
const closeAudio = createAudio('./audio/close.wav');
const closeTrunkAudio = createAudio('./audio/close-trunk.wav');
const backgroundAudio = createAudio('./audio/BYD.mp3', 0.3, true);

const displayOpenAudio = () => {
  openAudio.play();
};
const displayCloseAudio = () => {
  closeAudio.play();
};
const displayCloseTrunkAudio = () => {
  closeTrunkAudio.play();
};
const displayBackgroundAudio = () => {
  backgroundAudio.play();
};
const pauseBackgroundAudio = () => {
  backgroundAudio.pause();
};

export {
  openAudio,
  closeAudio,
  backgroundAudio,
  displayOpenAudio,
  displayCloseAudio,
  displayCloseTrunkAudio,
  displayBackgroundAudio,
  pauseBackgroundAudio,
};
