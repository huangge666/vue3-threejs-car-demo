import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "Model" */ '../pages/Model.vue'),
  },
  {
    path: '/carModel',
    name: 'CarModel',
    meta: {
      doNotCheckAuth: true,
      title: '汽车零件',
    },
    component: () => import(/* webpackChunkName: "carModel" */ '../pages/CarModel.vue'),
  },
  {
    path: '/store',
    name: 'Store',
    meta: {
      doNotCheckAuth: true,
      title: '模型漫游',
    },
    component: () => import(/* webpackChunkName: "store" */ '../pages/Store.vue'),
  },
  {
    path: '/model',
    name: 'Model',
    meta: {
      doNotCheckAuth: true,
      title: '模型展示',
    },
    component: () => import(/* webpackChunkName: "model" */ '../pages/Model.vue'),
  },
  {
    path: '/360',
    name: '360',
    meta: {
      doNotCheckAuth: true,
      title: '全景图片',
    },
    component: () => import(/* webpackChunkName: "360" */ '../pages/360.vue'),
  },
  {
    path: '/display',
    name: 'Display',
    meta: {
      doNotCheckAuth: true,
      title: '3D展示',
    },
    component: () => import(/* webpackChunkName: "display" */ '../pages/Display.vue'),
  },
];

export default routes;
