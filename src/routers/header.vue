<template>
  <div  class="z-top">
    <header class=" q-pa-md rounded-borders">
      <q-toolbar class="flex justify-center">
        <q-btn color="blue" class="q-mr-lg" @click="bier.showHeader(1)" label="afmetingen" />
        <img src="../assets/img/logo.jpeg" alt="Logo" class="logo" />
        <q-btn color="blue" @click="bier.showHeader(2)" label="materialen" />
      </q-toolbar>
    </header>
    <div class="container69">
      <div v-if="bier.header === 1" class="sub-header q-mt-md rounded-borders bg-white">
        <q-toolbar class="q-col-md-10 q-offset-md-1 flex justify-center">
          <q-input v-model="bier.breedte" label="Breedte" />
          <q-input v-model="bier.hoogte" label="Hoogte" />
          <q-input v-model="bier.graden" label="Graden" />
        </q-toolbar>
      </div>
      <div v-if="bier.header === 2" class="sub-header q-mt-md rounded-borders bg-white">
        <q-toolbar class="q-col-md-10 q-offset-md-1 flex justify-center">
          <q-btn-dropdown color="blue" rounded label="muur" class="dropdown-btn">
            <q-list>

              <q-item clickable v-close-popup>
                <q-btn flat dense label="Hout" color="primary" />
              </q-item>
              <q-item clickable v-close-popup>
                <q-btn flat dense label="Treplex" color="primary" />
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Color Options</q-item-label>
                </q-item-section>
                <q-item-section horizontal>
                  <q-btn flat dense label="Red" color="red" />
                  <q-btn flat dense label="Blue" color="blue" />
                  <q-btn flat dense label="Green" color="green" />
                  <q-btn flat dense label="Yellow" color="yellow" />
                  <q-btn flat dense label="Purple" color="purple" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-btn-dropdown color="blue" rounded label="kozijn" class="dropdown-btn">
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Material Options</q-item-label>
                </q-item-section>
                <q-item-section horizontal>
                  <q-btn flat dense label="Hardhout" color="brown" />
                  <q-btn flat dense label="Plastic" color="grey" />
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Color Options</q-item-label>
                </q-item-section>
                <q-item-section horizontal>
                  <q-btn flat dense label="Red" color="red" />
                  <q-btn flat dense label="Blue" color="blue" />
                  <q-btn flat dense lnabel="Green" color="green" />
                  <q-btn flat dense label="Yellow" color="yellow" />
                  <q-btn flat dense label="Purple" color="purple" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-toolbar>
      </div>
    </div>
  </div>
</template>


<style scoped>
.rounded-borders {
  background-color: white;
  border: none;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
  max-width: 90vw;

  margin-top: 20px;

}

.q-header {
  width: 70vw;
  max-width: 90vw;


}

.sub-header {
  width: 40vw;
  max-width: 90vw;
  /* Add a maximum width */

}

.q-toolbar>.q-btn,
.q-toolbar>.q-btn-dropdown {
  margin: 0 5vw;
}

.logo {
  position: absolute;
  width: 50px;
  height: 50px;
  object-fit: contain;
  /* keeps aspect ratio */
}
</style>



<script setup>

import { useMenuStore } from '../store/menustore';
import { ref } from 'vue'
const bier = useMenuStore();
let herman = ref(0)

</script>
