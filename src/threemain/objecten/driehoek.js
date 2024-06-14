import * as THREE from "three";
import { useMenuStore } from "../../server/menustore";
import { WindowKozijn } from "./kozijn";
import { ThreeJs } from "../three-index";
import { Mutation } from "quasar";
import { texture } from "three/examples/jsm/nodes/Nodes.js";

export class Driehoek {
  constructor(scene) {
    this.store = useMenuStore();

    this.geometrie = new THREE.BufferGeometry();
    this.scaleFactor = 1000;
    this.hoogte = this.store.hoogte / this.scaleFactor + 0.4;
    this.group = new THREE.Group();

    this.vertices = new Float32Array([
      // links driehoek buitekant
      -0.1,
      0,
      0, // Vertex 1
      -0.1,
      1,
      1, // Vertex 2
      -0.1,
      1,
      0, // Vertex 3

      // // rechter buiten kant
      0.1,
      0,
      0, // Vertex 4
      0.1,
      1,
      0, // Vertex 5
      0.1,
      1,
      1, // Vertex 6

      // // links boven driehoek
      -0.1,
      1,
      0, // Vertex 4
      -0.1,
      1,
      1, // Vertex 5
      0.1,
      1,
      1, // Vertex 6

      // rechts boven driehoek
      0.1,
      1,
      0, // Vertex 8
      -0.1,
      1,
      0, // Vertex 7
      0.1,
      1,
      1, // Vertex 9

      //schuin droe hoek 1
      0.1,
      0,
      0, // Vertex 10
      0.1,
      1,
      1, // Vertex 11
      -0.1,
      0,
      0, // Vertex 12

      // schuin driehoek 2
      -0.1,
      0,
      0, // Vertex 10
      0.1,
      1,
      1, // Vertex 11 f
      -0.1,
      1,
      1, // Vertex 12
    ]);

    this.uvs = new Float32Array([
      // links driehoek buitekant (left triangle outside)
      0.5, 0,
       0, 1, 0, 1,

      // rechter buiten kant (right side outside)
      0.5, 0, 0, 1, 0, 1,
    ]);
    this.balkLinksVoorKant = new THREE.BoxGeometry(0.2, 1, 0.2);

    this.textureLoader = new THREE.TextureLoader();

    // Maak een nieuw attribuut voor de vertices en voeg het toe aan de geometrie
    this.geometrie.setAttribute(
      "position",
      new THREE.BufferAttribute(this.vertices, 3, true)
    );
    this.geometrie.setAttribute(
      "uv",
      new THREE.BufferAttribute(this.uvs, 2, true)
    );

    this.textureIsToegepast = false; // Voeg deze regel toe

    this.meshmaken = new THREE.Mesh(this.balkLinksVoorKant);


    this.updateColor();
    
    const Texture = this.textureLoader.load("../blender/walll.jpg");
    Texture.wrapS = THREE.RepeatWrapping
    Texture.wrapT = THREE.RepeatWrapping

    this.material = new THREE.MeshBasicMaterial({ map: Texture})
    this.balkenDriehoek = new THREE.Mesh(this.geometrie, this.material);
    
    this.balkenDriehoek.position.z = 0.1;

    this.balkenDriehoek.scale.set(1, this.hoogte, 1);

    this.group.add(this.meshmaken, this.balkenDriehoek);

    // Voeg de groep toe aan de scene
    scene.add(this.group);
  }

   

  updateColor() {
    const newColor = this.store.color;
    if (this.meshmaken && this.meshmaken.material) {
      this.meshmaken.material.color.set(newColor);
    }
  }

  gradenCalculatie() {
    this.graden = this.store.graden;
    this.hoogte = this.store.hoogte / 1000 + 0.4;
    this.balkenDriehoek.material.map.repeat.y = this.hoogte * 1
    const radians = (90 - this.graden) * (Math.PI / 180);
    this.breedte = this.store.breedte / this.scaleFactor;
    this.lengte = (this.hoogte * Math.sin(radians)) / Math.cos(radians);
    this.store.lengte = this.lengte * this.scaleFactor;
    console.log(this.lengte);
    console.log(this.graden);
    console.log(radians);
    // Gebruik graden om de scale te bepalen
    this.balkenDriehoek.scale.y = this.hoogte;
    this.meshmaken.scale.y = this.hoogte;
    this.balkenDriehoek.position.y = -this.hoogte + this.hoogte / 2;
    this.balkenDriehoek.scale.z = this.lengte;
    let richting;
    if (this.group.position.x > 0) {
      richting = 1;
    } else {
      richting = -1;
    }
    this.group.position.x = richting * (this.breedte / 2 + 0.3);
  }
}
