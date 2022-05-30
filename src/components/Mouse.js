import * as THREE from 'three';
import { ref } from 'vue';

const mouse = new THREE.Vector2(-10000000, -1000000);
const flag = ref(false);
/**
  * 鼠标点击事件
  */
const onDocumentClick = (event) => {
  flag.value = true;
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
};
document.addEventListener('click', onDocumentClick, false);

export {
  mouse,
  flag,
};
