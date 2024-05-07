import * as THREE from "three";
import { KozijnParts } from "./FileLoader";
import { useMenuStore } from "../../server/menustore";
import { texture } from "three/examples/jsm/nodes/Nodes.js";

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
    this.textures = {};
    this.middelBar = ["balk-midden"];
    this.zijBalken = ["balk-links", "balk-rechts"];
    this.bovenOnderBalken = ["balk-boven", "balk-onder"];
    this.scaleFactor = 1000;
    this.LoadWindow();
  }
  LoadWindow() {
    this.objectNamen.forEach((name) => {
      this.KozijnParts.loadObject(name, (object) => {
        if (object instanceof THREE.Mesh) {
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
    this.MiddleBarUpdate();
  }

  updateBreedte() {
    this.breedte = this.KozijnStore.breedte / this.scaleFactor;
    this.bovenOnderBalken.forEach((bar) => {
      this.objects[bar].scale.x = this.breedte;
    });

    this.zijBalken.forEach((bar) => {
      let richting;
      if (bar === "balk-links") {
        richting = 1;
      } else {
        richting = -1;
      }
      console.log(richting);
      this.objects[bar].position.x =
        richting * (this.breedte / 2 - this.objects[bar].scale.x / 2);
      console.log(this.objects[bar].position.x);
    });
    this.MiddleBarUpdate();
  }

  MiddleBarUpdate() {
    const aantalMiddenBalken = Math.max(
      0,
      Math.floor(this.objects["balk-onder"].scale.x) - 1
    );
    const maxBreendte = this.objects["balk-onder"].scale.x;
    const zijBalkAfstand = this.objects["balk-links"].scale.x;
    const beschikbareBreedte = maxBreendte - 2 * zijBalkAfstand;
    const ruimteTussenObjects = beschikbareBreedte / (aantalMiddenBalken + 1);
    const balkLengte = this.objects["balk-links"].scale.y;

    // midde balken toevoegen
    for (let i = 0; i < aantalMiddenBalken; i++) {
      this.KozijnParts.loadObject("balk-midden", (object) => {
        const cloneMiddleBar = object.clone();
        cloneMiddleBar.position.x =
          -maxBreendte / 2 + zijBalkAfstand + ruimteTussenObjects * (i + 1);
        cloneMiddleBar.scale.y = balkLengte;
        this.objects["balk-midden"].push(cloneMiddleBar);
        this.scene.add(cloneMiddleBar);
      });
    }
    // object reseten
    this.objects["balk-midden"] = [];

    // Verwijder bestaande middenbalken
    this.objects["balk-midden"].forEach((balk) => {
      balk.geometry.dispose();
      balk.material.dispose();
      this.scene.remove(balk);
    });
  }
}
