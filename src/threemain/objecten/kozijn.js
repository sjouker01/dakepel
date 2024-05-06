import * as THREE from "three";
import { KozijnParts } from "./FileLoader";
import { useMenuStore } from "../../server/menustore";

export class WindowKozijn {
  constructor(scene) {
    this.scene = scene;
    this.KozijnParts = new KozijnParts();
    this.objects = {};
    this.KozijnStore = useMenuStore();
    this.objectNamen = [
      "balk-onder",
      "balk-rechts",
      "balk-links",
      "balk-boven",
    ];
    this.zijBalken = ["balk-links", "balk-rechts"];
    this.bovenOnderBalken = ["balk-boven", "balk-onder"];
    this.scaleFactor = 1000;
    this.LoadWindow();
  }

  LoadWindow() {
    this.objectNamen.forEach((name) => {
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

  
  updateHoogte() {
    this.hoogte = this.KozijnStore.hoogte / this.scaleFactor;

    this.zijBalken.forEach((bar) => {
      this.objects[bar].scale.y = this.hoogte;
    });

    this.bovenOnderBalken.forEach((bar) => {
      let richting;
      if (bar === "balk-boven") {
        richting = 1;
      } else {
        richting = -1;
      }
      console.log(richting);
      this.objects[bar].position.y =
        richting * (this.hoogte / 2 - this.objects[bar].scale.y / 2);
      console.log(this.objects[bar].position.y);
    });
  }
}
