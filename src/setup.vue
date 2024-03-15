<template>
  <div id="threejs-container">
    <canvas id="webgl" ref="webglCanvas" @click="store.showHeader(0)"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { ThreeJs } from './threemain/three-index';
import { GUI } from 'lil-gui'




const webglCanvas = ref(null);

let gui = null;


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

.dg.ac {
  position: fixed !important;
  right: 0 !important;
  bottom: 0 !important;
  top: 10vh !important;
  left: auto !important;
}
</style>./server/menustore