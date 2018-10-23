/*
 * example.js
 *
 * define example class: a box
 */

const dimensions = {
  width: .7,
  height: .3,
  depth: .1
}

class Example {
  constructor(factor, inputColor, parentObj) {
    this.obj = new THREE.Object3D();
    this.width = dimensions.width * factor;
    this.height = dimensions.height * factor;
    this.depth = dimensions.depth * factor;

    var material = new THREE.MeshBasicMaterial(
      {color: inputColor, wireframe: false}
    )
    var geometry = new THREE.BoxGeometry(this.width, this.depth, this.height)
    this.mesh = new THREE.Mesh(geometry, material);
    this.obj.add(this.mesh)
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

