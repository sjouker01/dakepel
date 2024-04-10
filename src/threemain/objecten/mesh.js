// RaamComponents.js
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RaamParts } from './threeparts'; // Zorg ervoor dat je de RaamObject klasse importeert

export class RaamComponents {
  constructor() {
    this.loader = new GLTFLoader();
    this.raamParts = new RaamParts(); // Maak een nieuw RaamParts object
  }

  async loadObject(name, callback) {
    const object = await this.raamParts.getObject(name).catch((error) => { // Gebruik het RaamParts object om het object te krijgen
      throw new Error(`Kon het model niet laden: ${error}`);
    });
    callback(object);
  }

  applyTexture(name, texturePath) {
    this.raamParts.applyTexture(name, texturePath);
  }
}