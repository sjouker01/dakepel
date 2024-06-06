import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class Camera {
  constructor(width, height, renderer) {
    this.camera = new THREE.PerspectiveCamera(75, width / height );
    this.setCameraPosition(0,2,-5);
      // console.log(camera)
    // console.log(camera.instand)
    this.controls = new OrbitControls(this.camera, renderer.domElement);

    // Hiermee kan de camera rond het doel draaien
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;

    // Hiermee kan de camera in- en uitzoomen
    this.controls.screenSpacePanning = false;

    // Hiermee kan de camera op en neer bewegen
    this.controls.minDistance = 3;
    this.controls.maxDistance = 50;

    // Hiermee kan de camera links en rechts bewegen
    this.controls.maxPolarAngle = Math.PI / 2;
  }

  /**
   *
   * @param { horizontale as} x
   * @param { verticale as} y
   * @param {diepte as} z
   */
  setCameraPosition(x, y, z) {
    this.camera.position.x = x;
    this.camera.position.z = z;
    this.camera.position.y = y;
  }
  getCameraPosition() {
    return this.camera.position;
  }
  
  update() {
    // Je moet deze functie aanroepen na elke verandering van de camera
    this.controls.update();
  }
}
