import * as THREE from 'three';

/**
  * 创建场景对象Scene
  */
const scene = new THREE.Scene();

/**
  * 相机设置
  */
const width = window.innerWidth;
const height = window.innerHeight;
const k = width / height;
const s = 200;
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 3000);
camera.position.set(292, 223, 185);
camera.lookAt(scene.position);

/**
  * 创建渲染器对象
  */
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setClearColor(0x00ffff, 1);

export {
  scene,
  camera,
  renderer,
};
