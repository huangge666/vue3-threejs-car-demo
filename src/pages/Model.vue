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
    <div id="car"></div>
    <div class="button-box">
      <el-button @click="handleGoInner" class="switch">查看内饰</el-button>
      <el-button @click="handleDisplayPause" class="switch">{{ DPText }}</el-button>
    </div>
    <div id="color">
      <div @click="handleSwitchColor(0)" class="colorChoose green"></div>
      <div @click="handleSwitchColor(1)" class="colorChoose gray"></div>
      <div @click="handleSwitchColor(2)" class="colorChoose red"></div>
      <div @click="handleSwitchColor(3)" class="colorChoose black"></div>
      <div @click="handleSwitchColor(4)" class="colorChoose white"></div>
      <div @click="handleSwitchColor(5)" class="colorChoose pink"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as THREE from 'three';
// eslint-disable-next-line no-unused-vars
// import guiControls from '../components/GUI.js';
// eslint-disable-next-line no-unused-vars
import controls from '../components/Controls.js';
import { scene, camera, renderer } from '../components/SceneCamera.js';
import router from '../router';
import model from '../components/Model.js';
import render from '../components/Render.js';
import { displayBackgroundAudio, pauseBackgroundAudio } from '../components/Audio.js';

// const percentage = ref(100);
const DPText = ref('播放');

/**
 * 汽车模型换肤
 */
const setColor = (color) => {
  model.traverse((object) => {
    if (object.type === 'Mesh') {
      if (object.name.slice(0, 2) === '外壳') {
        object.material.color.set(color);
      }
    }
  });
};
const handleSwitchColor = (index) => {
  const colorArr = [0x023911, 0x222222, 0x6a030a, 0x000000, 0xffffff, 0x370239];
  setColor(colorArr[index]);
};

/**
 * 查看汽车内饰
 */
const handleGoInner = () => {
  pauseBackgroundAudio();
  router.push('/360');
};

/**
 * 背景音乐播放暂停
 */
const handleDisplayPause = () => {
  if (DPText.value === '播放') {
    DPText.value = '暂停';
    displayBackgroundAudio();
  } else {
    DPText.value = '播放';
    pauseBackgroundAudio();
  }
};

onMounted(() => {
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
   * gltf 模型
   */
  scene.add(model);

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
  const ambient = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambient);
  // 点光源
  const point = new THREE.PointLight(0xffffff);
  point.position.set(400, 200, 300);
  scene.add(point);

  /**
   * renderer.domElement 插入页面
   */
  const carElement = document.getElementById('car');
  if (carElement) carElement.appendChild(renderer.domElement);

  /**
   * resize 事件
   */
  const onWindowResize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  };
  window.addEventListener('resize', onWindowResize, false);

  /**
   * 循环渲染
   */
  render();
});

/**
 * 离开页面，隐藏标注
 */
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

.button-box {
  width: 500px;
  position: absolute;
  bottom: 100px;
  right: 20px;
  display: flex;
  justify-content: flex-end;
}
.switch {
  height: 50px;
  padding: 0 10px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

#color {
  width: 360px;
  position: absolute;
  background: rgba(0, 0, 0, 0.2);
  padding: 10px 16px;
  border-radius: 6px;
  left: 50%;
  margin-left: -190px;
  top: 100%;
  margin-top: -80px;
  display: flex;
  justify-content: space-around;
}

.colorChoose {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  cursor: pointer;
}
.green {
  background: #023911;
}
.gray {
  background: #222222;
}
.red {
  background: #6a030a;
}
.black {
  background: #000000;
}
.white {
  background: #ffffff;
}
.pink {
  background: #370239;
}
</style>
