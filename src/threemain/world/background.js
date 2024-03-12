import * as THREE from 'three';

export class BackgroundColor {
    constructor(scene){
        this.scene = scene;
    }
    setSceneBackgroudColor(){
        this.scene.background = new THREE.Color(0x2e4382);
    }
}