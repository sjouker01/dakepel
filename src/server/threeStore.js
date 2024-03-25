import { defineStore } from 'pinia';
import { RaamParts } from '../threemain/objecten/threeparts';

export const useStore = defineStore({
  id: 'meshStore',
  state: () => ({
    raamParts: new RaamParts(),
  }),
  actions: {
    async loadModel() {
      try {
        await this.raamParts.loadModel();
      } catch (error) {
        console.error('Fout bij het laden van het model:', error);
      }
    },
    async getObjects() {
      try {
        let balkOnder = await this.raamParts.getObject('balk-onder');
        let balkRechts = await this.raamParts.getObject('balk-rechts');
        let balkLinks = await this.raamParts.getObject('balk-links');
        let balkBoven = await this.raamParts.getObject('balk-boven');
        let kozijnplankOnder = await this.raamParts.getObject('kozijnplank-onder');
        let kozijnplankLinks = await this.raamParts.getObject('kozijnplank-links');
        let kozijnplankRechts = await this.raamParts.getObject('kozijnplank-rechts');
        let kozijnplankBoven = await this.raamParts.getObject('kozijnplan-boven');
        let plankNaarbinnen = await this.raamParts.getObject('kozijnplank-naarbinnen');

        return { balkOnder, balkRechts, balkLinks, balkBoven, kozijnplankOnder, kozijnplankLinks, kozijnplankRechts, kozijnplankBoven, plankNaarbinnen };
      } catch (error) {
        console.error('Fout bij het ophalen van objecten:', error);
        return null;
      }
    }
  }
});
