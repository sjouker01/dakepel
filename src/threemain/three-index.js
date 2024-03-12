import * as THREE from 'three';

export class ThreeJs {
  constructor(container, canvas) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({ canvas: canvas });
    this.renderer.setSize(container.offsetWidth, container.offsetHeight);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    this.render();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}