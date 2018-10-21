/**
 * scene.js
 *
 * define the scene class
 */

class Scene {
  constructor() {
    // public
    this.scene = new THREE.Scene();

    this.ring = new Ring(100, 0xff0000, this.scene);
    /*
    this.ballArr = [];    
    for (var i = 0; i < 10; i++) {
      this.ballArr[i] = new Ball(this.ring.getDepth()/2, 0xff00000, this.scene);
    }
    */
  }

  getAspect() {
    return this.getWidth() / this.getHeight();
  }

  getWidth() {
    return this.ring.getWidth() * 1.15;
  }

  getHeight() {
    return this.ring.getHeight() * 1.15;
  }

  getDepth() {
    return this.ring.getDepth() * 1.15;
  }

  updateScene(delta) {
    // FIXME
  }
}
