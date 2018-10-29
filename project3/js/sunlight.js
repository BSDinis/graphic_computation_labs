/*
 * sunlight, abstract parameters
 */

const colour = 0xffffff
const intensity = 0.5

class SunLight {
  constructor(parentObj) {
    this.light = new THREE.DirectionalLight(colour, intensity);
    parentObj.add(this.light);
  }
}
