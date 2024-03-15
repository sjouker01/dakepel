import * as THREE from "three"; 

import { GUI} from 'lil-gui'

export class floorObject {
  constructor(scene) {
    const geometry = new THREE.PlaneGeometry(100, 100, 80, 80);
    const material = new THREE.MeshBasicMaterial({
      color: 0xdddddd,
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(0, 0, 0);
    this.mesh.rotation.set(Math.PI / 2, 0, 0);
    const gui = new GUI();
    const FloorManager = {
      visible: true,
      Toggle: function(){
        floor.mesh.visible = !floor.mesh.visible;
        this.visible = floor.mesh.visible;
      }
    }
    
    scene.add(this.mesh);

    this.getStatus = function(){
      return{
      visible: this.mesh.visible,
      position: this.mesh.position,
      rotation: this.mesh.rotation
    };
  }
  }
}
