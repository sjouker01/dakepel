## 0.0.1

begin van project

---

## prolemen



##
voor later 


updateBreedte() {
  this.newWidth = this.menuStore.breedte;
  window.ThreeJs.myWindow.updateObjectScaleX("balk-boven", this.newWidth);
  window.ThreeJs.myWindow.updateObjectScaleX("balk-onder", this.newWidth);
  this.modifyObject("balk-links", (object) => {
    object.position.x =
      this.objects["balk-onder"].scale.x / 2 - object.scale.x / 2;
  });
  this.modifyObject("balk-rechts", (object) => {
    object.position.x =
      -(this.objects["balk-onder"].scale.x / 2) + object.scale.x / 2;
  });

  // If the new width is greater than 2, add a new bar in the middle
  if (this.newWidth > 2000) {
    this.raamComponents.loadObject("middle-bar", (object) => {
      object.position.y += 1; // Adjust the y-position of the object
      this.objects["middle-bar"] = object;
      this.scene.add(object);
    });
  }
}

ik kan dit gebruiken om dan om de 2 m een  nieuwe balk toete voegen 







___________________
##

als gat grooter is dan 1000 dan moet er een exstra balk komen 
vakken gelijke groote 
hoogte  moet mee gaan
