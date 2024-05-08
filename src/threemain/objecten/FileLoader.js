import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from 'three';

export class KozijnParts {
  constructor(scene) {
    this.scene = scene
    this.loader = new GLTFLoader
    this.objects = [];
  }


  
ladenobject(){
  this.loader.load(
    'blender/raam.gltf',
    function (gltf) {
      //If the file is loaded, add it to the scene
      object = gltf.scene;
      scene.add(object);
    },
    function (xhr) {
      //While it is loading, log the progress
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
      //If there is an error, log it
      console.error(error);
    }
  );
}
  
} 