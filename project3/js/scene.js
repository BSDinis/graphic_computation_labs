/**
 * scene.js
 *
 * define the scene class
 */

const object_factor = 50
const base_factor =  200

class Scene {
  constructor(wireframe) {
    this.scene = new THREE.Scene();
    this.base = new Base(base_factor, wireframe, 0xff6666, this.scene);
    this.plane = new Plane(object_factor, wireframe, this.scene);
    this.plane.obj.position.y += this.plane.getDepth() / 2
    var dim = {width: this.getWidth(), height: this.getHeight(), depth: this.getDepth()};
    this.sunlight = new SunLight(this.scene, dim);
    this.ambientlight = new THREE.AmbientLight(0xffffff)
    this.scene.add(this.ambientlight)
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
      this.plane.obj.rotateX(angle * delta);
    }
    if (arrows.down) {
      this.plane.obj.rotateX(- angle * delta);
    }
    if (arrows.left) {
      this.plane.obj.rotateY(+ angle * delta);
    }
    if (arrows.right) {
      this.plane.obj.rotateY(- angle * delta);
    }
  }
}
