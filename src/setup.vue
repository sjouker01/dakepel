<template>
  <div id="threejs-container">
    <canvas id="webgl" ref="webglCanvas" @click="storeMenu.showHeader(0)"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { ThreeJs } from './threemain/three-index';
import { useMenuStore } from './server/menustore';

const storeMenu = useMenuStore();
const webglCanvas = ref(null);

onMounted(() => {
  const threeJsInstance = new ThreeJs(webglCanvas.value);
});
</script>

<style scoped>
#threejs-container {
  width: 70%;
  height: 70%;
  margin: 0 auto;
}
canvas {
  position: fixed;
  top: 0;
  left: 0;
}
</style>