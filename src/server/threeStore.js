import { defineStore } from 'pinia';
import { floorObject } from '../threemain/world/floor';
import { Scene } from 'three';
import GUI from 'lil-gui';

export const useFloorStore = defineStore({
  id: 'floor',
  state: () => ({
    floor: new floorObject(Scene),
    gui: new GUI(),
  }),
  getters: {
    status() {
      return this.floor.getStatus();
    },
  },
  actions: {
    initializeGUI() {
      this.gui.add(this.status, 'visible').onChange((value) => {
        this.floor.mesh.visible = value;
      });
    },
  },
});