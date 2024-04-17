  import { RaamComponents } from "./mesh";
  import { useMenuStore } from "/Users/sjouk/OneDrive/Bureaublad/stage-github/dakepel/src/server/menustore"; // Vervang dit met het juiste pad
  import * as THREE from "three";
  export class window1 {
    constructor(scene) {
      this.scene = scene;
      this.raamComponents = new RaamComponents();
      this.objects = {};
      // Laden van de store
      this.menuStore = useMenuStore();
      // De namen van de objecten
      const objectNames = [
        "balk-onder",
        "balk-links",
        "balk-rechts",
        "balk-boven",
      ];

      // Voor elke objectnaam, laad het overeenkomstige object in. En de y-positie, in dit geval de hoogte van het object, wordt verhoogd.
      objectNames.forEach((name) => {
        this.raamComponents.loadObject(name, (object) => {
          this.objects[name] = object;
          this.scene.add(object);
          if (name === "balk-onder" || name === "balk-boven") {
            this.modifyObject(name, (object) => {
              this.menuStore.setObject(name, object);
              this.updateObjectScaleX(name, 1000);
            });
          }
        });
      });
    }

    // Methode om een object te wijzigen
    modifyObject(name, callback) {
      const object = this.objects[name];
      if (object) {
        callback(object);
      }
    }
    // Methode om de breedte van het raam bij te werken
    updateBreedte() {
      this.newWidth = this.menuStore.breedte;
      this.updateWindowWidth();
      this.updateSideBarsPosition();
      this.updateMiddleBars();
    }

    // Methode om de breedte van de zijbalken bij te werken
    updateWindowWidth() {
      const objectsToUpdate = ["balk-boven", "balk-onder"];
      objectsToUpdate.forEach((objectName) => {
        this.updateObjectScaleX(objectName, this.newWidth);
      });
    }

    // Methode om de positie van de zijbalken bij te werken
    updateSideBarsPosition() {
      const sideBars = ["balk-links", "balk-rechts"];
      sideBars.forEach((bar, index) => {
        this.modifyObject(bar, (object) => {
          const sign = index === 0 ? 1 : -1;
          object.position.x = sign * (this.objects["balk-onder"].scale.x / 2 - object.scale.x / 2);
        });
      });
    }

    // Methode om de lengte van de middelste balken bij te werken
    updateMiddleBarLengths() {
      if (this.objects["balk-midden"]) {
        const sideBarLength = this.objects["balk-links"].scale.y;
        for (let i = 0; i < this.objects["balk-midden"].length; i++) {
          this.objects["balk-midden"][i].scale.y = sideBarLength;
        }
      }
    }


    // Methode om de middelste balken bij te werken
    updateMiddleBars() {
      const numMiddleBars = Math.max(0, Math.floor(this.objects["balk-onder"].scale.x) - 1);
      if (this.objects["balk-midden"]) {
        this.removeMiddleBars();
      }
      if (this.objects["balk-onder"].scale.x >= 2) {
        this.addMiddleBars(numMiddleBars);
      }
      this.updateMiddleBarLengths();
    }

    // Methode om de middelste balken te verwijderen
    removeMiddleBars() {
      if (this.objects["balk-midden"]) {
        for (let i = 0; i < this.objects["balk-midden"].length; i++) {
          this.objects["balk-midden"][i].geometry.dispose();
          this.objects["balk-midden"][i].material.dispose();
          this.scene.remove(this.objects["balk-midden"][i]);
        }
        this.objects["balk-midden"] = [];
      }
    }

    addObjectToRaamComponents(name, object) {
      this.raamComponents.addObject(name, object);
    }
    // Methode om middelste balken toe te voegen
    addMiddleBars(numMiddleBars) {
      this.objects["balk-midden"] = [];
      const totalWidth = this.objects["balk-onder"].scale.x;
      const sideBarWidth = this.objects["balk-links"].scale.x;
      const availableWidth = totalWidth - 2 * sideBarWidth;
      const spacing = availableWidth / (numMiddleBars + 1);
      const sideBarLength = this.objects["balk-links"].scale.y;

      for (let i = 0; i < numMiddleBars; i++) {
        this.raamComponents.loadObject("balk-midden", (object) => {
          if (object) {
            const clonedObject = object.clone();
            clonedObject.position.x = -totalWidth / 2 + sideBarWidth + spacing * (i + 1);
            clonedObject.scale.y = sideBarLength;
            this.objects["balk-midden"].push(clonedObject);
            this.scene.add(clonedObject);
          } else {
            console.error('Het laden van het object "balk-midden" is mislukt');
          }
        });
      }
    }

    // Methode om de hoogte van het object bij te werken
    updateHoogte() {
      this.newHeight = this.menuStore.hoogte;
      this.updateObjectScaleY("balk-links", this.newHeight);
      this.updateObjectScaleY("balk-rechts", this.newHeight);
      this.updateMiddleBarLengths();

      this.modifyObject("balk-boven", (object) => {
        object.position.y = this.objects["balk-rechts"].position.y + this.objects["balk-links"].scale.y / 2;
      });
      this.modifyObject("balk-onder", (object) => {
        object.position.y = this.objects["balk-links"].position.y - this.objects["balk-links"].scale.y / 2;
      });
    }

    // Methode om de schaal van het object in de y-richting bij te werken
    updateObjectScaleY(name, newHeight) {
      if (this.objects[name]) {
        this.objects[name].scale.y = newHeight / 1000;
      }
      this.updateMiddleBarLengths();
    }

    // Methode om de schaal van het object in de x-richting bij te werken
    updateObjectScaleX(name, newWidth) {
      if (this.objects[name]) {
        this.objects[name].scale.x = newWidth / 1000;
      }
    }

    // Methode om de kleur bij te werken
    updateColor() {
      const newColor = this.menuStore.color;
      Object.values(this.objects).forEach((object) => {
        if (object && object.material) {
          object.material.color.set(newColor);
        }
      });
    }
    updatemateriaal() {
      const newMateriaal = this.menuStore.color;
      Object.values(this.objects).forEach((object) => {
        if (object && object.material) {
          object.material.color.set(newColor);
        }
      });
    }
  }
