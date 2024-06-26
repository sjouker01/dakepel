import * as THREE from "three";
import { floorObject } from "./world/floor";
import { WindowKozijn } from "./objecten/kozijn";
import { BackgroundColor } from "./world/background";
import { Camera } from "./camfile/camera";
import { Sizes } from "./camfile/sizes";
import { Lamp } from "./objecten/light";
import { Sneltoetsen } from "./controles/sneltoetsen";
import { Driehoek } from "./objecten/driehoek";
import { Roof } from "./objecten/dak";
import { insidewall } from "./objecten/binnemur";

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
    // position van camera

    // groote van scherm doen
    window.addEventListener("resize", () => this.onWindowResize(), false);
    this.renderer = new THREE.WebGLRenderer({ canvas: container });
    this.renderer.setSize(this.size.width, this.size.height);
    document.body.appendChild(this.renderer.domElement);

    this.camera = new Camera(this.size.width, this.size.height, this.renderer);
    // object van de vloer
    const floor = new floorObject(this.scene);

    // drie hoek
    this.DriehoekLinks = new Driehoek(this.scene);

    this.DriehoekLinks.group.position.set(-1, 0, 0);
    this.DriehoekRechts = new Driehoek(this.scene);

    this.DriehoekRechts.group.position.set(1, 0, 0);
    this.DriehoekLinks.gradenCalculatie();
    this.DriehoekRechts.gradenCalculatie();
    this.DriehoekLinks.updateTexture();
    this.DriehoekRechts.updateTexture();


    this.insidewall = new insidewall(this.scene);
    this.insidewall.gradenCalculatie1();





    this.dak = new Roof(this.scene);
    this.dak.dakGrotenScaling();
    this.dak.addCubeVoorKant(); 
    this.dak.zijkantscaling(); 
    
    // store manier om windows teladen

    this.myWindow = new WindowKozijn(this.scene);
    this.myWindow.glassUpdate();
    

    // light object
    this.lamp = new Lamp(this.scene); // Instantieer de Lamp klasse

    const background = new BackgroundColor(this.scene);
    background.setSceneBackgroudColor();

    // axses helper maken
    const axesHelper = new THREE.AxesHelper(20);
    this.scene.add(axesHelper);

    // sneltoetsen
    this.sneltoetsen = new Sneltoetsen(floor, axesHelper, this.lamp);
    axesHelper.visible = false;
    floor.mesh.visible = this.sneltoetsen.isObjectVisible;
    // renderen
    this.render();
  }
  
  updateColorThree(){
    this.myWindow.updateColorKozijn(); // Bestaande logica
    // Update textures op basis van de nieuwe kozijnkleur
    this.DriehoekLinks.updateTexture();
    this.DriehoekRechts.updateTexture();
  }
  updateGraden() {
    this.DriehoekLinks.gradenCalculatie();
    this.DriehoekRechts.gradenCalculatie();
    this.DriehoekLinks.updateColor();
    this.DriehoekRechts.updateColor();
    this.dak.dakGrotenScaling();
    this.insidewall.gradenCalculatie1();
    this.dak.addCubeVoorKant();
    this.dak.zijkantscaling();
    this.myWindow.glassUpdate();

  }

  render() {
    requestAnimationFrame(() => this.render());
    this.camera.update();

    this.renderer.render(this.scene, this.camera.camera);
  }
  onWindowResize() {
    this.camera.instand.aspect = window.innerWidth / window.innerHeight;
    this.camera.instand.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
