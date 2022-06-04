import { labelRenderer } from './3DMarks';
import { scene, camera, renderer } from './SceneCamera.js';
import { tween } from './OpenClose.js';

// 渲染函数
const render = () => {
  scene.rotateY(0.0005);
  if (tween) tween.update();
  labelRenderer.render(scene, camera);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

export default render;
