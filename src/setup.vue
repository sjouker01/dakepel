<template>
    <div id="threejs-container" ref="threejsContainer">
      <canvas id="webgl" ref="webglCanvas"></canvas>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import { ThreeJs } from './threemain/three-index';
  
  const threejsContainer = ref(null);
  const webglCanvas = ref(null);
  
  onMounted(() => {
    new ThreeJs(threejsContainer.value, webglCanvas.value );
  });
  </script>
  
  <style scoped>
  #threejs-container {
    width: 70vw;
    height: 75vh;
    margin-left:auto;
    margin-right:auto;
  }
  canvas {
  margin-top: 13vh;
}
</style>
