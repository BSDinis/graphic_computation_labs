/**
 * scene.js
 *
 * define the scene class
 *
 *
 */


class Scene {
  constructor(wireframe) {
    this.scene = new THREE.Scene();
  }

  getAspect() {
    return this.getWidth() / this.getHeight();
  }

  getWidth() {
    return 1000;
  }

  getHeight() {
    return 1000;
  }

  getDepth() {
    return 1000;
  }

  updateScene(delta, arrows) {
  }
}
