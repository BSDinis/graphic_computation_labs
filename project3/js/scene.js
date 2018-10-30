/**
 * scene.js
 *
 * define the scene class
 */

class Scene {
  constructor() {
    this.scene = new THREE.Scene();
    this.plane = new Plane(100, 0x33ff22, this.scene);
    var dim = {width: this.getWidth(), height: this.getHeight(), depth: this.getDepth()};
    this.sunlight = new SunLight(this.scene, dim);
  }

  getAspect() {
    return this.getWidth() / this.getHeight();
  }

  getWidth() {
    // FIXME
    return this.plane.getWidth() * 1.15;
  }

  getHeight() {
    // FIXME
    return this.plane.getHeight() * 1.15;
  }

  getDepth() {
    // FIXME
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
