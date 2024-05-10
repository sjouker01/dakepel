import * as THREE from "three";

export class Lamp {
  constructor(scene) {
    this.scene = scene;

    const light1 = new THREE.DirectionalLight("white", 1);
    const light2 = new THREE.DirectionalLight("white", 1);
    const light3 = new THREE.DirectionalLight("white", 1);
    const light4 = new THREE.DirectionalLight("white", 1); // Nieuw licht
    const light5 = new THREE.DirectionalLight("white", 1); // Nieuw licht
    
    light1.position.set(0, 6, 5);
    light2.position.set(0, 6, -5);
    light3.position.set(0, 6, 0);
    light4.position.set(10, 6, 0); // Positie voor het nieuwe licht
    light5.position.set(-10, 6, 0); // Positie voor het nieuwe licht
    
    light1.castShadow = true;
    light2.castShadow = true;
    light3.castShadow = true;
    light4.castShadow = true; // Schakel schaduwen in voor het nieuwe licht
    light5.castShadow = true; // Schakel schaduwen in voor het nieuwe licht

    // configureer de schaduw
    light1.shadow.mapSize.width = 512;
    light2.shadow.mapSize.width = 512;
    light3.shadow.mapSize.width = 512;
    light4.shadow.mapSize.width = 512; // Configureer schaduw voor het nieuwe licht
    light5.shadow.mapSize.width = 512; // Configureer schaduw voor het nieuwe licht
    
    light1.shadow.mapSize.height = 512;
    light2.shadow.mapSize.height = 512;
    light3.shadow.mapSize.height = 512;
    light4.shadow.mapSize.height = 512; // Configureer schaduw voor het nieuwe licht
    light5.shadow.mapSize.height = 512; // Configureer schaduw voor het nieuwe licht
    
    light1.shadow.camera.near = 0.5;
    light2.shadow.camera.near = 0.5;
    light3.shadow.camera.near = 0.5;
    light4.shadow.camera.near = 0.5; // Configureer schaduw voor het nieuwe licht
    light5.shadow.camera.near = 0.5; // Configureer schaduw voor het nieuwe licht

    light1.shadow.camera.far = 500;
    light2.shadow.camera.far = 500;
    light3.shadow.camera.far = 500;
    light4.shadow.camera.far = 500; // Configureer schaduw voor het nieuwe licht
    light5.shadow.camera.far = 500; // Configureer schaduw voor het nieuwe licht

    this.scene.add(light1);
    this.scene.add(light2);
    this.scene.add(light3);
    this.scene.add(light4); // Voeg het nieuwe licht toe aan de scene
    this.scene.add(light5); // Voeg het nieuwe licht toe aan de scene

    this.light1 = light1;
    this.light2 = light2;
    this.light3 = light3;
    this.light4 = light4; // Bewaar een referentie naar het nieuwe licht
    this.light5 = light5; // Bewaar een referentie naar het nieuwe licht
    
    const helper = new THREE.DirectionalLightHelper(light1, 5);
    const helper1 = new THREE.DirectionalLightHelper(light2, 5);
    const helper2 = new THREE.DirectionalLightHelper(light3, 5);
    const helper3 = new THREE.DirectionalLightHelper(light4, 5); // Helper voor het nieuwe licht
    const helper4 = new THREE.DirectionalLightHelper(light5, 5); // Helper voor het nieuwe licht
    
    // this.scene.add(helper);
    // this.scene.add(helper1);
    // this.scene.add(helper2);
    this.scene.add(helper3); // Voeg de helper toe aan de scene
    this.scene.add(helper4); // Voeg de helper toe aan de scene
  }

  getLight() {
    return [this.light1, this.light2, this.light3, this.light4, this.light5]; // Voeg de nieuwe lichten toe aan de return array
  }
}