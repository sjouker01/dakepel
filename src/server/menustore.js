import { defineStore } from "pinia";
import { reactive } from "vue";

export const useMenuStore = defineStore("mainstore", {
  state: () => ({
    breedte: "1000",
    hoogte: "1000",
    graden: "",
    objects: {}, // Voeg een nieuw veld toe voor de objecten
    color: "gray",
  }),
  mutations: {
    // other mutations...
    SET_WINDOW_SIZE(state, size) {
      state.windowSize = size;
    },
  },

  actions: {
    showHeader(NewHeader) {
      this.header = NewHeader;
    },

    // menustore.js
    actions: {
      setWindowSize({ commit }, size) {
        commit("SET_WINDOW_SIZE", size);
      },
    },

    setObject(name, object) {
      this.objects[name] = object; // Voeg een nieuwe actie toe om een object in te stellen
    },
    setColor(color) {
      this.color = color;
    },
  },
});
