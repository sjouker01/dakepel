import { defineStore } from "pinia";

export const useMenuStore = defineStore("mainstore", {
  state: () => ({
    breedte: "1200",
    lengte: "1000",
    hoogte: "1000",
    graden: "45",
    objects: {},
    color: "White ",
    textureName: "hout"
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
    setColor(color) {
      this.color = color;
    },

    // In actions:
    setTextureName(textureName) {
      this.textureName = textureName;
    },  
  },
});
