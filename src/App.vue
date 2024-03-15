<template>
  <div id="app" class="bg-dark ">
    <!-- <q-layout  id="app" class="background-gradient"> -->
    <Header class=" fixed-top z-top"></Header>

    <SetupComponent />

  </div>
</template>


<script setup>
import SetupComponent from './setup.vue';
import Header from './routers/header.vue'
import { useMenuStore } from './server/menustore'
const henk = useMenuStore();
</script>


<style scoped>
.background-gradient {
  background: linear-gradient(to bottom, black, blue);
}
</style>