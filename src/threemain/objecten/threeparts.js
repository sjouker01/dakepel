import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three';

export class RaamParts {
  constructor() {
    this.loader = new GLTFLoader();
    this.textureLoader = new THREE.TextureLoader();
    this.objects = {};
    this.textures = {};
  }
   // Voeg een nieuwe methode toe om een textuur te laden
   loadTexture(url) {
    return new Promise((resolve, reject) => {
      this.textureLoader.load(url, resolve, undefined, reject);
    });
  }

  processNode(node) {
    if (node.isMesh) {
      this.objects[node.name] = node;
      if (node.material && node.material.map && node.material.map.image) {
        this.textures[node.material.map.image.src] = node.material.map.image;
      }
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
          gltf.scene.traverse((node) => {
            if (node.isMesh) {
              this.objects[node.name] = node;
              if (node.material.map) {
                this.textures[node.material.map.name] = node.material.map.image;
              }
            }
          });
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
}