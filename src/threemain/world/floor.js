import * as THREE from 'three'; // Importeer alle exports van de three.js bibliotheek
import GUI from 'lil-gui'

const gui = new GUI()

export class floorObject {
  constructor(scene) {
    const geometry = new THREE.PlaneGeometry(10, 10, 8, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0xdddddd, side: THREE.DoubleSide }); // Maak het materiaal zichtbaar aan beide zijden
    this.mesh = new THREE.Mesh(geometry, material);

    // Verander de positie
    this.mesh.position.set(0, 0, 0); // vervang x, y, z door de gewenste waarden

    // Verander de rotatie
    this.mesh.rotation.set(Math.PI / 2, 0, 0); // vervang rx, ry, rz door de gewenste waarden

    scene.add(this.mesh);

    // Add GUI control
    this.guiControl = gui.add(this.mesh, 'visible').name('Show Floor');
  }
}