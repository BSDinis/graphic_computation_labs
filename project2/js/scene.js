/**
 * scene.js
 *
 * define the scene class
 */

class Scene {
  constructor() {
    // public
    this.scene = new THREE.Scene();

    this.ring = new Ring(500, 0xaaaaaa, this.scene);
    this.ballArr = [];    
    for (var i = 0; i < 10; i++) {
      this.ballArr[i] = new Ball(this.ring.getDepth()/2, 0xff00000, this.scene);
    }
  }

  getAspect() {
    this.ring.getAspect();
  }

  getWidth() {
    this.ring.getWidth();
  }

  getHeight() {
    this.ring.getHeight();
  }

  getDepth() {
    this.ring.getDepth();
  }
}
