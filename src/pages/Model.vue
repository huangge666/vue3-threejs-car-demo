<template>
  <div id="BYD">
    <!-- <div v-if="percentage < 100" class="mask">
      <el-progress
        :text-inside="true"
        :stroke-width="24"
        :percentage="percentage"
        status="success"
      />
    </div> -->
    <div class="mark">
      <div class="des">
        <div class="title">前脸设计</div>
        <div class="text">前脸纺锤式的中网格栅设计</div>
        <div class="text">搭配两侧狭长犀利的大灯造型</div>
      </div>
    </div>
    <div class="mark">
      <div class="des">
        <div class="text">全新混动科技，FYRA四驱动力系统</div>
      </div>
    </div>
    <div v-show="isShow" id="car"></div>
    <div v-show="!isShow" id="photosphere"></div>
    <el-button @click="handleSwitch" class="switch">切换</el-button>
  </div>
</template>

<script setup>
import {
  onMounted, ref, onBeforeUnmount, watch,
} from 'vue';
import * as THREE from 'three';
import { Viewer } from 'photo-sphere-viewer';
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
// import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import CreatePointsTag from '../components/PointsTag.js';
import CircleLine from '../components/CircleLine.js';

const percentage = ref(100);
const isShow = ref(false);

watch(isShow, (newValue) => {
  const MARK = document.getElementsByClassName('mark');
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < MARK.length; i++) {
    MARK[i].style.visibility = newValue ? 'visible' : 'hidden';
  }
});

const handleSwitch = () => {
  isShow.value = !isShow.value;
};

