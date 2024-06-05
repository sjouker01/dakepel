import * as THREE from 'three';
import { useMenuStore } from "../../server/menustore";
import{ WindowKozijn} from "./kozijn"
import { ThreeJs } from '../three-index';

export class Driehoek {
    constructor(scene){

        this.store = useMenuStore();

        
        
        this.geometrie = new THREE.BufferGeometry();
        this.scaleFactor = 1000
        this.hoogte = (this.store.hoogte/ this.scaleFactor)  + 0.4;
        
      
        this.vertices = new Float32Array([
            // links driehoek buitekant
            -0.1, 0, 0,  // Vertex 1
            -0.1, 1, 1,   // Vertex 2
            -0.1, 1, 0,  // Vertex 3

            // // rechter buiten kant
            0.1, 0, 0,  // Vertex 4
            0.1, 1, 0,  // Vertex 5
            0.1, 1, 1,   // Vertex 6

            
            // // links boven driehoek
            -0.1, 1, 0,  // Vertex 4
            -0.1, 1, 1,  // Vertex 5
            0.1, 1, 1,   // Vertex 6

            // rechts boven driehoek
            0.1, 1, 0,  // Vertex 8
            -0.1, 1, 0,  // Vertex 7
            0.1, 1, 1,   // Vertex 9


            //schuin droe hoek 1 
            0.1, 0, 0,  // Vertex 10
            0.1, 1, 1,  // Vertex 11
            -0.1, 0, 0,   // Vertex 12


            // schuin driehoek 2
            -0.1, 0, 0,  // Vertex 10
            0.1, 1, 1,  // Vertex 11
            -0.1, 1, 1,   // Vertex 12
        ]);

        // Maak een nieuw attribuut voor de vertices en voeg het toe aan de geometrie
        this.geometrie.setAttribute('position', new THREE.BufferAttribute(this.vertices, 3,  true ));

        



        this.meshMateriaal = new THREE.MeshBasicMaterial({ color:0x0000  } );
        this.balkenDriehoek = new THREE.Mesh(this.geometrie, this.meshMateriaal);
        this.balkenDriehoek.scale.set(1,this.hoogte,1)


        // Verbind de overeenkomstige punten van de twee driehoeken
   


        // Maak een groep en voeg de driehoeken en de verbindingslijn toe
        this.groep = new THREE.Group();
        this.groep.add(this.balkenDriehoek);
      

        // Voeg de groep toe aan de scene
        scene.add(this.groep);
    }



    gradenCalculatie(){
        this.graden = this.store.graden  ;
        this.hoogte = this.store.hoogte / 1000 +0.4;
        const radians = (90 - this.graden ) * (Math.PI / 180);
        this.breedte = this.store.breedte / this.scaleFactor;
        this.lengte = this.hoogte * Math.sin(radians) / Math.cos(radians);

        console.log(this.lengte)
        console.log(this.graden)
        console.log(radians)
        // Gebruik graden om de scale te bepalen
        this.balkenDriehoek.scale.y = this.hoogte     
        this.balkenDriehoek.position.y = -this.hoogte + this.hoogte /2     
        this.balkenDriehoek.scale.z = this.lengte 
        let richting
        if(this.balkenDriehoek.position.x > 0){
            richting = 1 
        }  else {
            richting =  -1 
        }
        this.balkenDriehoek.position.x =
        richting * (this.breedte / 2  +0.1);
    }


}