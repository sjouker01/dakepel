import * as THREE from "three"; 



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
    scene.add(this.mesh);

  }
}
