import * as THREE from 'three'
import { useMenuStore } from '../../server/menustore'




export class Roof {
    constructor(scene){
        
        this.store = useMenuStore
        this.scene = scene 
        this.geometry = new THREE.BoxGeometry( 2,0.1 ,2)

        this.hoogt = this.store.hoogt
        this.width = this.breedte   
        this.materiaal = new THREE.MeshBasicMaterial({color: 0x0000})

        this.dak = new THREE.Mesh(this.geometry , this.materiaal)

        this.dak.position.set(0,0.75,0.6)   


        
        this.scene.add(this.dak)


    }
}