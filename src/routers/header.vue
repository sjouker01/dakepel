<template>
  <div class="z-top">
    <header class="q-pa-md rounded-borders">
      <q-toolbar class="flex justify-center">
        <q-btn
          color="blue"
          class="q-mr-lg"
          @click="store.showHeader(1)"
          label="afmetingen"
        />
        <img src="../assets/img/logo.jpeg" alt="Logo" class="logo" />
        <q-btn
          color="blue"
          @click="store && store.showHeader(2)"
          label="materialen"
        />
      </q-toolbar>
    </header>
    <div class="container69">
      <div
        v-if="store.header === 1"
        class="sub-header q-mt-md rounded-borders bg-white"
      >
        <q-toolbar class="q-col-md-10 q-offset-md-1 flex justify-center">
          <q-input v-model="store.breedte" label="Breedte" type="number" />
          <q-input v-model="store.hoogte" label="Hoogte" type="number" />
          <q-input v-model="store.graden" label="Graden" type="number" />
        </q-toolbar>
      </div>
      <div
        v-if="store.header === 2"
        class="sub-header q-mt-md rounded-borders bg-white"
      >
        <q-toolbar class="q-col-md-10 q-offset-md-1 flex justify-center">
          <q-btn-dropdown
            color="blue"
            rounded
            label="kozijn"
            class="dropdown-btn"
          >
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>kleur opties  </q-item-label>
                </q-item-section>
                <q-item-section horizontal>
                  <q-btn
                    flat
                    dense
                    label="rood"
                    color="red"
                    @click="store.setColor('red')"
                  />
                  <q-btn
                    flat
                    dense
                    label="baby-blauw"
                    color="blue"
                    @click="store.setColor(0x89cff0)"
                  />
                  <q-btn
                    flat
                    dense
                    label="Groen"
                    color="green"
                    @click="store.setColor(0x50c878)"
                  />
                  <q-btn
                    flat
                    dense
                    label="wit"
                    color="black"
                    @click="store.setColor(0xdcdcdc)"
                  />
                  <q-btn
                    flat
                    dense
                    label="Bruin"
                    color="brown"
                    @click="store.setColor(0x5c4033)"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-btn-dropdown
            color="blue"
            rounded
            label="muur"
            class="dropdown-btn"
          >
            <q-list>
             
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Color Options</q-item-label>
                </q-item-section>
                <q-item-section horizontal>
                  
                  <q-btn flat   color="brown" @click="store.setTextureName('hout')">spar-hout</q-btn>
                  <q-btn flat    color="blue" @click="store.setTextureName('blue')">Blauw</q-btn>
                  <q-btn flat    color="green" @click="store.setTextureName('green')">Green</q-btn>
                  <q-btn flat   color="black" @click="store.setTextureName('gray')">gray</q-btn>
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

.q-toolbar > .q-btn,
.q-toolbar > .q-btn-dropdown {
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
import { useMenuStore } from "../server/menustore";
import { watch } from "vue";
const store = useMenuStore();
let max = 5000;
// breedte 6500
let maxHoogte = 2500;
let min = 800;
let maxGraden = 75;
let minGraden = 25;

watch(
  () => store.color,
  () => {
    window.ThreeJs.updateGraden();
    window.ThreeJs.updateColorThree();
  }
);

watch(
  () => store.hoogte,
  (newHoogte) => {
    newHoogte = Number(newHoogte);

    if (newHoogte > maxHoogte) {
      console.log("test");
      store.setHoogte(maxHoogte);
    } else if (newHoogte < min) {
      store.setHoogte(min);
    } else {
      console.log(window.ThreeJs);
      window.ThreeJs.myWindow.updateHoogte();
      window.ThreeJs.updateGraden();
    }
  }
);
watch(
  () => store.breedte,
  (newBreedte) => {
    newBreedte = Number(newBreedte);
    if (newBreedte > max) {
      console.log("test");
      store.setBreedte(max);
    } else if (newBreedte < min) {
      store.setBreedte(min);
    } else {
      window.ThreeJs.updateGraden();
      window.ThreeJs.myWindow.updateBreedte();
    }
  }
);

watch(
  () => store.graden,
  (newGraden) => {
    newGraden = Number(newGraden);
    if (newGraden > maxGraden) {
      store.setGraden(maxGraden);
    } else if (newGraden < minGraden) {
      store.setGraden(minGraden);
    } else {
      window.ThreeJs.updateGraden();
    }
  }
);
watch(
  () => store.textureName,
  (newtextureName) => {
    window.ThreeJs.updateColorThree(newtextureName);
  }
);
</script>
