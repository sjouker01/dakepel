import * as THREE from 'three';

export class Camera {
    constructor(sizes = { width: 800, height: 600 }) {
        this.sizes = sizes;

        this.camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height);
    }

    getCamera() {
        return this.camera;
    }

    /**
     * 
     * @param { horizontale as} x 
     * @param { verticale as} y 
     * @param {diepte as} z 
     */
    setCameraPosition(x, y, z) {
        this.camera.position.x = x;
        this.camera.position.y = y;
        this.camera.position.z = z;
    }
}