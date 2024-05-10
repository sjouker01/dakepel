import * as THREE from "three";
import { floorObject } from "./world/floor";
import { WindowKozijn } from "./objecten/kozijn";
import { BackgroundColor } from "./world/background";
import { OrbitControlsClass } from "./controles/control";
import { Camera } from "./camfile/camera";
import { Sizes } from "./camfile/sizes";
import { Lamp } from "./objecten/light";
import { Sneltoetsen } from "./controles/sneltoetsen";
import {DirectionalLight } from "three";
let instance = null;
export class ThreeJs {
  constructor(container) {
    if (!instance) {
      instance = this;
    }
    instance = this;
    window.ThreeJs = this;

    // scene toevoegen
    this.scene = new THREE.Scene();
    // size maken
    this.size = new Sizes();
    // camera maken
    this.camera = new Camera(this.size.width, this.size.height);
    // position van camera

    // groote van scherm doen
    window.addEventListener("resize", () => this.onWindowResize(), false);
    this.renderer = new THREE.WebGLRenderer({ canvas: container });
    this.renderer.setSize(this.size.width, this.size.height);
    document.body.appendChild(this.renderer.domElement);

    // object van de vloer
    const floor = new floorObject(this.scene);

    // store manier om windows teladen
    this.myWindow = new WindowKozijn(this.scene);
    

    // light object
    this.lamp = new Lamp(this.scene); // Instantieer de Lamp klasse

    // controls toe tevoegen
    this.controls = new OrbitControlsClass(this.camera, this.renderer);
    // achtergrond maken
    const background = new BackgroundColor(this.scene);
    background.setSceneBackgroudColor();

    // axses helper maken
    const axesHelper = new THREE.AxesHelper(20);
    this.scene.add(axesHelper);

    // sneltoetsen
    this.sneltoetsen = new Sneltoetsen(floor, axesHelper);
    floor.mesh.visible = this.sneltoetsen.isObjectVisible;
    // renderen
    this.render();
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
