import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


export class OrbitControlsthree{
    constructor(container , canvas){
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
        this.camera.position.z = 5;

        this.renderer = new THREE.WebGLRenderer({ canvas: canvas });
        this.renderer.setSize(container.offsetWidth, container.offsetHeight);
    
    }
}