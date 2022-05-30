import { Tween, Easing } from 'es6-tween';
import * as THREE from 'three';
import { LFDoor, LBDoor, labelRenderer } from './Model.js';
import { scene, camera, renderer } from './SceneCamera.js';
import { mouse, flag } from './Mouse.js';

const raycaster = new THREE.Raycaster();
let tween = null;

const rotateY = (value) => {
  tween = new Tween(LFDoor.rotation)
    .to({ y: value }, 300)
    .easing(Easing.Back.InOut)
    .start();
};

// 渲染函数
const render = () => {
  if (scene.children[2]) {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(scene.children[2], true);
    if (intersects[0] && flag.value) {
      if (intersects[0].object.parent.name === '左前门' || intersects[0].object.name === 'LFSprite') {
        if (LFDoor.flag) {
          rotateY(0);
          LFDoor.flag = false;
        } else {
          rotateY(-Math.sin(Math.PI / 2));
          LFDoor.flag = true;
        }
      }
      if (intersects[0].object.parent.name === '左后门' || intersects[0].object.name === 'LBSprite') {
        if (LBDoor.flag) {
          LBDoor.rotateY(Math.sin(Math.PI / 2));
          LBDoor.flag = false;
        } else {
          LBDoor.rotateY(-Math.sin(Math.PI / 2));
          LBDoor.flag = true;
        }
      }
      flag.value = false;
    }
  }
  scene.rotateY(0.0005);
  if (tween) tween.update();
  labelRenderer.render(scene, camera);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

export default render;
