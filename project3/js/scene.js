/**
 * scene.js
 *
 * define the scene class
 */

const object_factor = 200
const base_factor =  300

class Scene {
  constructor() {
    this.scene = new THREE.Scene();
    this.example = new Example(object_factor, 0x33ff22, this.scene);
    this.example.obj.position.y += this.example.getDepth() / 2
    this.base = new Base(base_factor, 0xff6666, this.scene);
    var dim = {width: this.getWidth(), height: this.getHeight(), depth: this.getDepth()};
    this.sunlight = new SunLight(this.scene, dim);
    this.ambientlight = new THREE.AmbientLight(0xffffff)
    this.scene.add(this.ambientlight)
  }

  getAspect() {
    return this.getWidth() / this.getHeight();
  }

  getWidth() {
    return this.base.getWidth() * 1.15;
  }

  getHeight() {
    return this.base.getHeight() * 1.15;
  }

  getDepth() {
    return this.example.getDepth() * 1.15;
  }

  updateScene(delta) {
    // FIXME
  }
}
