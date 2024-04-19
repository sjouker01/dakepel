import { RaamComponents } from "./mesh";
import { useMenuStore } from "/Users/sjouk/OneDrive/Bureaublad/stage-github/dakepel/src/server/menustore"; // Vervang dit met het juiste pad
import * as THREE from "three";


export class window1 {
  constructor(scene) {
    this.scene = scene;
    this.raamComponents = new RaamComponents();
    this.objects = {};
    this.menuStore = useMenuStore();
    this.objectNames = ["balk-onder", "balk-links", "balk-rechts", "balk-boven"];
    this.loadObjects();
    this.raamComponents.loadObject(name, (object) => {
      this.objects[name] = object;
      this.scene.add(object);
      if (name === "balk-onder" || name === "balk-boven") {
        this.modifyObject(name, this.modifyCallback);
      }
    });
  }

  loadObjects() {
    this.objectNames.forEach((name) => {
      this.raamComponents.loadObject(name, (object) => {
        console.log(`Object ${name} loaded`, object);
        this.objects[name] = object;
        this.scene.add(object);
        if (name === "balk-onder" || name === "balk-boven") {
          if (typeof this.modifyCallback === 'function') {
            this.modifyObject(name, this.modifyCallback);
          } else {
            console.error('Error: this.modifyCallback is not a function');
          }
        }
      });
    });
  }

  modifyObject(name, callback) {
    const object = this.objects[name];
    if (object) {
      callback(object, name);
      
    }
  }


  updateBreedte() {
    this.newWidth = this.menuStore.breedte;
    console.log(`New width: ${this.newWidth}`); // Voeg deze regel toe
    this.updateWindowWidth();
    this.updateSideBarsPosition();
    this.updateMiddleBars();
  }

  updateWindowWidth() {
    const objectsToUpdate = ["balk-boven", "balk-onder"];
    objectsToUpdate.forEach((objectName) => {
      this.updateObjectScaleX(objectName, this.newWidth);
    });
  }

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

  updateMiddleBarLengths() {
    if (this.objects["balk-midden"]) {
      const sideBarLength = this.objects["balk-links"].scale.y;
      for (let i = 0; i < this.objects["balk-midden"].length; i++) {
        this.objects["balk-midden"][i].scale.y = sideBarLength;
      }
    }
  }

  updateMiddleBars() {
    const numMiddleBars = Math.max(
      0,
      Math.floor(this.objects["balk-onder"].scale.x) - 1
    );
    if (this.objects["balk-midden"]) {
      this.removeMiddleBars();
    }
    if (this.objects["balk-onder"].scale.x >= 2) {
      this.addMiddleBars(numMiddleBars);
    }
    this.updateMiddleBarLengths();
  }

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
          clonedObject.position.x =
            -totalWidth / 2 + sideBarWidth + spacing * (i + 1);
          clonedObject.scale.y = sideBarLength;
          this.objects["balk-midden"].push(clonedObject);
          this.scene.add(clonedObject);
        } else {
          console.error('Het laden van het object "balk-midden" is mislukt');
        }
      });
    }
  }

  updateHoogte() {
    this.newHeight = this.menuStore.hoogte;
    this.updateObjectScaleY("balk-links", this.newHeight);
    this.updateObjectScaleY("balk-rechts", this.newHeight);
    this.updateMiddleBarLengths();

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

  updateObjectScaleY(name, newHeight) {
    if (this.objects[name]) {
      this.objects[name].scale.y = newHeight / 1000;
    }
    this.updateMiddleBarLengths();
  }

  updateObjectScaleX(name, newWidth) {
    if (this.objects[name]) {
      this.objects[name].scale.x = newWidth / 1000;
    }
  }

  updateColor() {
    const newColor = this.menuStore.color;
    Object.values(this.objects).forEach((object) => {
      if (object && object.material) {
        object.material.color.set(newColor);
      }
    });
  }

  loadTextureAndApplyToObject(objectName, textureUrl) {
    // Maak een nieuwe TextureLoader
    const textureLoader = new THREE.TextureLoader();
  
    // Laad de textuur
    textureLoader.load(textureUrl, (texture) => {
      // Zoek het object
      const object = this.scene.getObjectByName(objectName);
  
      if (object) {
        // Voeg de textuur toe aan het materiaal van het object
        object.material.map = texture;
        object.material.needsUpdate = true;
      }
    });
  }
  
}

