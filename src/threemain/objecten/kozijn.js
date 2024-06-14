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
      "muur-rechts-voorkant",
      "muur-onder-voorkant",
      "muur-boven-voorkant",
      "muur-links-voorkant",
      // "balk-schuin-links",
      // "balk-zijkant-links",
      // "balk-schuin-rechts",
      // "balk-zijkant-rechts",
    ];
    this.textures = {};
    this.middelBar = ["balk-midden"];
    this.zijBalken = [
      "balk-links",
      "balk-rechts",
      "muur-rechts-voorkant",
      "muur-links-voorkant",
    ];
    this.bovenOnderBalken = [
      "balk-boven",
      "balk-onder",
      "muur-boven-voorkant",
      "muur-onder-voorkant",
    ];



    this.scaleFactor = 1000;
    this.LoadWindow();
  }

  LoadWindow() {
    this.objectNamen.forEach((name) => {
      this.KozijnParts.loadObject(name, (object) => {
        if (object instanceof THREE.Mesh) {
          this.objects[name] = object
          this.scene.add(object)
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
      if (bar.includes("muur")) {
        this.objects[bar].scale.y += 0.4;
      }
    });

    this.bovenOnderBalken.forEach((bar) => {
      let richting;
      if (bar === "balk-boven" || bar === "muur-boven-voorkant") {
        richting = 1;
      } else {
        richting = -1;
      }
      console.log(richting);
      this.objects[bar].position.y =
        richting * (this.hoogte / 2 - this.objects[bar].scale.y / 2);
      if (bar.includes("muur")) {
        this.objects[bar].position.y += richting * 0.2;
      }
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
      if (bar === "balk-links" || bar === "muur-links-voorkant") {
        richting = 1;
      } else {
        richting = -1;
      }
      console.log(richting);
      this.objects[bar].position.x =
        richting * (this.breedte / 2 - this.objects[bar].scale.x / 2);
      if (bar.includes("muur")) {
        this.objects[bar].position.x += richting * 0.2;
      }
    });
    this.MiddleBarUpdate();
  }

  MiddleBarUpdate() {
    // Controleer of this.objects["balk-midden"] bestaat, zo niet, initialiseer het als een lege array
    if (!this.objects["balk-midden"]) {
      this.objects["balk-midden"] = [];
    }

    // Verwijder bestaande middenbalken
    this.objects["balk-midden"].forEach((balk) => {
      balk.geometry.dispose();
      balk.material.dispose();
      this.scene.remove(balk);
    });

    // Maak de array leeg
    this.objects["balk-midden"] = [];

    // Bereken het aantal middenbalken dat moet worden toegevoegd
    const aantalMiddenBalken = Math.max(
      0,
      Math.floor(this.objects["balk-onder"].scale.x) - 1
    );

    // Bereken de beschikbare breedte voor de middenbalken
    const maxBreendte = this.objects["balk-onder"].scale.x;
    const zijBalkAfstand = this.objects["balk-links"].scale.x;
    const beschikbareBreedte = maxBreendte - 2 * zijBalkAfstand;
    const ruimteTussenObjects = beschikbareBreedte / (aantalMiddenBalken + 1);
    const balkLengte = this.objects["balk-links"].scale.y - 0.2;

    // Laad het object voor de middenbalk
    this.KozijnParts.loadObject("balk-midden", (object) => {
      // Voeg de middenbalken toe
      for (let i = 0; i < aantalMiddenBalken; i++) {
        const cloneMiddleBar = object.clone();
        cloneMiddleBar.position.x =
          -maxBreendte / 2 + zijBalkAfstand + ruimteTussenObjects * (i + 1);
        cloneMiddleBar.scale.y = balkLengte;
        this.objects["balk-midden"].push(cloneMiddleBar);
        this.scene.add(cloneMiddleBar);
      }
    });
  }


}
 