<template>
<div id="car">
  <div class="current" v-if="name">{{ name }}</div>
</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from '@three-ts/orbit-controls';
import { MTLLoader, OBJLoader } from 'obj-mtl-loader-three';

const name = ref('');

onMounted(() => {
  const BufferGeometryLoader = new THREE.BufferGeometryLoader();
  const MaterialLoader = new THREE.MaterialLoader();
  console.log({ BufferGeometryLoader, MaterialLoader });
  const raycaster = new THREE.Raycaster();

  const mouse = new THREE.Vector2(-10000000, -1000000);
  let flag = false;
  /**
  * 创建场景对象Scene
  */
  const scene = new THREE.Scene();
  /**
  * OBJ和材质文件mtl加载
  */

  const mtlLoader = new MTLLoader();

  const objLoader = new OBJLoader();

  mtlLoader.load('./model/file.mtl', (materials) => {
    // 返回一个包含材质的对象MaterialCreator
    materials.preload();
    // obj的模型会和MaterialCreator包含的材质对应起来
    console.log({ materials });
    objLoader.setMaterials(materials);
    objLoader.load('./model/file.obj', (obj) => {
      console.log({ obj });
      obj.scale.set(100, 100, 100); // 放大obj组对象
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
  const s = 150; // 三维场景显示范围控制系数，系数越大，显示的范围越大
  // 创建相机对象
  const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
  camera.position.set(200, 200, 200); // 设置相机位置
  camera.lookAt(scene.position); // 设置相机方向(指向的场景对象)
  /**
    * 创建渲染器对象
    */
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height); // 设置渲染区域尺寸
  renderer.setClearColor(0xb9d3ff, 1); // 设置背景颜色
  const carElement = document.getElementById('car');
  if (carElement) carElement.appendChild(renderer.domElement); // 元素中插入canvas对象

  const onDocumentClick = (event) => {
    flag = true;
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  const onWindowResize = () => {
    camera.aspect = window.innerWidth / (window.innerHeight - 50);
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  document.addEventListener('click', onDocumentClick, false);

  window.addEventListener('resize', onWindowResize, false);

  console.log('scene.children:', scene, scene.children[2]);

  // 渲染函数
  const render = () => {
    if (scene.children[2]) {
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObject(scene.children[2], true);
      // console.log({ intersects })
      if (intersects[0] && flag) {
        console.log(intersects[0]);
        const x1 = intersects[0].object.geometry.boundingSphere.center.x;
        const y1 = intersects[0].object.geometry.boundingSphere.center.y;
        const z1 = intersects[0].object.geometry.boundingSphere.center.z;
        intersects[0].object.geometry.translate(x1, y1, z1);
        // intersects[ 0 ].object.geometry.scale(1.01, 1.01, 1.01)
        flag = false;
        name.value = intersects[0].object.name;
        // intersects[ 0 ].object.geometry.computeBoundingBox()
        // console.log('包围球属性', intersects[ 0 ].object.geometry);
      }
    }

    renderer.render(scene, camera); // 执行渲染操作
    requestAnimationFrame(render); // 请求再次执行渲染函数render，渲染下一帧
  };

  render();

  // 创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
  new OrbitControls(camera, renderer.domElement);
});

</script>

<style scoped>
#car {
  position: relative;
  height: calc(100vh - 50px);
}
.current {
  position: absolute;
  width: 100px;
  height: 40px;
  line-height: 40px;
  background: rgba(0, 0, 0, .6);
  color: #fff;
  top: 0;
  left: 0;
  z-index: 2;
}
</style>
