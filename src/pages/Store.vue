<template>
<div id="store">

</div>
</template>

<script setup>
import { onMounted } from 'vue';
import * as THREE from 'three';
import { MTLLoader, OBJLoader } from 'obj-mtl-loader-three';

onMounted(() => {
  /**
  * 创建场景对象Scene
  */
  const scene = new THREE.Scene();
  /**
  * OBJ和材质文件mtl加载
  */

  const mtlLoader = new MTLLoader();

  const objLoader = new OBJLoader();

  mtlLoader.load('./bridge/file.mtl', (materials) => {
    // 返回一个包含材质的对象MaterialCreator
    materials.preload();
    // obj的模型会和MaterialCreator包含的材质对应起来
    console.log({ materials });
    objLoader.setMaterials(materials);
    objLoader.load('./bridge/file.obj', (obj) => {
      console.log({ obj });
      // obj.scale.set(10, 10, 10) //放大obj组对象
      scene.add(obj);// 返回的组对象插入场景中
    });
  });

  /**
    * 光源设置
    */
  // 点光源
  const point = new THREE.PointLight(0xffffff);
  point.position.set(400, 200, 300); // 点光源位置
  scene.add(point); // 点光源添加到场景中
  // 环境光
  const ambient = new THREE.AmbientLight(0x444444);
  scene.add(ambient);
  /**
    * 相机设置
    */
  const width = window.innerWidth; // 窗口宽度
  const height = window.innerHeight - 50; // 窗口高度
  const k = width / height; // 窗口宽高比
  const s = 200; // 三维场景显示范围控制系数，系数越大，显示的范围越大
  // 创建相机对象
  const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
  camera.position.set(100, 100, 100); // 设置相机位置
  camera.lookAt(scene.position); // 设置相机方向(指向的场景对象)
  /**
    * 创建渲染器对象
    */
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height); // 设置渲染区域尺寸
  renderer.setClearColor(0xb9d3ff, 1); // 设置背景颜色
  const storeElement = document.getElementById('store');
  if (storeElement) storeElement.appendChild(renderer.domElement);

  const onWindowResize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / (window.innerHeight - 50);
    camera.updateProjectionMatrix();
  };

  window.addEventListener('resize', onWindowResize, false);

  console.log('scene.children:', scene, scene.children[2]);

  const keyboardControls = (function () {
    const keys = {
      SP: 32, W: 87, A: 65, S: 83, D: 68, UP: 38, LT: 37, DN: 40, RT: 39,
    };

    const keysPressed = {};

    (function (watchedKeyCodes) {
      const handler = function (down) {
        return function (e) {
          // console.log(e.keyCode)
          const index = watchedKeyCodes.indexOf(e.keyCode);
          if (index >= 0) {
            keysPressed[watchedKeyCodes[index]] = down;
            e.preventDefault();
          }
        };
      };
      window.addEventListener('keydown', handler(true), false);
      window.addEventListener('keyup', handler(false), false);
    }([
      keys.SP, keys.W, keys.A, keys.S, keys.D, keys.UP, keys.LT, keys.DN, keys.RT,
    ]));

    const forward = new THREE.Vector3();
    const sideways = new THREE.Vector3();
    let i = 0; let
      j = 0;
    return function () {
      // 观看
      if (keysPressed[keys.UP]) {
        i += 1;
        camera.lookAt(new THREE.Vector3(0, 30 + i, j));
      }
      if (keysPressed[keys.DN]) {
        i -= 1;
        camera.lookAt(new THREE.Vector3(0, 30 + i, j));
      }
      if (keysPressed[keys.LT]) {
        j += 10;
        camera.lookAt(new THREE.Vector3(0, 30 + i, j));
      }
      if (keysPressed[keys.RT]) {
        j -= 10;
        camera.lookAt(new THREE.Vector3(0, 30 + i, j));
      }

      // 移动
      if (keysPressed[keys.D]) {
        camera.translateX(10);
      }
      if (keysPressed[keys.A]) {
        camera.translateX(-10);
      }

      if (keysPressed[keys.W]) {
        camera.translateZ(-1);
      }
      if (keysPressed[keys.S]) {
        camera.translateZ(1);
      }
    };
  }());

  // 渲染函数
  const render = () => {
    keyboardControls();
    renderer.render(scene, camera); // 执行渲染操作
    requestAnimationFrame(render); // 请求再次执行渲染函数render，渲染下一帧
  };

  render();
});
</script>

<style scoped>
#store {
  height: calc(100vh - 50px);
}
</style>
