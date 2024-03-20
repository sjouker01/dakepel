import * as THREE from 'three';
import {GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
export class ImportRaamObject {
    constructor(scene) {
        this.scene = scene;
        this.loader = new GLTFLoader();
    }
    loadModel() {
        this.loader.load(
            'blender/raam.gltf',
            (object) => {
                this.scene.add(object.scene)
                

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