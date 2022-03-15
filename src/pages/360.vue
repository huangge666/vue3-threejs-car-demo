<template>
  <div id="photosphere"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import { Viewer } from 'photo-sphere-viewer';
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css';

onMounted(() => {
  // const viewer = new Viewer({
  //   panorama: 'https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg',
  //   container: 'photosphere',
  //   caption: 'Parc national du Mercantour <b>&copy; Damien Sorel</b>',
  //   loadingImg: 'https://photo-sphere-viewer.js.org/assets/photosphere-logo.gif',
  //   defaultLat: -Math.PI / 2,
  //   defaultLong: Math.PI,
  //   defaultZoomLvl: 0,
  //   fisheye: 4,
  //   navbar: false,
  // });
  // viewer.once('ready', () => {
  //   viewer.renderer.camera.far *= 2;
  //   viewer.animate({
  //     properties: {
  //       lat: { start: -Math.PI / 2, end: 0 },
  //       long: { start: Math.PI, end: 0 },
  //       zoom: { start: 0, end: 50 },
  //       fisheye: { start: 4, end: 0 },
  //     },
  //     duration: 2000,
  //     easing: 'inOutQuad',
  //     onTick: (properties) => {
  //       viewer.setOption('fisheye', properties.fisheye);
  //       viewer.rotate({ longitude: properties.long, latitude: properties.lat });
  //       viewer.zoom(properties.zoom);
  //     },
  //   });
  // });
  const viewer = new Viewer({
    container: document.querySelector('#photosphere'),
    // panorama: 'https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg',
    panorama: './panorama/5.png',
    size: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    defaultZoomLvl: 10,
    navbar: false,
  });
  viewer.once('ready', () => {
    viewer.animate({
      longitude: Math.PI,
      latitude: '20deg',
      zoom: 50,
      speed: '2rpm',
    });
  });
});

// onMounted(() => {
//   const viewer = new Viewer({
//     panorama: 'https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg',
//     container: 'photosphere',
//     caption: 'Parc national du Mercantour <b>&copy; Damien Sorel</b>',
//     loadingImg: 'https://photo-sphere-viewer.js.org/assets/photosphere-logo.gif',
//     defaultLat: -Math.PI / 2,
//     defaultLong: Math.PI,
//     defaultZoomLvl: 0,
//     fisheye: 4,
//     navbar: false,
//   });

//   viewer.on('ready', () => {
//     viewer.renderer.camera.far *= 2;

//     viewer.animate({
//       properties: {
//         lat: { start: -Math.PI / 2, end: 0 },
//         long: { start: Math.PI, end: 0 },
//         zoom: { start: 0, end: 50 },
//         fisheye: { start: 4, end: 0 },
//       },
//       duration: 2000,
//       easing: 'inOutQuad',
//       onTick: (properties) => {
//         viewer.setOption('fisheye', properties.fisheye);
//         viewer.rotate({ longitude: properties.long, latitude: properties.lat });
//         viewer.zoom(properties.zoom);
//       },
//     });
//   });
// });
</script>

<style scoped>
#photosphere {
  width: 100%;
  height: calc(100vh - 50px);
}
</style>
