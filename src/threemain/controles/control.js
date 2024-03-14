import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class OrbitControlsClass {
  constructor(camera, renderer) {
    this.controls = new OrbitControls(camera, renderer.domElement);

    // Hiermee kan de camera rond het doel draaien
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;

    // Hiermee kan de camera in- en uitzoomen
    this.controls.screenSpacePanning = false;

    // Hiermee kan de camera op en neer bewegen
    this.controls.minDistance = 100;
    this.controls.maxDistance = 500;

    // Hiermee kan de camera links en rechts bewegen
    this.controls.maxPolarAngle = Math.PI / 2;
  }

  update() {
    // Je moet deze functie aanroepen na elke verandering van de camera
    this.controls.update();
  }
}
