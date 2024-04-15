import { defineStore } from "pinia";
import { reactive } from "vue";
import * as THREE from 'three';

export const useMenuStore = defineStore("mainstore", {
  state: () => ({
    breedte: "1000",
    hoogte: "1000",
    graden: "",
    objects: {}, 
    // windowSize: 1,
    color: "gray",
    texture: "",
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
    setColor(color, texture) {
      // this.color = color;
      
    },
    setTexture( texture) {

    this.texture =  new  THREE.TextureLoader().load('/blender/WoodFlooringAshSuperWhite001/WoodFlooringAshSuperWhite001_COL_2K.jpg' ); 
    this.texture.colorSpace = THREE.SRGBColorSpace
    console.log('test')
    },
  },
});
