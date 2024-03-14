import { defineStore } from 'pinia'


export const useMenuStore = defineStore('henk', {

    state: () => {
        return {
          // all these properties will have their type inferred automatically

          hoogte: 0,
          breedte: 0,
          graden: 0,
          
          header: 0
        }
      },

    
    actions: {

       showHeader(NewHeader) {
        this.header = NewHeader;
        console.log(NewHeader)
      }
    }
  })


