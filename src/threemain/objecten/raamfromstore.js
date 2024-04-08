import { RaamComponents } from "./mesh";
import { useMenuStore } from "/Users/sjouk/OneDrive/Bureaublad/stage-github/dakepel/src/server/menustore"; // Vervang dit met het juiste pad
import * as THREE from "three";
export class window1 {
  constructor(scene) {
    this.scene = scene;
    this.raamComponents = new RaamComponents();
    this.objects = {};
    // store inladen
    this.menuStore = useMenuStore();
    // de namen van objects
    const objectNames = [
      "balk-onder",
      "balk-links",
      "balk-rechts",
      "balk-boven",
    ];

    // voor elk object  naam , laad het overeenkomstige object in . en de y positie dus dit geval de hoogte van object word verhoogt.
    objectNames.forEach((name) => {
      this.raamComponents.loadObject(name, (object) => {
        this.objects[name] = object;
        this.scene.add(object);

        // Voer de modifyObject methode uit binnen de callback
        if (name === "balk-onder" || name === "balk-boven") {
          this.modifyObject(name, (object) => {
            // pinia store
            this.menuStore.setObject(name, object); // Zet het object in de store
            this.updateObjectScaleX(name, 1000); // Stel de breedte van het object in op 1000m

            //verander kleur van het object
            object.material.color = new THREE.Color(this.menuStore.color);
          });
        }
      });
    });
  }

  // nethode om object wijzige 
  modifyObject(name, callback) {
    // Get the object
    const object = this.objects[name];

    // als object bestaat dan moet die de callback uitvoeren met de object argument
    if (object) {
      callback(object);
    }
  }


  // nethode om de breedte van de raam bij te werken 
  updateBreedte() {
    this.newWidth = this.menuStore.breedte;
    this.updateWindowWidth();
    this.updateSideBarsPosition();
    this.updateMiddleBars();
  }

  // manier om breedte van de zij balken te bij werken 
  updateWindowWidth() {
    const objectsToUpdate = ["balk-boven", "balk-onder"];
    objectsToUpdate.forEach((objectName) => {
      this.updateObjectScaleX(objectName, this.newWidth);
    });
  }

  // manier om de positie van de zij balken bij te werken
  updateSideBarsPosition() {
    const sideBars = ["balk-links", "balk-rechts"];
    sideBars.forEach((bar, index) => {
      this.modifyObject(bar, (object) => {
        const sign = index === 0 ? 1 : -1;
        object.position.x =
          sign * (this.objects["balk-onder"].scale.x / 2 - object.scale.x / 2);
      });
    });
  }

  // manier om de middelste balken bij te werken 
  updateMiddleBars() {
    const maxMiddleBars = 10; // Increase this value to load more bars  || dit moet naar front end
    const numMiddleBars = Math.min(
      Math.max(0, Math.floor(this.objects["balk-onder"].scale.x) - 1),
      maxMiddleBars
    );
  
    if (this.objects["balk-onder"].scale.x < 2 && this.objects["balk-midden"]) {
      this.removeMiddleBars();
    }
  
    if (this.objects["balk-onder"].scale.x >= 2) {
      this.addMiddleBars(numMiddleBars);
    }
  }

  // manier om middelste verwijderen
  removeMiddleBars() {
    this.objects["balk-midden"].forEach((bar) => {
      this.scene.remove(bar);
    });
    delete this.objects["balk-midden"];
  }
  // manier om de balken er bij te doen
  addMiddleBars(numMiddleBars) {
    this.objects["balk-midden"] = [];
    const totalWidth = this.objects["balk-onder"].scale.x;
    const sideBarWidth = this.objects["balk-links"].scale.x;
    const availableWidth = totalWidth - 2 * sideBarWidth;
    const spacing = availableWidth / (numMiddleBars + 1);
  
    // Get the length of the side bar
    const sideBarLength = this.objects["balk-links"].scale.y;
  
    for (let i = 0; i < numMiddleBars; i++) {
      this.raamComponents.loadObject("balk-midden", (object) => {
        if (object) {
          const clonedObject = object.clone();
          clonedObject.position.x = -totalWidth / 2 + sideBarWidth + spacing * (i + 1);
  
          // Set the length of the middle bar to match the side bar
          clonedObject.scale.y = sideBarLength;
  
          this.objects["balk-midden"].push(clonedObject);
          this.scene.add(clonedObject);
        } else {
          console.error('Failed to load "balk-midden" object');
        }
      });
    }
  }


  // de hoogte van object word ge update hier mee
  updateHoogte() {
    this.newHeight = this.menuStore.hoogte;
    this.updateObjectScaleY("balk-links", this.newHeight);
    this.updateObjectScaleY("balk-rechts", this.newHeight);

    // Adjust the y-position of "balk-boven" and "balk-onder"
    this.modifyObject("balk-boven", (object) => {
      object.position.y =
        this.objects["balk-rechts"].position.y +
        this.objects["balk-links"].scale.y / 2;
    });
    this.modifyObject("balk-onder", (object) => {
      object.position.y =
        this.objects["balk-links"].position.y -
        this.objects["balk-links"].scale.y / 2;
    });
  }
  // manier om de schaal van het object in de x richting bij te werken
  updateObjectScaleY(name, newHeight) {
    if (this.objects[name]) {
      this.objects[name].scale.y = newHeight / 1000; // Set the scale to the new height
    }
    console.log(this.objects[name]);
  }

// methode om de schaal van object in de x richting bij te werken 
  updateObjectScaleX(name, newWidth) {
    if (this.objects[name]) {
      this.objects[name].scale.x = newWidth / 1000; // Set the scale to the new width
    }
    console.log(this.objects[name]);
  }
// kleur bij werken  
  updateColor() {
    const newColor = this.menuStore.color;
    Object.values(this.objects).forEach((object) => {
      if (object && object.material) {
        object.material.color.set(newColor);
      }
    });
  }
}
