  <template>
    <q-layout>
      <q-header class="fixed-top q-pa-md rounded-borders">
        <q-toolbar class="flex justify-center">
          <q-btn color="blue" class="q-mr-lg" @click="toggleHeaders(true, false)" label="Toon eerste header" />
          <q-btn color="blue" @click="toggleHeaders(false, true)" label="Toon tweede header" />
        </q-toolbar>
      </q-header>
      <q-page-container>
        <div v-if="showFirstHeader" class="sub-header q-mt-md rounded-borders">
          <q-toolbar class="q-col-md-10 q-offset-md-1 flex justify-center">
            <q-input v-model="breedte" label="Breedte" />
            <q-input v-model="hoogte" label="Hoogte" />
            <q-input v-model="graden" label="Graden" />
          </q-toolbar>
        </div>
        <div v-if="showSecondHeader" class="sub-header q-mt-md rounded-borders">
    <q-toolbar class="q-col-md-10 q-offset-md-1 flex justify-center">
      <q-btn-dropdown
        color="blue"
        rounded
        label="Go to Docs Index"
        class="dropdown-btn"
      >
              <q-list>
                <q-item clickable v-close-popup>
                  <q-item-section>
                    <q-item-label>Photos</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            <q-btn-dropdown
        color="blue"
        rounded
        label="Go to Docs Index"
        class="dropdown-btn"
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
      </q-page-container>
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
  .rounded-borders {
    background-color: white;
    border: none;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
  }
  .q-header{
    width: 70vw;
    margin-top: 5vh;
  }
  .sub-header{
    width: 40vw;
    margin-top: 7vh;
  }
  .button-spacing {
  margin-right: 20px;  /* Pas de waarde aan naar uw voorkeur */
  }

  </style>