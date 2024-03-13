<template>
  <div id="threejs-container">
    <canvas id="webgl" ref="webglCanvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { ThreeJs } from './threemain/three-index';

const webglCanvas = ref(null);

onMounted(() => {
  const threeJsInstance = new ThreeJs(webglCanvas.value);
});
</script>
  
<style scoped>
#threejs-container {
  width: 70%; /* Veranderd naar 100% voor volledige breedte */
  height: 70%; /* Veranderd naar 100vh voor volledige hoogte */
  margin: 0 auto; /* Gecombineerd margin-left en margin-right */
}

canvas {
  position: fixed; /* Toegevoegd om canvas te centreren */
  top: 0;
  left:0;
}
</style>