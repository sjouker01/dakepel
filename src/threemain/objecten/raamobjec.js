import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

export class ImportRaamObject {
    constructor(scene) {
        this.scene = scene;
        this.loader = new OBJLoader();
    }
    loadModel() {
        this.loader.load(
            '../blender/model.ojb',
            (object) => {
                object.scale.set(50, 50, 50);
                object.traverse((child) => {
                    if (child instanceof THREE.Mesh && child.material === undefined) {
                        child.material = new THREE.MeshStandardMaterial({ color: 0x555555 });
                    }
                });
                this.scene.add(object);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            (error) => {
                console.log('An error happened');
            }
        );
    }
}

export default ImportRaamObject;