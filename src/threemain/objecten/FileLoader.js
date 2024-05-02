import { GLTFLoader } from "three/examples/jsm/Addons.js";


export class KozijnParts {
    constructor()
    {
        this.loader = new GLTFLoader();
        this.objects = {};
    }

    // dit zorgd voor dat als node een mesh is dat die het opslaat in objects
    ObjectsStoring(node){
        if (node.isMesh){
            this.objects[node.name] = node;
        }
        if (node.children){ 
            node.children.forEach((child) => this.ObjectsStoring(child));
        }
    }
    // dit is om model te laden uit gltf 
    ModelLoader(){
        return new Promise((resolve, reject) => {
            this.loader.load(
              "blender/raam.gltf",
              (gltf) => {
                this.ObjectsStoring(gltf.scene);
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


