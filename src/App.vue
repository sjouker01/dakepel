<script>
// import Vue from 'vue'
import { createApp } from 'vue'
import Header from './routers/header.vue'; // Importeer de header component





const app = createApp({
  name: 'App',
  components: {
    Header // Voeg de header component toe aan de lijst met componenten
  }
})


app.mount('#app');

</script>

<template>
  <div id="app">
    <Header/>
  </div>
</template>