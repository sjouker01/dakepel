import * as THREE from "three";

export class Camera {
  constructor(width, height) {
    this.instand = new THREE.PerspectiveCamera(75, width / height);
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
}
