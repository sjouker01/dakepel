import { GLTFLoader } from "three/examples/jsm/Addons.js";


export class KozijnParts {
  constructor() {
    this.loader = new GLTFLoader();
    this.objects = {};
  }



  ModelLoader() {
    return new Promise((resolve, reject) => {
      this.loader.load(
        " blender/raam.gltf",
        (gltf) => {
          const storeObjects = (node) => {
            if (node.isMesh) {
              this.objects[node.name] = node;
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

  // dit is om te zorgen dat ik hem kan oproepen in  andere file

  async getObject(name) {
    if (!this.objects[name]) {
      await this.ModelLoader().catch((error) => {
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