import * as THREE from "three";
import { useMenuStore } from "../../server/menustore";

export class Roof {
  constructor(scene) {
    this.store = useMenuStore();
    this.scene = scene;
    this.group = new THREE.Group();

    this.geometry = new THREE.BoxGeometry(1.1, 0.3, 1.1);

    this.hoogte = this.store.hoogte;
    this.width = this.breedte;
    //materiaal dak
    this.materiaal = new THREE.MeshStandardMaterial({ color: 0x0000 });

    this.dak = new THREE.Mesh(this.geometry, this.materiaal);

    this.materiaal1 = new THREE.MeshStandardMaterial({ color: 0xffffff });

    // rechts zijkant

    const cuberechts = new THREE.BoxGeometry(0.1, 0.4 , 2.1);

    this.cubezijkantrechts = new THREE.Mesh(cuberechts, this.materiaal1);
    // zij kant cube dak
    const cubezijkant = new THREE.BoxGeometry(0.1, 0.4, 2.1);


    this.zijkant = new THREE.Mesh(cubezijkant, this.materiaal1);
    // voor kant cube
    const balkvoorkant = new THREE.BoxGeometry(2.7, 0.4, 0.1);

    this.materiaal1 = new THREE.MeshStandardMaterial({ color: 0xffffff });

    // Maak de mesh
    this.voorkant = new THREE.Mesh(balkvoorkant, this.materiaal1);
    // scalefactor om te delen
    this.scaleFactor = 1000;
    // locatie voorkant
    this.voorkant.position.y = 0.9;
    this.voorkant.position.z = -0.4;
    // locatie zijkant
    this.zijkant.position.y = 0.9;
    this.zijkant.position.x = 1.4;
    this.zijkant.position.z = 0.6;

    // locatie balk rechts
    this.cubezijkantrechts.position.y = 0.9;
    this.cubezijkantrechts.position.z = 0.6;
    this.cubezijkantrechts.position.x = -1.4
    // group add
    this.group.add(this.dak, this.zijkant, this.voorkant,  this.cubezijkantrechts);

    this.scene.add(this.group);
  }

  dakGrotenScaling() {
    const hoogte = this.store.hoogte / this.scaleFactor;
    const breedte = this.store.breedte / this.scaleFactor;
    const lengte = this.store.lengte / this.scaleFactor;

    // x = breedte
    this.dak.scale.x = breedte + 1.2;

    // y is hoogte
    this.dak.position.y = hoogte / 2 + 0.35;

    //z is lengte
    this.dak.scale.z = lengte + 0.4;
    this.dak.position.z = lengte / 2 - 0.1;
  }
  addCubeVoorKant() {}

}
