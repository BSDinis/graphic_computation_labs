/*
 * ring.js
 *
 * define ring class
 */

class Ring {
  class Base {
    constructor(width, height, inputColor, parentObj) {
      this.obj = new Object3D();
      //FIXME
      parentObj.add(this.obj);
    }
  }

  const dimensions = {
    width: .5,
    height: .25,
    depth: width * 0.11180339887498948482
  }

  constructor(factor, inputColor, parentObj) {
    this.obj = new THREE.Object3D();
    this.width = dimensions.width * factor;
    this.height = dimensions.height * factor;
    this.depth = dimensions.depth * factor;

    this.left = new Wall(this.height, inputColor, this.obj);
    this.right = new Wall(this.height, inputColor, this.obj);
    this.top = new Wall(this.width, inputColor, this.obj);
    this.bottom = new Wall(this.width, inputColor, this.obj);
    this.base = new Base(this.width, this.height, inputColor, this.obj);
    // FIXME - shift the walls
    parentObj.add(this.obj);
  }

  getAspect() {
    this.width / this.height;
  }
  getHeight() {
    this.height;
  }
  getWidth() {
    this.width;
  }
  getDepth() {
    this.depth;
  }
}


class Wall {
  constructor(length, inputColor, parentObj) {
    this.obj = new THREE.Object3D();
    // FIXME
    parentObj.add(this.obj);
  }
}
