// in store.js of waar je je stores definieert
import { defineStore } from 'pinia';
import { floorObject } from '../threemain/world/floor';
import { Scene } from 'three';
import GUI from 'lil-gui';

const floor = new  floorObject(Scene)
const status = floor.getStatus();

const gui = new GUI
gui.add(status, 'visible').onChange(function(value){
    floor.mesh.visible = value;

})