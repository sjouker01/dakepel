import * as THREE from 'three';


export class Driehoek {
    constructor(scene){
        let geometrie = new THREE.BufferGeometry();
        let vertices = new Float32Array([
            0, 0, 0,  // Vertex 1
            0, 1.4, 0,  // Vertex 2
            1.5, 0, 0   // Vertex 3
        ]);

        // Maak een nieuw attribuut voor de vertices en voeg het toe aan de geometrie
        geometrie.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

        let materiaal = new THREE.MeshBasicMaterial({color: "black", side: THREE.DoubleSide});
        this.balkenDriehoek = new THREE.Mesh(geometrie, materiaal);
        
        this.balkenDriehoek.position.set(0.7,-0.7,-0.1); 
        this.balkenDriehoek.rotation.y = 1.5;   
        scene.add(this.balkenDriehoek)
    }
}