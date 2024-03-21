import { useStore as useRaamStore } from '../server/threeStore';

export class windowParts{
    constructor(){
        this.storeRaam = useRaamStore();
        this.storeRaam.loadModel();
    }

    getObjects() {
        return this.storeRaam.getObjects();
    }

    convertScaleToMM(object) {
        this.storeRaam.convertScaleToMM(object);
    }
}