/*
 * sunlight, abstract parameters
 */

const colour = 0xffffff
const intensity = 1.0

class SunLight {
  constructor(parentObj, dim) {
    this.light = new THREE.DirectionalLight(colour, intensity);
	this.light.position.set( dim.height, dim.width, dim.depth );
	this.light.castShadow = true;
    parentObj.add(this.light);
  }
}