onMounted(() => {
  const mouse = new THREE.Vector2(-10000000, -1000000);
  let flag = false;
  const raycaster = new THREE.Raycaster();

  let LFDoor = null;
  let LBDoor = null;
  /**
  * 创建场景对象Scene
  */
  const scene = new THREE.Scene();
  /**
  * 设置 360 全景图片
  */
  const material = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg'),
  });
  const size = 1000;
  const skyBox = new THREE.Mesh(new THREE.SphereBufferGeometry(size, size, size), material);
  skyBox.geometry.scale(-1, 1, 1); // 里外两侧的表面翻转
  scene.add(skyBox);

  /**
  * 开发辅助坐标
  */
  const axesHelper = new THREE.AxesHelper(250);
  scene.add(axesHelper);

  /**
  * gltf 模型加载
  */
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('./draco/');
  loader.setDRACOLoader(dracoLoader);

  loader.load(
    './gltf/2.gltf',
    (gltf) => {
      const model = new THREE.Group();
      model.add(CircleLine);
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

      // LFDoor.rotateY(-Math.sin(Math.PI / 2));
      // RFDoor.rotateY(Math.sin(Math.PI / 2));
      // LBDoor.rotateY(-Math.sin(Math.PI / 2));
      // RBDoor.rotateY(Math.sin(Math.PI / 2));

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

      const visibility = isShow.value ? 'visible' : 'hidden';
      const mark1 = document.getElementsByClassName('mark')[0];
      mark1.style.visibility = visibility;
      const label1 = new CSS3DObject(mark1);
      mark1.style.pointerEvents = 'none';
      label1.position.copy(LFSprite.position);
      label1.scale.set(0.5, 0.5, 1.0);
      label1.position.set(0, 0, 0);
      label1.position.x -= 220;
      label1.position.y += 50;
      label1.rotateY(-Math.PI / 2);
      model.add(label1);

      const mark2 = document.getElementsByClassName('mark')[1];
      mark2.style.visibility = visibility;
      const label2 = new CSS3DObject(mark2);
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
      scene.add(model);
    },
    (xhr) => {
      percentage.value = +((xhr.loaded / xhr.total) * 100).toFixed(0);
      // console.log(xhr);
    },
    (err) => {
      console.log({ err });
    },
  );

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
  const ambient = new THREE.AmbientLight(0xffffff, 2.9);
  scene.add(ambient);
  // 点光源
  const point = new THREE.PointLight(0xffffff);
  point.position.set(400, 200, 300);
  scene.add(point);
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
  });
  renderer.setSize(width, height);
  renderer.setClearColor(0x00ffff, 1);
  const carElement = document.getElementById('car');
  if (carElement) carElement.appendChild(renderer.domElement);

  const onDocumentClick = (event) => {
    flag = true;
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  const onWindowResize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / (window.innerHeight - 50);
    camera.updateProjectionMatrix();
  };

  document.addEventListener('click', onDocumentClick, false);
  window.addEventListener('resize', onWindowResize, false);

  const labelRenderer = new CSS3DRenderer();
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.domElement.style.position = 'absolute';
  labelRenderer.domElement.style.top = '0px';
  labelRenderer.domElement.style.left = '0px';
  labelRenderer.domElement.style.pointerEvents = 'none';
  document.body.appendChild(labelRenderer.domElement);

  // 渲染函数
  const render = () => {
    if (scene.children[6]) {
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObject(scene.children[6], true);
      if (intersects[0] && flag) {
        if (intersects[0].object.parent.name === '左前门' || intersects[0].object.name === 'LFSprite') {
          if (LFDoor.flag) {
            LFDoor.rotateY(Math.sin(Math.PI / 2));
            LFDoor.flag = false;
          } else {
            LFDoor.rotateY(-Math.sin(Math.PI / 2));
            LFDoor.flag = true;
          }
        }
        if (intersects[0].object.parent.name === '左后门' || intersects[0].object.name === 'LBSprite') {
          if (LBDoor.flag) {
            LBDoor.rotateY(Math.sin(Math.PI / 2));
            LBDoor.flag = false;
          } else {
            LBDoor.rotateY(-Math.sin(Math.PI / 2));
            LBDoor.flag = true;
          }
        }
        flag = false;
      }
    }
    scene.rotateY(0.0005);
    labelRenderer.render(scene, camera);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

  render();

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minZoom = 0.5;
  controls.maxZoom = 1;
  controls.maxPolarAngle = Math.PI / 2;
  controls.minPolarAngle = 0;

  /**
  * 汽车内饰全景图
  */
  const viewer = new Viewer({
    container: document.querySelector('#photosphere'),
    panorama: './panorama/car2.jpg',
    size: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    defaultLat: -Math.PI / 2,
    defaultLong: Math.PI,
    fisheye: 2,
    defaultZoomLvl: 0,
    navbar: false,
  });
  viewer.once('ready', () => {
    viewer.animate({
      longitude: 0,
      latitude: 0,
      zoom: 50,
      speed: '4rpm',
    });
  });
});

onBeforeUnmount(() => {
  const MARK = document.getElementsByClassName('mark');
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < MARK.length; i++) {
    MARK[i].style.visibility = 'hidden';
  }
});
</script>

<style scoped>
#car, #BYD {
  /* height: calc(100vh - 50px); */
  height: 100vh;
}

.mask{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
}
.el-progress{
  width: 50%;
  margin: 300px auto;
}

.mark {
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* CSS3设置HTML元素背面不可见 */
  backface-visibility: hidden;
  -webkit-backface-visibility:hidden;
  -moz-backface-visibility:hidden;
  -ms-backface-visibility:hidden;
  background-color:rgba(0, 0, 0, 0.5);
  visibility: hidden;
}

.des {
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  padding: 0px;
  background: linear-gradient(#00ffff, #00ffff) left top,
    linear-gradient(#00ffff, #00ffff) left top,
    linear-gradient(#00ffff, #00ffff) right bottom,
    linear-gradient(#00ffff, #00ffff) right bottom;
  background-repeat: no-repeat;
  background-size: 2px 20px, 36px 2px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 18px;
  padding: 8px 12px;
}

.title {
  padding: 10px 4px;
  font-size: 18px;
}

.text {
  padding: 10px 24px;
  font-size: 16px;
}

#photosphere {
  width: 100%;
  height: 100vh;
}

.switch {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  cursor: pointer;
}
</style>
