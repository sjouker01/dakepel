import * as THREE from "three";
import { floorObject } from "./world/floor";
import { BackgroundColor } from "./world/background";
import { OrbitControlsClass } from "./controles/control";
import { raamObject } from "./objecten/raam";
import { Camera } from "./camfile/camera";
import { Sizes } from "./camfile/sizes";

export class ThreeJs {
  constructor(container) {
    this.scene = new THREE.Scene();
    this.size = new Sizes();
    this.camera = new Camera(this.size.width, this.size.height);

    window.addEventListener("resize", () => this.onWindowResize(), false);
    this.renderer = new THREE.WebGLRenderer({ canvas: container });

    this.renderer.setSize(this.size.width, this.size.height);
    document.body.appendChild(this.renderer.domElement);

    const floor = new floorObject(this.scene);

    floor.mesh.visible = false;

    const newraam = new raamObject(this.scene);

    this.controls = new OrbitControlsClass(this.camera, this.renderer);

    const background = new BackgroundColor(this.scene);
    background.setSceneBackgroudColor();
    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(axesHelper);
    this.render();

    window.addEventListener('keydown', function(event) {
      if (event.shiftKey && event.altKey && event.keyCode == 48) {
      console.log("test")
      }
      })
  
  }

  render() {
    requestAnimationFrame(() => this.render());
    this.controls.update();

    this.renderer.render(this.scene, this.camera.instand);
  }
  onWindowResize() {
    this.camera.instand.aspect = window.innerWidth / window.innerHeight;
    this.camera.instand.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
