import { Tween, Easing } from 'es6-tween';
import * as THREE from 'three';
import { scene, camera } from './SceneCamera.js';
import { displayOpenAudio, displayCloseAudio, displayCloseTrunkAudio } from './Audio.js';

// eslint-disable-next-line import/no-mutable-exports
let tween = null;
let last = 0;

const animateWithTween = (model, target, time = 1000) => {
  tween = new Tween(model.rotation)
    .to(target, time)
    .easing(Easing.Linear)
    .start();
};

const openCloseDoor = (obj, origin = { y: 0 }, target = { y: Math.PI / 3 }) => {
  // 简单节个流
  const now = Date.now();
  if (now - last < 1000) return;
  last = now;
  if (obj.flag) {
    animateWithTween(obj, origin);
    obj.flag = false;
    let timer = setTimeout(() => {
      displayCloseAudio();
      clearTimeout(timer);
      timer = null;
    }, 1050);
  } else {
    animateWithTween(obj, target);
    obj.flag = true;
    displayOpenAudio();
  }
};

const openCloseTrunkDoor = (obj, origin = { y: 0 }, target = { y: Math.PI / 3 }) => {
  // 简单节个流
  const now = Date.now();
  if (now - last < 1000) return;
  last = now;
  if (obj.flag) {
    animateWithTween(obj, origin, 1000);
    obj.flag = false;
    displayCloseTrunkAudio();
  } else {
    animateWithTween(obj, target, 1000);
    obj.flag = true;
    displayOpenAudio();
  }
};

const openClose = (obj) => {
  const LFDoor = obj.getObjectByName('左前门');
  const RFDoor = obj.getObjectByName('右车门');
  const LBDoor = obj.getObjectByName('左后门');
  const RBDoor = obj.getObjectByName('右后门');
  const TrunkDoor = obj.getObjectByName('后备箱');
  const mouse = new THREE.Vector2(0, 0);
  const raycaster = new THREE.Raycaster();
  let flag = false;

  const onDocumentClick = (event) => {
    flag = true;
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    if (scene.children[2]) {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(scene.children[2], true);
      if (intersects[0] && flag) {
        if (intersects[0].object.parent.name === '左前门' || intersects[0].object.name === 'LFSprite') {
          openCloseDoor(LFDoor, { y: 0 }, { y: -Math.PI / 3 });
        }
        if (intersects[0].object.parent.name === '右车门' || intersects[0].object.name === 'RFSprite') {
          openCloseDoor(RFDoor);
        }
        if (intersects[0].object.parent.name === '左后门' || intersects[0].object.name === 'LBSprite') {
          openCloseDoor(LBDoor, { y: 0 }, { y: -Math.PI / 3 });
        }
        if (intersects[0].object.parent.name === '右后门' || intersects[0].object.name === 'RBSprite') {
          openCloseDoor(RBDoor);
        }
        if (intersects[0].object.parent.name === '后备箱' || intersects[0].object.name === 'TrunkSprite') {
          openCloseTrunkDoor(TrunkDoor, { z: 0 }, { z: Math.PI / 2 });
        }
      }
    }
  };
  document.addEventListener('click', onDocumentClick, false);
};

export {
  tween,
  animateWithTween,
  openClose,
};
