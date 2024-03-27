import { RaamComponents } from "./mesh";


export class window1{ 
    constructor(scene){
        this.scene = scene;
        this.raamComponents = new RaamComponents();
        this.objects = {};

        const objectNames = ['balk-onder', 'balk-links', 'balk-rechts', 'balk-boven', 'kozijnplank-onder', 'kozijnplank-rechts', 'kozijnplank-links','kozijnplan-boven', 'kozijnplank-naarbinnen'];
        
        objectNames.forEach(name => {
            this.raamComponents.loadObject(name, (object) => { 
                object.position.y += 1; // Verhoog de y-positie van het object
                this.objects[name] = object;
                this.scene.add(object);

                // Voer de modifyObject methode uit binnen de callback
                if (name === 'balk-onder') {
                    this.modifyObject(name, (object) => {
                        object.position.y += 0; 
                    });
                }
                // Voer de modifyObject methode uit binnen de callback
                if (name === 'balk-rechts') {
                    this.modifyObject(name, (object) => {
                        object.position.y += 0; 
                    });
                }
                // Voer de modifyObject methode uit binnen de callback
                if (name === 'balk-links') {
                    this.modifyObject(name, (object) => {
                        object.position.y += 0; 
                    });
                }
                // Voer de modifyObject methode uit binnen de callback
                if (name === 'balk-boven') {
                    this.modifyObject(name, (object) => {
                        object.scale.x += 0; 
                    });
                }
            });
        });
    }

    modifyObject(name, modifyFunction) {
        if (this.objects[name]) {
            modifyFunction(this.objects[name]);
        }
    }

    veranderBreeteN(name ){
        
    }
}
