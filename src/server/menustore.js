import { defineStore } from "pinia";
import { reactive } from "vue";

export const useMenuStore = defineStore("henk", {
  state: () => ({
    breedte: "",
    hoogte: "",
    graden: "",
    objects: {}, // Voeg een nieuw veld toe voor de objecten
  }),

  actions: {
    showHeader(NewHeader) {
      this.header = NewHeader;
    },

    setObject(name, object) {
      this.objects[name] = object; // Voeg een nieuwe actie toe om een object in te stellen
    },

    
  },
});
