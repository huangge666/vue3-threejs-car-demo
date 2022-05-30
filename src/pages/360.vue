<template>
  <div id="photosphere"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import { Viewer } from 'photo-sphere-viewer';
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css';

onMounted(() => {
  const viewer = new Viewer({
    container: document.querySelector('#photosphere'),
    // panorama: 'https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg',
    panorama: './panorama/car2.jpg',
    size: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    defaultLat: -Math.PI / 2,
    defaultLong: Math.PI,
    fisheye: 2,
    defaultZoomLvl: 10,
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
</script>

<style scoped>
#photosphere {
  width: 100%;
  height: calc(100vh - 50px);
}
</style>
