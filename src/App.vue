

<template>
<div id="app" class="background-gradient">
  <q-layout>
      <Header />
 
      <SetupComponent />
   </q-layout>
</div>
</template>



<script setup>
import SetupComponent from './setup.vue';
import Header from './routers/header.vue'
import { useMenuStore} from './store/menustore'
const henk = useMenuStore();
</script>


<style scoped>


.background-gradient {
  background: linear-gradient(to bottom, black, blue);
}
</style>