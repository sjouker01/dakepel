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

    this.renderer = new THREE.WebGLRenderer({ canvas: container });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    const newfloor = new floorObject(this.scene);

    this.controls = new OrbitControlsClass(this.camera, this.renderer);

    console.log(newfloor);
    console.log(newfloor.mesh);

    const background = new BackgroundColor(this.scene);
    background.setSceneBackgroudColor();

    this.render();
  }

  render() {
    requestAnimationFrame(() => this.render());
    this.controls.update();

    this.renderer.render(this.scene, this.camera);
  }
}
