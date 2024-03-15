import * as THREE from "three";
import { ThreeJs } from "../three-index";

export class raamObject {
  constructor(scene) {
    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff0})
    this.cube = new THREE.Mesh(geometry, material)
    this.cube.position.set(0,0,1)
    scene.add(this.cube)
  
}
}
