import { RaamComponents } from "./mesh";



export class window1{ 
    constructor(scene){
        const raamComponents = new RaamComponents();
        const objectNames = ['balk-onder', 'balk-links', 'balk-rechts', 'balk-boven', 'kozijnplank-onder', 'kozijnplank-rechts', 'kozijnplank-links','kozijnplan-boven', 'kozijnplank-naarbinnen'];

        objectNames.forEach(name => {
            raamComponents.loadObject(name, (object) => { 
                object.position.y += 1; // Verhoog de y-positie van het object
                
                scene.add(object);
            });
        });
    }
}
