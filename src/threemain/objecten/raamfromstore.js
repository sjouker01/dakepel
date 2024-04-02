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
        object.position.y += 1; // Verhoog de y-positie van het object
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
  modifyObject(name, callback) {
    // Get the object
    const object = this.objects[name];

    // als object bestaat dan moet die de callback uitvoeren met de object argument
    if (object) {
      callback(object);
    }
  }

  //deze zorg er voor dat breedte van de raam word aan gepast en zorgen dat de buitenbalken mee beweegd
  // nieuwe breedte word opgehaald uit store
  updateBreedte() {
    this.newWidth = this.menuStore.breedte;
    window.ThreeJs.myWindow.updateObjectScaleX("balk-boven", this.newWidth);
    window.ThreeJs.myWindow.updateObjectScaleX("balk-onder", this.newWidth);
    this.modifyObject("balk-links", (object) => {
      object.position.x =
        this.objects["balk-onder"].scale.x / 2 - object.scale.x / 2;
    });
    this.modifyObject("balk-rechts", (object) => {
      object.position.x =
        -(this.objects["balk-onder"].scale.x / 2) + object.scale.x / 2;
    });
  }
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

  updateObjectScaleY(name, newHeight) {
    if (this.objects[name]) {
      this.objects[name].scale.y = newHeight / 1000; // Set the scale to the new height
    }
    console.log(this.objects[name]);
  }

  updateObjectScaleX(name, newWidth) {
    if (this.objects[name]) {
      this.objects[name].scale.x = newWidth / 1000; // Set the scale to the new width
    }
    console.log(this.objects[name]);
  }

  updateColor() {
    const newColor = this.menuStore.color;
    Object.values(this.objects).forEach((object) => {
      if (object && object.material) {
        object.material.color.set(newColor);
      }
    });
  }
}
