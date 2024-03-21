import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

export class ImportRaamObject {
    constructor(scene) {
        this.scene = scene;
        this.loader = new GLTFLoader();

        this.dracoLoader = new DRACOLoader();
        this.dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
        this.loader.setDRACOLoader( this.dracoLoader );


  
    }

    loadModel() {
        this.loader.load(
            'blender/raam.gltf',
            (object) => {
                object.scene.scale.set(1, 1, 1);
                object.scene.position.set(0,1,0);
                this.scene.add( object.scene);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            (error) => {
                console.log(error);
            }
        );
    }   
}

export default ImportRaamObject;