<template>
  <div id="display"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

onMounted(() => {
  /**
  * 创建场景对象Scene
  */
  const scene = new THREE.Scene();
  /**
  * OBJ和材质文件mtl加载
  */
  const loader = new GLTFLoader();

  loader.load(
    './model/file.gltf',
    (gltf) => {
      console.log({ gltf });
      scene.add(gltf.scene);

      // const box3 = new THREE.Box3();
      // box3.expandByObject(gltf.scene);// 计算模型gltf.scen包围盒
      // console.log('查看包围盒box3', box3);

      // const v3 = new THREE.Vector3();
      // // 获得包围盒长宽高尺寸，结果保存在参数三维向量对象v3中
      // box3.getSize(v3);
      // console.log('查看返回的包围盒尺寸', v3);

      const mesh = gltf.scene.getObjectByName('file002');
      // const mesh = gltf.scene.getObjectByName('手机');
      console.log('mesh:', mesh);
      mesh.scale.set(50, 50, 50);
      const texLoader = new THREE.TextureLoader();
      mesh.material = new THREE.MeshStandardMaterial({
        // color:0xffffff,
        metalness: 1.0, // Mesh表面金属度，默认值0.5
        roughness: 1.0, // Mesh表面粗糙度，默认值0.5
        map: texLoader.load('./model/basecolor.png'), // 颜色贴图
        // 金属度、粗糙度贴图表示的值会和金属度、粗糙度分别相乘
        roughnessMap: texLoader.load('./model/roughness.png'), // 粗糙度贴图
        metalnessMap: texLoader.load('./model/metallic.png'), // 金属度贴图
        normalMap: texLoader.load('./model/normal.png'), // 法线贴图
        // 相机镜头等位置需要设置半透明效果(设置alphaMap和transparent属性)
        alphaMap: texLoader.load('./model/opacity.png'), // alpha贴图
        transparent: true, // 使用alphaMap，注意开启透明计算
      });
      // 注意：纹理朝向texture.flipY设置
      mesh.material.map.flipY = false;
      mesh.material.normalMap.flipY = false;
      mesh.material.metalnessMap.flipY = false;
      mesh.material.roughnessMap.flipY = false;
      mesh.material.alphaMap.flipY = false;
    },
  );

  // const mtlLoader = new MTLLoader();

  // const objLoader = new OBJLoader();

  // mtlLoader.load('./model/file.mtl', (materials) => {
  //   // 返回一个包含材质的对象MaterialCreator
  //   materials.preload();
  //   // obj的模型会和MaterialCreator包含的材质对应起来
  //   console.log({ materials });
  //   objLoader.setMaterials(materials);
  //   objLoader.load('./model/file.obj', (obj) => {
  //     console.log({ obj });
  //     obj.scale.set(100, 100, 100); // 放大obj组对象
  //     scene.add(obj);// 返回的组对象插入场景中
  //   });
  // });

  /**
    * 光源设置
    */
  // 平行光1
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(400, 200, 300);
  scene.add(directionalLight);
  // 平行光2
  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight2.position.set(-400, -200, -300);
  scene.add(directionalLight2);
  // 环境光
  // const ambient = new THREE.AmbientLight(0xffffff, 2.9);
  // scene.add(ambient);
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
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(width, height); // 设置渲染区域尺寸
  renderer.setClearColor(0xb9d3ff, 1); // 设置背景颜色
  const storeElement = document.getElementById('display');
  if (storeElement) storeElement.appendChild(renderer.domElement);

  const onWindowResize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / (window.innerHeight - 50);
    camera.updateProjectionMatrix();
  };

  window.addEventListener('resize', onWindowResize, false);
  console.log({ scene });
  // 渲染函数
  const render = () => {
    renderer.render(scene, camera); // 执行渲染操作
    requestAnimationFrame(render); // 请求再次执行渲染函数render，渲染下一帧
  };

  render();

  // eslint-disable-next-line no-new
  new OrbitControls(camera, renderer.domElement);
});
</script>

<style scoped>
#display {
  height: calc(100vh - 50px);
}
</style>
