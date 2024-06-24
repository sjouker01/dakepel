import * as THREE from 'three'
import { useMenuStore } from "../../server/menustore";

export class insidewall {
    constructor(scene) {
        // Note: Identical vertices for both triangles. If this is not intended, adjust accordingly.
        const verticesDriehoek1 = new Float32Array([
            0.1, 0, 0,
            0.1, 1, 0,
            0.1, 1, 1,
        ]);
        const verticesDriehoek2 = new Float32Array([
            0.1, 0, 0,
            0.1, 1, 0,
            0.1, 1, 1,
        ]);
        this.group = new THREE.Group();
        // Note: useMenuStore is used directly in a class. If this relies on React context, consider refactoring.
        this.store = useMenuStore();

        const geometry1 = new THREE.BufferGeometry();
        geometry1.setAttribute('position', new THREE.BufferAttribute(verticesDriehoek1, 3));
        const material1 = new THREE.MeshBasicMaterial({ color: 0xA1662F, side: THREE.DoubleSide });

        const geometry2 = new THREE.BufferGeometry();
        geometry2.setAttribute('position', new THREE.BufferAttribute(verticesDriehoek2, 3));
        const material2 = new THREE.MeshBasicMaterial({ color: 0xA1662F, side: THREE.DoubleSide });

        this.mesh1 = new THREE.Mesh(geometry1, material1);
        this.mesh2 = new THREE.Mesh(geometry2, material2);
        this.mesh1.position.x = 0.01;
        this.mesh2.position.x = 1.59;
        this.mesh1.position.z = 0.1;
        this.mesh2.position.z = 0.1;

        // Ensure this.store.hoogte is defined and has a sensible default.
        this.scaleFactor = 1000;
        this.hoogte = this.store.hoogte / this.scaleFactor;
      

        this.group.add(this.mesh1, this.mesh2 );

        // Voeg de groep toe aan de scene
        scene.add(this.group);
    }   


    gradenCalculatie1() {
        this.graden = this.store.graden;
        this.hoogte = this.store.hoogte / 1000 + 0.4;
        const radians = (90 - this.graden) * (Math.PI / 180);
        this.breedte = this.store.breedte / this.scaleFactor;
        this.lengte = (this.hoogte * Math.sin(radians)) / Math.cos(radians);
        this.store.lengte = this.lengte * this.scaleFactor;
     
        // Gebruik graden om de scale te bepalen
        this.mesh1.scale.y = this.hoogte;
        this.mesh2.scale.y = this.hoogte;
        this.mesh1.position.y = -this.hoogte + this.hoogte / 2;
        this.mesh2.position.y = -this.hoogte + this.hoogte / 2;
        this.mesh1.scale.z = this.lengte;
        this.mesh2.scale.z = this.lengte;
        let richting;
        if (this.group.position.x > 0) {
          richting = 1;
        } else {
          richting = -1;
        }
        this.group.position.x = richting * (this.breedte / 2 + 0.3);
      }
}