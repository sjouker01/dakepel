import * as THREE from "three";
import { KozijnParts } from "./FileLoader";
import { useMenuStore } from "/Users/sjouk/OneDrive/Bureaublad/stage-github/dakepel/src/server/menustore";

export class WindowKozijn {
  constructor(scene) {
    this.scene = scene;
    this.KozijnParts = new KozijnParts();
    this.objects = {};
    this.KozijnStore = useMenuStore();
    this.objectNamen = [
      "balk-onder",
      "balk-rechts",
      "balk-links",
      "balk-boven",
    ];
    this.scaleFactor = 1000;
    this.LoadWindow();
  }

  LoadWindow() {
    this.objectNamen.forEach((name) => {
      this.KozijnParts.loadObject(name, (object) => {
        if (object instanceof THREE.Object3D) {
          this.objects[name] = object;
          this.scene.add(object);
        } else {
          console.error(
            ` Error: in het laden van ${name} of hij bestaad niet`,
            object
          );
        }
      });
    });
  }
  // max groote van raam
  MaxGroote(){
    const MaxGroote = 15;
    if (this.breedte > MaxGroote ){
      this.breedte = MaxGroote;
    }
    if (this.hoogte > MaxGroote){
      this.hoogte = MaxGroote
    }
  }
  HoogteKozijn(){
    this.newHoogte = Number(this.KozijnStore.hoogte) / this.scaleFactor; 
    if (this.objects['balk-links'] && this.objects['balk-rechts']){
      this.objects['balk-links'].scale.y = this.hoogte;
      this.objects['balk-rechts'].scale.y = this.hoogte;
    } else{
      console.log(" er is iets fout gegaan met veranderen van de hoogte")
    }
  }

  // hier mee haal de de maten van hoogte en breedte op uit store
  MmToMeter(){
    this.breedte /= this.scaleFactor;
    this.hoogte /= this.scaleFactor;
  }
  // hier word max groote van de raam bepaald
  maxKozijnGroote(){
    this.breedte = Number(this.KozijnStore.breedte);
    this.hoogte = Number(this.KozijnStore.hoogte);
    this.MmToMeter();
    this.MaxGroote();
    this.HoogteKozijn();
  }
  
}
