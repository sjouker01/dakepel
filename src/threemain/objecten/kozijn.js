import * as THREE from "three";
import { KozijnParts } from "./FileLoader";
import { useMenuStore } from "/Users/sjouk/OneDrive/Bureaublad/stage-github/dakepel/src/server/menustore";

export class WindowKozijn {
  constructor(scene) {
    this.scene = scene;
    this.KozijnParts = new KozijnParts();
    this.objects = {};
    this.KozijnStore = useMenuStore();
    this.objectNamen = [
      "balk-onder",
      "balk-rechts",
      " balk-links",
      "balk-boven",
    ];
    this.scaleFactor = 1000;
    this.LoadWindow();
  }

  LoadWindow() {
    this.objectNames.forEach((name) => {
      this.KozijnParts.loadObject(name, (object) => {
        if (object instanceof THREE.Object3D) {
          this.objects[name] = object;
          this.scene.add(object);
        } else {
          console.error(
            ` Error: in het laden van ${name} of hij bestaad niet`,
            object
          );
        }
      });
    });
  }

  // hier mee haal de de maten van hoogte en breedte op uit store
  StoreMaten(){
    this.breedte = Number(this.KozijnStore.breedte);
    this.hoogte = Number(this.KozijnStore.hoogte);
  }
  MmToMeter(){
    this.breedte /= this.scaleFactor;
    this.hoogte /= this.scaleFactor;
  }

 
}
