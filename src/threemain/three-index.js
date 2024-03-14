import * as THREE from "three";
import { floorObject } from "./world/floor";
import { BackgroundColor } from "./world/background";
import { OrbitControlsClass } from "./controles/control";

export class ThreeJs {
  constructor(container) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      5,
      window.innerWidth / window.innerHeight
    );

    window.addEventListener("resize", () => this.onWindowResize(), false);
    this.renderer = new THREE.WebGLRenderer({ canvas: container });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    const newfloor = new floorObject(this.scene);

    this.controls = new OrbitControlsClass(this.camera, this.renderer);

    const background = new BackgroundColor(this.scene);
    background.setSceneBackgroudColor();

    this.render();
  }

  render() {
    requestAnimationFrame(() => this.render());
    this.controls.update();

    this.renderer.render(this.scene, this.camera);
  }
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
