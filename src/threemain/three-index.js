import * as THREE from 'three';
import { floorObject } from './world/floor'
import { BackgroundColor } from './world/background'
import { Scene } from './camfile/scene'


export class ThreeJs {
  constructor(container, canvas ) {
    this.sceneInstance = new Scene(sizes);
    this.renderer = new THREE.WebGLRenderer({ canvas: canvas });
    this.renderer.setSize(container.offsetWidth, container.offsetHeight);

    // background color
    this.backgroundColor = new BackgroundColor(this.scene);
    this.backgroundColor.setSceneBackgroudColor();

    // floor object
    this.floor = new floorObject(this.scene);

    this.render();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}