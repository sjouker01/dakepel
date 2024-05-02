import * as THREE from "three";
import { floorObject } from "./world/floor";
import { WindowKozijn} from "./objecten/kozijn";
import { BackgroundColor } from "./world/background";
import { OrbitControlsClass } from "./controles/control";
import { Camera } from "./camfile/camera";
import { Sizes } from "./camfile/sizes";
import { lamp1 } from "./objecten/light";
import { Sneltoetsen } from "./controles/sneltoetsen";

let instance = null;
export class ThreeJs {
  constructor(container) {
    if (instance) {
      return instance;
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
    let lamp = new lamp1();
    let lights = lamp.getLight();
    // lamp keuze
    let light1 = lights[0];
    let light2 = lights[1];
    // toevoegen aan scene
    this.scene.add(light1);
    this.scene.add(light2);
    // helpers van lichten
    const helper1 = new THREE.DirectionalLightHelper(light1, 5);
    const helper2 = new THREE.DirectionalLightHelper(light2, 5);

    //onzigbaar
    helper1.visible = false;
    helper2.visible = false;

    //toevoegen aan scene
    this.scene.add(helper1);  
    this.scene.add(helper2);

    // controls toe tevoegen
    this.controls = new OrbitControlsClass(this.camera, this.renderer);
    // achtergrond maken
    const background = new BackgroundColor(this.scene);
    background.setSceneBackgroudColor();

    // axses helper maken
    const axesHelper = new THREE.AxesHelper(20);
    this.scene.add(axesHelper);

    // sneltoetsen
    this.sneltoetsen = new Sneltoetsen(floor, axesHelper, helper1, helper2);
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
