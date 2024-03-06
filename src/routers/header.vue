<template>
  <q-layout>
    <q-header class="fixed-top q-pa-md">
      <q-toolbar class="flex justify-center">
        <q-btn class="q-mr-lg" @click="toggleHeaders(true, false)" label="Toon eerste header" />
        <q-btn @click="toggleHeaders(false, true)" label="Toon tweede header" />
      </q-toolbar>
    </q-header>
    <div v-if="showFirstHeader" class="sub-header q-mt-md">
      <q-toolbar>
        <q-input v-model="breedte" label="Breedte" />
        <q-input v-model="hoogte" label="Hoogte" />
        <q-input v-model="graden" label="Graden" />
      </q-toolbar>
    </div>
    <div v-if="showSecondHeader" class="sub-header q-mt-md">
      <q-toolbar class="flex justify-center">
        <q-btn-dropdown
          split
          to="/start/pick-quasar-flavour"
          color="teal"
          rounded
          label="Go to Docs Index"
        >
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>Photos</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </div>
  </q-layout>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      showFirstHeader: false,
      showSecondHeader: false,
      breedte: '0',
      hoogte: '0',
      graden: '0'
    }
  },
  methods: {
    toggleHeaders(showFirst, showSecond) {
      this.showFirstHeader = showFirst;
      this.showSecondHeader = showSecond;
    }
  }
}
</script>

<style scoped>
.fixed-top {
  top: 5vh;
  left: 0;
  right: 0;
  width: 90%;
  border-radius: 50px;
  background-color: white;
  z-index: 1000;
}

.sub-header {
  position: absolute;
  top: calc(5vh + 30px);
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
}
</style>