import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
export class KozijnParts {
  constructor() {
    this.loader = new GLTFLoader();
    this.textureLoader = new THREE.TextureLoader();
    this.objects = {};
    this.textures = {
      'balk-onder': 'blender/texture/balk-onder.jpg',
      'balk-boven': 'blender/texture/balk-boven.jpg',
      'balk-links': 'blender/texture/balk-links.jpg',
      'balk-midden': 'blender/texture/balk-midden.jpg',
      'balk-rechts': ' blender/texture/balk-rechts.jpg'
    }
    
  }



  ModelLoader() {
    return new Promise((resolve, reject) => {
      this.loader.load(
        "blender/raam.gltf",
        (gltf) => {
          const storeObjects = (node) => {
            if (node.isMesh) {
              this.objects[node.name] = node;
              if (node.material && this.textures[node.name]) {
                this.textureLoader.load(
                  this.textures[node.name],
                  (texture) => {
                    console.log('Texture is succesvol geladen: ', texture);
                    node.material.map = texture;
                    node.material.needsUpdate = true;
                  },
                  (xhr) => {
                    console.log((xhr.loaded / xhr.total * 100) + '% geladen');
                  },
                  (error) => {
                    console.error('Er is een fout opgetreden bij het laden van de textuur: ', error);
                  }
                );
              }
            }
            if (node.children) {
              node.children.forEach((child) => storeObjects(child));
            }
          };
          storeObjects(gltf.scene);
          resolve();
        },
        undefined,
        (error) => {
          console.error(" fout met inladen van modelel error code:", error);
          reject(error);
        }
      );
    });
  }

  

  async getObject(name) {
    if (!this.objects[name]) {
      await this.ModelLoader().catch((error) => {
        throw new Error(`Kon het model niet laden: ${error}`);
      });
    }
    if (this.objects[name]) {
      return this.objects[name];
    }
    if (this.textures[name]) {
      return this.textures[name];
    }
    throw new Error(`Object or texture with name ${name} does not exist`);
  }

  async loadObject(name, callback) {
    const object = await this.getObject(name);
    if (object) {
      callback(object);
    } else {
      console.error(`Object with name ${name} does not exist`);
    }
}
}