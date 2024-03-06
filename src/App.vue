

<template>
    <div id="app" class="background-gradient">
    <Header/>
    </div>
    </template>

<script>
import Header from './routers/header.vue'
export default {
  name: 'App',
  components: {
    Header
  }
}


</script>./header.vue


<style scoped>
.background-gradient {
  height: 100vh;
  background: linear-gradient(to bottom, black, blue);
}
</style>