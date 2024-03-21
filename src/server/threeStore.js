import { defineStore } from 'pinia';
import { RaamParts } from '../threemain/objecten/threeparts';

export const useStore = defineStore({
  id: 'meshStore',
  state: () => ({
    raamParts: new RaamParts(),
  }),
  actions: {
    loadModel() {
      this.raamParts.loadModel();
    },
    getObjects() {
      let balkOnder = this.raamParts.getObject('balk-onder');
      let balkRechts = this.raamParts.getObject('balk-rechts');
      let balkLinks = this.raamParts.getObject('balk-links');
      let balkBoven = this.raamParts.getObject('balk-boven');
      let kozijnplankOnder = this.raamParts.getObject('kozijnplank-onder');
      let kozijnplankLinks = this.raamParts.getObject('kozijnplank-links');
      let kozijnplankRects =  this.raamParts.getObject('kozijnplank-rechts');
      let kozijnplankBoven = this.raamParts.getObject('kozijnplan-boven');
      let plankNaarBinnne = this.raamParts.getObject('kozijnplank-naarbinnen')
      return { balkOnder, balkRechts, balkLinks, balkBoven, kozijnplankBoven, kozijnplankLinks,kozijnplankOnder,kozijnplankRects, plankNaarBinnne};
    },
    convertScaleToMM(object){
        
        //  maakt 1 = 1000
        const scaleToMMFactor = 1000;

        object.scale[0] *= scaleToMMFactor;
        object.scale[1] *= scaleToMMFactor;
        object.scale[2] *= scaleToMMFactor;
    }
  },
});