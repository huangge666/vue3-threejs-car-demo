import * as THREE from 'three';

const listener = new THREE.AudioListener();
const openAudio = new THREE.Audio(listener);
const closeAudio = new THREE.Audio(listener);

const audioLoader = new THREE.AudioLoader();
audioLoader.load('./audio/open.wav', (buffer) => {
  openAudio.setBuffer(buffer);
  openAudio.setVolume(1);
});

audioLoader.load('./audio/close.wav', (buffer) => {
  closeAudio.setBuffer(buffer);
  closeAudio.setVolume(1);
});

const displayOpenAudio = () => {
  openAudio.play();
};
const displayCloseAudio = () => {
  closeAudio.play();
};

export {
  openAudio,
  closeAudio,
  displayOpenAudio,
  displayCloseAudio,
};
