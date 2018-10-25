/**
 * scene.js
 *
 * define the scene class
 */

class Scene {
  constructor() {
    // public
    this.scene = new THREE.Scene();
    this.example = new Example(100, 0x33ff22, this.scene);
  }

  getAspect() {
    return this.getWidth() / this.getHeight();
  }

  getWidth() {
    // FIXME
    return this.example.getWidth() * 1.15;
  }

  getHeight() {
    // FIXME
    return this.example.getHeight() * 1.15;
  }

  getDepth() {
    // FIXME
    return this.example.getDepth() * 1.15;
  }

  updateScene(delta) {
    // FIXME
  }
}