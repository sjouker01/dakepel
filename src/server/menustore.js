import { defineStore } from "pinia";
import { reactive } from "vue";

export const useMenuStore = defineStore("mainstore", {
  state: () => ({
    breedte: "1000",
    hoogte: "1000",
    graden: "",
    objects: {}, 
    // windowSize: 1,
    color: "gray",
  }),


  actions: {
    showHeader(NewHeader) {
      this.header = NewHeader;
    },
    setBreedte(breedte) {
      this.breedte = Number(breedte);
    },

    setObject(name, object) {
      this.objects[name] = object; 
    },
    setColor(color) {
      this.color = color;
    },
  },
});
