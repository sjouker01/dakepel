import * as THREE from "three";
import { useMenuStore } from "../../server/menustore";

export class Roof {
  constructor(scene) {
    this.store = useMenuStore();
    this.scene = scene;
    this.geometry = new THREE.BoxGeometry(1.1, 0.3, 1.1);

    this.hoogte = this.store.hoogte;
    this.width = this.breedte;
    this.materiaal = new THREE.MeshStandardMaterial({ color: 0x0000 });

    this.dak = new THREE.Mesh(this.geometry, this.materiaal);

    this.scaleFactor = 1000;
    

    this.scene.add(this.dak);
  }

  dakGrotenScaling() {
    
    const hoogte = this.store.hoogte / this.scaleFactor ;
    const breedte = this.store.breedte / this.scaleFactor ;
    const lengte = this.store.lengte / this.scaleFactor ;
    
    // x = breedte
    this.dak.scale.x = breedte + 1.2;

    // y is hoogte
    this.dak.position.y = hoogte / 2 + 0.35;
    

    //z is lengte
    this.dak.scale.z = lengte + 0.4;
    this.dak.position.z = lengte /2  - 0.1;
  }

 
}
