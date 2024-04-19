// RaamComponents.js
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RaamParts } from './threeparts'; // Zorg ervoor dat je de RaamObject klasse importeert

export class RaamComponents {
  constructor() {
    this.loader = new GLTFLoader();
    this.raamParts = new RaamParts(); // Maak een nieuw RaamParts object
  }

  async loadObject(name, callback) {
    const object = await this.raamParts.getObject(name).catch((error) => {
      throw new Error(`Kon het model niet laden: ${error}`);
    });
  
    if (typeof callback === 'function') {
      callback(object);
    } else {
      console.error('Error: callback is not a function');
    }
  }
}