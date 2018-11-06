/**
 * scene.js
 *
 * define the scene class
 */

const object_factor = 200
const base_factor =  200
const lamp_factor =  20

class Scene {
  constructor(wireframe) {
    this.scene = new THREE.Scene();
    this.base = new Base(base_factor, wireframe, 0x4455cc, this.scene);
    this.plane = new Plane(object_factor, wireframe, this.scene);
    this.plane.obj.position.y += this.plane.getDepth() / 2
    var dim = {width: this.getWidth(), height: this.getHeight(), depth: this.getDepth()};
    this.sunlight = new SunLight(this.scene, dim);

    this.post = []
    let n = 4
    for (var i = 0; i < n; i++) {
      var x = .5 * base_factor * Math.cos(Math.PI/n + 2 * Math.PI/n * i)
      var z = .5 * base_factor * Math.sin(Math.PI/n + 2 * Math.PI/n * i)
      this.post[i] = new Lamppost(lamp_factor, false, 0x333333, this.scene);
      this.post[i].obj.position.x = x;
      this.post[i].obj.position.z = z;
    }
  }

  getAspect() {
    return this.getWidth() / this.getHeight();
  }

  getWidth() {
    return this.base.getWidth() * 1.20;
  }

  getHeight() {
    return this.base.getHeight() * 1.20;
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

  toggleSunlight() {
    this.sunlight.toggle();
  }

  toggleLamp(n) {
    if (n < this.post.length)
      this.post[n].toggle();
  }

  toggleLightingCalc() {
    for (var i = 0; i < this.post.length; i++)
      this.post[i].toggleLightingCalc();
    this.base.toggleLightingCalc();
    this.plane.toggleLightingCalc();
  }

  togglePhongGouraud() {
    for (var i = 0; i < this.post.length; i++)
      this.post[i].togglePhongGouraud();
    this.base.togglePhongGouraud();
    this.plane.togglePhongGouraud();
  }
}
