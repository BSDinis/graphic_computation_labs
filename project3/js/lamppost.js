/*
 * lamppost
 */

const ccolour = 0xffffff
const iintensity = 1.0
const distance = 10
const angle = .91
const penumbra = .366
const decay = 1.5

class Lamppost {
  constructor(parentObj, posx, posy, posz) {
    this.spotlight = new THREE.SpotLight(ccolour, iintensity);
    this.spotlight.position.set(posx, posy, posz) ;
    this.spotlight.castShadow = true;


    this.spotlight.shadow.mapSize.width = 1024;
    this.spotlight.shadow.mapSize.height = 1024;

    this.spotlight.shadow.camera.near = 500;
    this.spotlight.shadow.camera.far = 4000;
    this.spotlight.shadow.camera.fov = 30;

    parentObj.add(this.spotlight);
  }
}
