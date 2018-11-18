/* directional light
 */

const colour = 0xffffff
const intensity = 0.5

class DirLight {
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
