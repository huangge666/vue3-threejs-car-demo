import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { camera, renderer } from './SceneCamera.js';

const controls = new OrbitControls(camera, renderer.domElement);
controls.minZoom = 0.5;
controls.maxZoom = 1;
controls.maxPolarAngle = Math.PI / 2;
controls.minPolarAngle = 0;

export default controls;
