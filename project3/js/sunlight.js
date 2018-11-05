/*
 * sunlight, abstract parameters
 */

const colour = 0xffffff
const intensity = 1.0

class SunLight {
  constructor(parentObj, dim) {
    this.light = new THREE.DirectionalLight(colour, intensity);
	this.light.position.set(10* dim.width, 55*dim.depth, 10* dim.height );
    this.light.castShadow = true;
    parentObj.add(this.light);
  }

  toggle() {
    this.light.visible = ! this.light.visible;
  }
}
