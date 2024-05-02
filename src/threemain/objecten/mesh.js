// RaamComponents.js
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export class RaamComponents {
    constructor() {
      this.loader = new GLTFLoader();
      this.objects = {};
    }
  
    processNode(node) {
      if (node.isMesh) {
        this.objects[node.name] = node;
      }
  
      if (node.children) {
        node.children.forEach((child) => this.processNode(child));
      }
    }
  
    loadModel() {
      return new Promise((resolve, reject) => {
        this.loader.load(
          "blender/raam.gltf",
          (gltf) => {
            this.processNode(gltf.scene);
            resolve();
          },
          undefined,
          (error) => {
            console.error("Fout bij het laden van het model", error);
            reject(error);
          }
        );
      });
    }
  
    async getObject(name) {
      if (!this.objects[name]) {
        await this.loadModel().catch((error) => {
          throw new Error(`Kon het model niet laden: ${error}`);
        });
      }
      return this.objects[name];
    }
  
    async loadObject(name, callback) {
      const object = await this.getObject(name);
      callback(object);
    }
  }