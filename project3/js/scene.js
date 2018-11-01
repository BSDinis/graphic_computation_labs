/**
 * scene.js
 *
 * define the scene class
 */

const object_factor = 200
const base_factor =  200

class Scene {
  constructor() {
    this.scene = new THREE.Scene();
    this.base = new Base(base_factor, 0xff6666, this.scene);
    this.plane = new Plane(100, 0x33ff22, this.scene);
    this.plane.obj.position.y += this.plane.getDepth() / 2
    var dim = {width: this.getWidth(), height: this.getHeight(), depth: this.getDepth()};
    this.sunlight = new SunLight(this.scene, dim);
    this.ambientlight = new THREE.AmbientLight(0xffffff, 0.1)
    this.scene.add(this.ambientlight)
    this.lamppos1t = new Lamppost(this.scene);
    this.lamppost2 = new Lamppost(this.scene);
    //transform
    this.lamppost3 = new Lamppost(this.scene);
    //transform
    this.lamppost4 = new Lamppost(this.scene);
    //transform
  }

  getAspect() {
    return this.getWidth() / this.getHeight();
  }

  getWidth() {
    return this.base.getWidth();
  }

  getHeight() {
    return this.base.getHeight();
  }

  getDepth() {
    return this.plane.getDepth() * 1.15;
  }

  updateScene(delta, arrows) {
    const angle = Math.PI/4;
    if (arrows.up) {
      this.plane.obj.rotateZ(angle * delta);
    }
    if (arrows.down) {
      this.plane.obj.rotateZ(- angle * delta);
    }
    if (arrows.left) {
      this.plane.obj.rotateY(+ angle * delta);
    }
    if (arrows.right) {
      this.plane.obj.rotateY(- angle * delta);
    }
  }
}
