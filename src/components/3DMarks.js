import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

const label1Generator = () => {
  const mark1 = document.getElementsByClassName('mark')[0];
  const label1 = new CSS3DObject(mark1);
  mark1.style.visibility = 'visible';
  mark1.style.pointerEvents = 'none';
  label1.scale.set(0.5, 0.5, 1.0);
  label1.position.set(0, 0, 0);
  label1.position.x -= 240;
  label1.position.y += 50;
  label1.rotateY(-Math.PI / 2);
  return label1;
};

const label2Generator = () => {
  const mark2 = document.getElementsByClassName('mark')[1];
  const label2 = new CSS3DObject(mark2);
  mark2.style.visibility = 'visible';
  mark2.style.pointerEvents = 'none';
  label2.scale.set(0.5, 0.5, 1.0);
  label2.position.set(0, 0, 0);
  label2.position.z -= 120;
  label2.position.y += 50;
  label2.rotateY(Math.PI);
  return label2;
};

const labelRenderer = new CSS3DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.left = '0px';
labelRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(labelRenderer.domElement);

export {
  label1Generator,
  label2Generator,
  labelRenderer,
};
