/*
 * ring.js
 *
 * define ring class
 */

const dimensions = {
  width: .5,
  height: .25
}

dimensions.depth = dimensions.width * 0.11180339887498948482

class Ring {
  constructor(factor, inputColor, parentObj) {
    this.obj = new THREE.Object3D();
    this.width = dimensions.width * factor;
    this.height = dimensions.height * factor;
    this.depth = dimensions.depth * factor;

    /*
    this.left = new Wall(this.height, inputColor, this.obj);
    this.right = new Wall(this.height, inputColor, this.obj);
    this.top = new Wall(this.width, inputColor, this.obj);
    this.bottom = new Wall(this.width, inputColor, this.obj);
    */
    this.base = new Base(this.width, this.height, inputColor, this.obj);
    // FIXME - shift the walls
    parentObj.add(this.obj);
  }

  getAspect() {
    return this.width / this.height;
  }
  getHeight() {
    return this.height;
  }
  getWidth() {
    return this.width;
  }
  getDepth() {
    return this.depth;
  }

}

class Base {
  constructor(width, height, inputColor, parentObj) {
    var material = new THREE.MeshBasicMaterial(
      {color: inputColor, wireframe: false}
    )
    var geometry = new THREE.BoxGeometry(width, 0.0007 * width * height, height);
    this.mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(material));
    parentObj.add(this.mesh);
  }
}


class Wall {
  constructor(length, inputColor, parentObj) {
    this.obj = new THREE.Object3D();
    // FIXME
    parentObj.add(this.obj);
  }
}
