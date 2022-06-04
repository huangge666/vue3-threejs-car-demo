import * as THREE from 'three';
import { ref } from 'vue';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { CreatePointsTags } from './PointsTag.js';
import CylinderPlatform from './CylinderPlatform.js';
import SetCarMaterial from './SetCarMaterial.js';
import { openClose } from './OpenClose.js';
import { label1Generator } from './3DMarks';
// import { lensflare1, lensflare2 } from './CarLight.js';

/**
* gltf 模型加载
*/
const model = new THREE.Group();
const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('./draco/');
loader.setDRACOLoader(dracoLoader);
const percentage = ref(100);

loader.load(
  './gltf/2.gltf',
  // 'https://tomgou.github.io/threejs-demo/gltf/2.gltf',
  (gltf) => {
    // 材质重置
    SetCarMaterial(gltf.scene);

    // 添加底部圆柱体平台
    model.add(CylinderPlatform);

    // 创建水波纹标注 tag
    CreatePointsTags(gltf.scene);

    // 添加交互动画：开关车门，后备箱，天窗
    openClose(gltf.scene);

    // 添加前脸标注
    const label1 = label1Generator();
    model.add(label1);

    // 添加侧门标注
    // const label2 = label2Generator();
    // model.add(label2);

    // 开关车灯
    // const light1 = gltf.scene.getObjectByName('前灯罩02');
    // const light2 = gltf.scene.getObjectByName('前灯泡');
    // light1.add(lensflare1);
    // light2.add(lensflare2);

    model.add(gltf.scene);
  },
  // eslint-disable-next-line no-unused-vars
  (xhr) => {
    console.log(xhr.loaded, xhr.total);
    percentage.value = +((xhr.loaded / xhr.total) * 100).toFixed(0);
  },
  (err) => {
    console.log({ err });
  },
);

export {
  model,
  percentage,
};
