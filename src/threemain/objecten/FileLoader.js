import { GLTFLoader } from "three/examples/jsm/Addons.js";


export class KozijnParts {
    constructor()
    {
        this.Loader = new GLTFLoader();
        this.objects = {};
    }

    // dit zorgd voor dat als node een mesh is dat die het opslaat in objects
    ObjectsStoring(node){
        if (node.isMesh){
            this.objects[node.name] = node;
        }
        if (node.childeren){ 
            node.childeren.forEach((child) => this.processNode(child));
        }
    }
    // dit is om model te laden uit gltf 
    ModelLoader(){
        return new Promise((resolve, reject) => {
            this.Loader.load(
                "blender/raam.gltf",
                (gltf) =>{
                    this.ObjectsStoring(gltf.scene)
                    resolve();
                },
                undefined,
                (error) => {
                    console.log("er is een fout op line 30 ", error);
                    reject(error);
                }
            );
        });
    };

    // dit is om te zorgen dat ik hem kan oproepen in  andere file
    

    getObject(name) {
        if (!this.objects[name]) {
          try {
            this.loadModel();
          } catch (error) {
                throw  new Error(`kan het model niet laden (line42)`) 
            }
            }
        }
        loadObject(name, callback) {
            const object = this.getObject(name);
            callback(object);
          }

    }


