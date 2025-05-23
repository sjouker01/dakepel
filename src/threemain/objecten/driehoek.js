import * as THREE from "three";
import { useMenuStore } from "../../server/menustore";



export class Driehoek {
  constructor(scene) {
    this.store = useMenuStore();

    this.geometrie = new THREE.BufferGeometry();
    this.scaleFactor = 1000;
    this.hoogte = this.store.hoogte / this.scaleFactor + 0.4;
    this.group = new THREE.Group();

    this.vertices = new Float32Array([
      // links driehoek buitekant
      -0.1, 0,  0, // Vertex 1
    -0.1, 1, 1, // Vertex 2
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

    this.textureIsToegepast = false;


    this.textureLoader = new THREE.TextureLoader();
    // Stel een initiële texture state in, bijvoorbeeld 'red-wall.jpg'

    // Aanname: balkenDriehoek is al gedefinieerd
    

     this.balkMaterial = new THREE.MeshStandardMaterial({color: 0xFFFFFF})
    this.meshmaken = new THREE.Mesh(this.balkLinksVoorKant, this.balkMaterial);
    
    const Texture = this.textureLoader.load("../blender/walll.jpg");
    Texture.wrapS = THREE.RepeatWrapping
    Texture.wrapT = THREE.RepeatWrapping

    this.material = new THREE.MeshBasicMaterial({ map: Texture})
    this.balkenDriehoek = new THREE.Mesh(this.geometrie, this.material);
    this.updateColor();
    this.balkenDriehoek.position.z = 0.1;
  
    this.balkenDriehoek.scale.set(1, this.hoogte, 1);

    this.group.add(this.meshmaken, this.balkenDriehoek , );

    // Voeg de groep toe aan de scene
    scene.add(this.group);
  }

   

  updateColor() {
    const newColor = new THREE.Color(this.store.color);


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
  updateTexture() {
    const store = useMenuStore(); // Gebruik de store binnen de methode
    let texturePath;
    switch (store.textureName) {
      case 'gray':
        texturePath = '../blender/gray-wall.jpg';
        break;
      case 'blue':
        texturePath = '../blender/blue-wall.jpg';
        break;
      case 'green':
        texturePath = '../blender/green-wall.jpg';
        break;
      case 'hout':
        texturePath = '../blender/hout-wall.jpg';
        break;
      default:
        texturePath = '../blender/hout-wall.jpg';
    }
  
    const texture = new THREE.TextureLoader().load(texturePath, (tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      // Pas de repeat aan op basis van de hoogte en lengte van het object
      
      tex.repeat.y = this.hoogte * 1
      tex.needsUpdate = true;
    });
  
    this.material.map = texture;
    this.material.needsUpdate = true; // Zorg ervoor dat de texture update
  }

}