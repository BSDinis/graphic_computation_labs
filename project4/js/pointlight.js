/* point light
 */


class PointLight {

  constructor(parentObj, dim) {
    const colour = 0xffffff
    const intensity = 0.5
    const distance = 0.0  // infinite
    const decay = 2.0  // realistic
    this.light = new THREE.PointLight(colour, intensity, distance, decay);
    this.light.position.set(0.50* dim.width, 3*dim.depth, 0.50* dim.height );
    this.light.castShadow = true;
    parentObj.add(this.light);
  }

  toggle() {
    this.light.visible = ! this.light.visible;
  }
}
