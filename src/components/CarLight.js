import * as THREE from 'three';
import {
  Lensflare,
  LensflareElement,
} from 'three/examples/jsm/objects/Lensflare.js';

const texLoader = new THREE.TextureLoader();
const texture = texLoader.load('./imgs/lensflare.jpg');

const lensflareElement = new LensflareElement(texture, 600, 0, new THREE.Color(0xffffff));

const lensflare1 = new Lensflare();
lensflare1.addElement(lensflareElement);
const lensflare2 = new Lensflare();
lensflare2.addElement(lensflareElement);

// lensflare1.visible = true;
// lensflare2.visible = true;

// 打开车灯
const openCarLight = () => {
  lensflare1.visible = true;
  lensflare2.visible = true;
};

// 熄灭车灯
const closeCarLight = () => {
  lensflare1.visible = false;
  lensflare2.visible = false;
};

export {
  lensflare1,
  lensflare2,
  openCarLight,
  closeCarLight,
};
