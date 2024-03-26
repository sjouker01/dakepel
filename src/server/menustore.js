import { defineStore } from "pinia";
import { reactive } from "vue";

export const useMenuStore = defineStore("henk", {
  state: () => 
    ({
      breedte: 1000,
      hoogte: "",
      graden: "",
    }),

   
  

  actions: {
    showHeader(NewHeader) {
      this.header = NewHeader;
    },
  },
});
