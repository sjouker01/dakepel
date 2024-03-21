import { windowParts } from './raamfromstore';


export class MeshHandler {
    // constructor() {
    //     this.raamParts = new RaamParts();
    //     this.raamParts.loadModel();
    //     // console.log(this.raamParts)
    // }

    // getObjects() {
    //     let balkOnder = this.raamParts.getObject('balk-onder');
    //     let balkRechts = this.raamParts.getObject('balk-rechts');
    //     let balkLinks = this.raamParts.getObject('balk-links');
    //     let balkBoven = this.raamParts.getObject('balk-boven');
    //     let kozijnplankOnder = this.raamParts.getObject('kozijnplank-onder');
    //     let kozijnplankLinks = this.raamParts.getObject('kozijnplank-links');
    //     let kozijnplankRects =  this.raamParts.getObject('kozijnplank-rechts');
    //     let kozijnplankBoven = this.raamParts.getObject('kozijnplan-boven');
    //     let cube = this.raamParts.getObject('Cube')
    //     return { balkOnder, balkRechts, balkLinks, balkBoven, kozijnplankBoven, kozijnplankLinks,kozijnplankOnder,kozijnplankRects, cube };
    // }
    constructor() {
        this.windowParts = new windowParts();
    }
    printTranslation() {
        console.log(this.windowParts.translation);
    }

}   