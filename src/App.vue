

<template>
    <div id="app" class="background-gradient">
    <Header/>
    </div>
    </template>

<script setup>
import Header from './routers/header.vue'
import { useMenuStore} from './store/menustore'
const henk = useMenuStore();



</script>./header.vue


<style scoped>
.background-gradient {
  height: 100vh;
  background: linear-gradient(to bottom, black, blue);
}
</style>