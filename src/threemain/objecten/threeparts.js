import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export class RaamParts {
  constructor() {
    this.loader = new GLTFLoader();
    this.objects = {};
  }

  processNode(node) {
    if (node.isMesh) {
      this.objects[node.name] = node;
    }

    if (node.children) {
      node.children.forEach(child => this.processNode(child));
    }
  }

  loadModel() {
    return new Promise((resolve, reject) => {
      this.loader.load(
        'blender/raam.gltf', 
        (gltf) => {
          this.processNode(gltf.scene);
          resolve();
        },
        undefined, // onProgress callback not needed
        (error) => {
          console.error('An error happened', error);
          reject(error);
        }
      );
    });
  }

  async getObject(name) {
    if (!this.objects[name]) {
      await this.loadModel();
    }
    return this.objects[name];
  }
}