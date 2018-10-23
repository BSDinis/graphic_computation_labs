/*
 * ring.js
 *
 * define ring class
 */

const dimensions = {
  width: .5,
  height: .25,
  thickness: 0.005,
  depth: 0.05590169943749475
}

class Ring {
  constructor(factor, wallColor, baseColor, parentObj) {
    this.obj = new THREE.Object3D();
    this.width = dimensions.width * factor;
    this.height = dimensions.height * factor;
    this.depth = dimensions.depth * factor;
    this.thickness = dimensions.thickness * factor;

    this.left = new Wall(this.height + 2 * this.thickness, this.depth, this.thickness, 'left', wallColor, this.obj);
    this.left.obj.position.x -= this.width / 2 + this.thickness/2
    this.left.obj.position.y += this.depth / 2

    this.right = new Wall(this.height + 2 * this.thickness, this.depth, this.thickness, 'right', wallColor, this.obj);
    this.right.obj.position.x += this.width / 2 + this.thickness/2
    this.right.obj.position.y += this.depth / 2

    this.top = new Wall(this.width, this.depth, this.thickness, 'top', wallColor, this.obj);
    this.top.obj.position.z += this.height / 2 + this.thickness/2
    this.top.obj.position.y += this.depth / 2

    this.bottom = new Wall(this.width, this.depth, this.thickness, 'bottom', wallColor, this.obj);
    this.bottom.obj.position.z -= this.height / 2 + this.thickness/2
    this.bottom.obj.position.y += this.depth / 2

    this.base = new Base(this.width, this.height, baseColor, this.obj);
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
    var geometry = new THREE.BoxGeometry(width, dimensions.thickness, height);
    this.mesh = new THREE.Mesh(geometry, material);
    parentObj.add(this.mesh);
  }
}


class Wall {
  constructor(length, depth, thickness, pos, inputColor, parentObj) {
    this.obj = new THREE.Object3D();
    this.pos = pos;
    this.thickness = thickness;
    var material = new THREE.MeshBasicMaterial(
      {color: inputColor, wireframe: false}
    )
    var geometry = new THREE.BoxGeometry(length, depth, thickness)
    this.mesh = new THREE.Mesh(geometry, material);
    this.obj.add(this.mesh)
    parentObj.add(this.obj);
    if (pos === 'left' || pos === 'right') {
      this.obj.rotateY(Math.PI/2);
    }
  }

  getX() { return this.obj.position.x; }
  getY() { return this.obj.position.y; }
  getZ() { return this.obj.position.z; }
  vertical() { return this.left() || this.right() }
  horizontal() { return this.bottom() || this.top(); }
  left() { return this.pos === 'left';}
  right() { return this.pos === 'right';}
  top() { return this.pos === 'top';}
  bottom() { return this.pos === 'bottom';}
  getThickness() { return this.thickness;} 
}
