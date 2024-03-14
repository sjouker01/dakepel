import * as THREE from "three"; // Importeer alle exports van de three.js bibliotheek

export class floorObject {
  constructor(scene) {
    const geometry = new THREE.PlaneGeometry(10, 10, 8, 8);
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
