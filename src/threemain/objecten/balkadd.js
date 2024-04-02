import * as Three from "three";

export class BalkMidden {
  constructor(scene) {
    let geometrie = new Three.BoxGeometry(0.1, 1, 0.1);
    let materiaal = new Three.MeshBasicMaterial({ color: 0x808080 });

    let balkmidden = new Three.Mesh(geometrie, materiaal);

    // Voeg de balk toe aan de scène
    scene.add(balkmidden);
  }
}
