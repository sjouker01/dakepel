import { defineStore } from 'pinia'


export const useMenuStore = defineStore('henk', {

    state: () => {
        return {
          // all these properties will have their type inferred automatically

          hoogte: 0,
          breedte: 0,
          graden: 0,
          
          
        }
      },

    
    
  })



//   export default {
//     name: 'Header',
//     data() {
//       return {
//         showFirstHeader: false,
//         showSecondHeader: false,
//       }
//     },
//     methods: {
//       toggleHeaders(showFirst, showSecond) {
//         this.showFirstHeader = showFirst;
//         this.showSecondHeader = showSecond;
//       },
//       hideHeaders() {
//         this.showFirstHeader = false;
//         this.showSecondHeader = false;
//       }
//     }
//   }