import * as THREE from "three";

export class lamp1 {
  constructor() {
    this.light1 = new THREE.DirectionalLight(0xffffff, 1);
    this.light1.position.set(0, 50, 20);
    this.light2 = new THREE.DirectionalLight(0xffffff, 1);
    this.light2.position.set(0, 50, -20);
  }
  getLight() {
    return [this.light1, this.light2];
  
  }
}
