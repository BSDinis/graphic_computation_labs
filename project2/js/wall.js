/*
 * ring.js
 *
 * define ring class
 */

class Ring {
  class Base {
    constructor(factor, inputColor, parentObj) {
    }
  }

  const dimensions = {
    width: .5,
    height: .25,
    depth: width * 0.11180339887498948482
  }

  constructor(factor, inputColor, parentObj) {
    this.obj = new THREE.Object3D();
  }

  getAspect() {
  }
  getHeight() {
  }
  getWidth() {
  }
  getDepth() {
  }
}


class Wall {
  constructor(factor, inputColor, parentObj) {
  }
}
