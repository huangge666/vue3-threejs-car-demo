<template>
  <div>
    <!-- <p class="top"> -->
      <!-- <router-link to="/">汽车零件</router-link> ||
      <router-link to="/display">3d展示</router-link> ||
      <router-link to="/BYD">比亚迪宋</router-link> ||
      <router-link to="/360">360全景图片</router-link> -->
      <!-- <router-link to="/store">模型漫游</router-link> -->
    <!-- </p> -->
    <router-view></router-view>
  </div>
</template>

<script setup>

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  margin: 0;
  padding: 0;
}

.top {
  height: 50px;
  line-height: 50px;
}

a {
  font-weight: bold;
  color: #2c3e50;
}

.router-link-exact-active {
  color: #42b983;
}
</style>
