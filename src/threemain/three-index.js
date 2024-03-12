import * as THREE from 'three';

const MAX_WIDTH = 750;  // Maximale breedte
const MAX_HEIGHT = 600; // Maximale hoogte

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(MAX_WIDTH, MAX_HEIGHT);

class Experience {
  constructor() {
    this.scene = scene;
    this.renderer = renderer;
  }
}

export { Experience };