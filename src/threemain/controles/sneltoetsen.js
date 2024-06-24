

// dit is voor sneltoetsen 
/**
 * sneltoetsen zijn nu allen
 *  shift + alt + 0  om vloer aan uit tezetten
 *  shift + alt + 9 om axses helper aan uit te zetten 
 */
export class Sneltoetsen {
    constructor(floor, axesHelper, helper1, helper2){
        this.isObjectVisible = false;
        this.axesHelperVisible = false;
        this.lampHelpersVisible = false;
        

        window.addEventListener("keydown", (event) => {
            if (event.shiftKey && event.altKey && event.keyCode == 48) {
                this.isObjectVisible = !this.isObjectVisible;
                floor.mesh.visible = this.isObjectVisible;
               
            }
        });

        window.addEventListener("keydown", (event) => {
            if (event.shiftKey && event.altKey && event.keyCode == 57) {
                this.axesHelperVisible = !this.axesHelperVisible;
                axesHelper.visible = this.axesHelperVisible;
            }
        });

        window.addEventListener("keydown", (event) => {
            if (event.shiftKey && event.altKey && event.keyCode == 56) {
                this.lampHelpersVisible = !this.lampHelpersVisible;
                helper1.visible = this.lampHelpersVisible;
                helper2.visible = this.lampHelpersVisible;
                // helper3.visible = this.lampHelpersVisible;
            }
        });
    }
}    