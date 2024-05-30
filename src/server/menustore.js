import { defineStore } from "pinia";


export const useMenuStore = defineStore("mainstore", {
  state: () => ({
    breedte: "1200",
    hoogte: "1000",
    graden: "45",
    objects: {},
    color: "gray",
  }),

  actions: {
    showHeader(NewHeader) {
      this.header = NewHeader;
    },
    setBreedte(breedte) {
      this.breedte = Number(breedte);
    },
    setHoogte(hoogte) {
      this.hoogte = Number(hoogte);
    },
    setGraden(graden) {
      this.graden = Number(graden);
    },

    setObject(name, object) {
      this.objects[name] = object;
    },
  },
});
