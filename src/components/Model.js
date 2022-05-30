import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import CreatePointsTag from './PointsTag.js';
import CylinderPlatform from './CylinderPlatform.js';
import SetCarMaterial from './SetCarMaterial.js';
// import { lensflare1, lensflare2 } from './CarLight.js';

/**
* gltf 模型加载
*/
const model = new THREE.Group();
const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('./draco/');
loader.setDRACOLoader(dracoLoader);
// eslint-disable-next-line import/no-mutable-exports
let LFDoor = null;
// eslint-disable-next-line import/no-mutable-exports
let LBDoor = null;

loader.load(
  './gltf/2.gltf',
  (gltf) => {
    SetCarMaterial(gltf.scene);
    model.add(CylinderPlatform);

    // const light1 = gltf.scene.getObjectByName('前灯罩02');
    // const light2 = gltf.scene.getObjectByName('前灯泡');
    // light1.add(lensflare1);
    // light2.add(lensflare2);

    const LFDoorGroup = new THREE.Group();
    LFDoorGroup.name = 'LFDoorGroup';
    const LBDoorGroup = new THREE.Group();
    LBDoorGroup.name = 'LBDoorGroup';
    LFDoor = gltf.scene.getObjectByName('左前门');
    // const RFDoor = gltf.scene.getObjectByName('右车门');
    LBDoor = gltf.scene.getObjectByName('左后门');
    // const RBDoor = gltf.scene.getObjectByName('右后门');

    const LFSprite = CreatePointsTag(LFDoor);
    LFSprite.name = 'LFSprite';
    LFSprite.position.x += 340;
    LFSprite.position.y += -70;
    LFSprite.position.z += -80;
    LFDoorGroup.add(LFSprite);

    const LBSprite = CreatePointsTag(LBDoor);
    LBSprite.name = 'LBSprite';
    LBSprite.position.x += 200;
    LBSprite.position.y += -100;
    LBSprite.position.z += -70;
    LBDoorGroup.add(LBSprite);

    let s = 0.0;
    function waveAnimation() {
      s += 0.01;
      if (s < 0.5) {
        LFSprite.scale.x = 30 * (1 + s);
        LFSprite.scale.y = 30 * (1 + s);
        LBSprite.scale.x = 30 * (1 + s);
        LBSprite.scale.y = 30 * (1 + s);
      } else if (s >= 0.5 && s < 1.0) {
        LFSprite.scale.x = 30 * (2 - s);
        LFSprite.scale.y = 30 * (2 - s);
        LBSprite.scale.x = 30 * (2 - s);
        LBSprite.scale.y = 30 * (2 - s);
      } else {
        s = 0.0;
      }

      requestAnimationFrame(waveAnimation);
    }
    waveAnimation();

    const mark1 = document.getElementsByClassName('mark')[0];
    const label1 = new CSS3DObject(mark1);
    mark1.style.visibility = 'visible';
    mark1.style.pointerEvents = 'none';
    label1.position.copy(LFSprite.position);
    label1.scale.set(0.5, 0.5, 1.0);
    label1.position.set(0, 0, 0);
    label1.position.x -= 220;
    label1.position.y += 50;
    label1.rotateY(-Math.PI / 2);
    model.add(label1);

    const mark2 = document.getElementsByClassName('mark')[1];
    const label2 = new CSS3DObject(mark2);
    mark2.style.visibility = 'visible';
    mark2.style.pointerEvents = 'none';
    label2.position.copy(LFSprite.position);
    label2.scale.set(0.5, 0.5, 1.0);
    label2.position.set(0, 0, 0);
    label2.position.z -= 120;
    label2.position.y += 50;
    label2.rotateY(Math.PI);
    model.add(label2);

    LFDoor.add(LFDoorGroup);
    LBDoor.add(LBDoorGroup);

    model.add(gltf.scene);
    console.log(gltf.scene);
  },
  // eslint-disable-next-line no-unused-vars
  (xhr) => {
    // percentage.value = +((xhr.loaded / xhr.total) * 100).toFixed(0);
    // console.log(xhr);
  },
  (err) => {
    console.log({ err });
  },
);

const labelRenderer = new CSS3DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.left = '0px';
labelRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(labelRenderer.domElement);

export {
  model,
  LFDoor,
  LBDoor,
  labelRenderer,
};
