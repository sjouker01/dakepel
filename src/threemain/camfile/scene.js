import * as THREE from 'three';
import { Camera } from './camera';

export class Scene {
    constructor(sizes) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);

        // Maak een nieuw Camera object met de gegeven breedte en hoogte
        this.myCamera = new Camera(sizes);

        // Stel de positie van de camera in
        this.myCamera.setCameraPosition(0, 0, 5);

        // Voeg de camera toe aan de scène
        this.scene.add(this.myCamera.getCamera());
    }

    getScene() {
        // Haal de THREE.js scene instance op
        return this.scene;
    }

    getCamera() {
        // Haal de THREE.js camera instance op
        return this.myCamera.getCamera();
    }
}