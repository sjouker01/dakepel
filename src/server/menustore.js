import { defineStore } from "pinia";
import { reactive } from "vue";
import * as THREE from 'three';

export const useMenuStore = defineStore("mainstore", {
  state: () => ({
    breedte: "1000",
    hoogte: "1000",
    graden: "",
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
    setObject(name, object) {
      this.objects[name] = object; 
    },
  }
});
