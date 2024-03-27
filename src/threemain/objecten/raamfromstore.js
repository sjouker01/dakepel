import { RaamComponents } from "./mesh";
import { useMenuStore } from "/Users/sjouk/OneDrive/Bureaublad/stage-github/dakepel/src/server/menustore"; // Vervang dit met het juiste pad

export class window1{ 
    constructor(scene){
        this.scene = scene;
        this.raamComponents = new RaamComponents();
        this.objects = {};
        this.menuStore = useMenuStore(); // Voeg dit toe
        const objectNames = ['balk-onder', 'balk-links', 'balk-rechts', 'balk-boven'];
       
        objectNames.forEach(name => {
            this.raamComponents.loadObject(name, (object) => { 
                object.position.y += 1; // Verhoog de y-positie van het object
                this.objects[name] = object;
                this.scene.add(object);

                // Voer de modifyObject methode uit binnen de callback
                if (name === 'balk-onder' || name === 'balk-boven') {
                    this.modifyObject(name, (object) => {
                        // pinia store
                        this.menuStore.setObject(name, object); // Zet het object in de store
                        this.updateObjectScaleX(name, 1000); // Stel de breedte van het object in op 1000m
                       
                    });
                }
            });
        });
    }
    modifyObject(name, callback) {
        // Get the object
        const object = this.objects[name];

        // If the object exists, execute the callback with the object as an argument
        if (object) {
            callback(object);
        }
        
    }
  
   
    updateBreedte(){
        this.newWidth = this.menuStore.breedte;
        window.ThreeJs.myWindow.updateObjectScaleX('balk-boven', this.newWidth); 
        window.ThreeJs.myWindow.updateObjectScaleX('balk-onder', this.newWidth); 
        this.modifyObject('balk-links', (object) => {
            object.position.x = (this.objects['balk-onder'].scale.x / 2) - (object.scale.x / 2 ) +0.1;
        });
        this.modifyObject('balk-rechts', (object) => {
            object.position.x = -(this.objects['balk-onder'].scale.x / 2) + object.scale.x;
        });

    }
    updateObjectScaleX(name, newWidth) {
        if (this.objects[name]) {
          this.objects[name].scale.x = newWidth / 1000; // Set the scale to the new width
        }
        console.log(this.objects[name])
      }
}