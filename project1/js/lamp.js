/*
 * lamp.js
 *
 * define lamp class
 */

class Lamp {
  constructor(position, dimensions, inputColor, scene) {
    this._lamp = new THREE.Object3D();
    this._material = new THREE.MeshBasicMaterial({color: inputColor, wireframe: true});

    this.base = new Base({x: 0, y: dimensions.baseHeight/2, z: 0}, dimensions, this._material, this._lamp);
    this._lamp.position.set(position.x, position.y, position.z);
    scene.add(this._lamp);
    return;
  }
}


class Base {
  constructor(position, dimensions, material, parentObj) {
    var geometry = new THREE.CylinderGeometry(
      dimensions.baseRadius,
      dimensions.baseRadius,
      dimensions.baseHeight,
      10, 10, false
    );

    this.mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(material));
    this.rod = new LampRod ({x: 0, y: dimensions.rodHeight/2, z: 0}, dimensions, material, this.mesh);
    this.mesh.position.set(position.x, position.y, position.z);
    parentObj.add(this.mesh);
  }
}

class LampRod {
  constructor(position, dimensions, material, parentObj) {
    var geometry = new THREE.CylinderGeometry(
      dimensions.rodRadius,
      dimensions.rodRadius,
      dimensions.rodHeight,
      10, 10, false
    );

    this.mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(material));
    this.bulb = new Bulb({x: 0, y: dimensions.bulbRadius + dimensions.rodHeight/2, z: 0}, dimensions, material, this.mesh);
    this.mesh.position.set(position.x, position.y, position.z);
    parentObj.add(this.mesh);
  }
}

class Bulb {
  constructor(position, dimensions, material, parentObj) {
    var geometry = new THREE.SphereGeometry(
      dimensions.bulbRadius,
      15, 15
    );

    this.mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(material));
    this.shade = new Shade({x: 0, y: 0, z: 0}, dimensions, material, this.mesh);
    this.mesh.position.set(position.x, position.y, position.z);
    parentObj.add(this.mesh);
  }
}

class Shade {
  constructor(position, dimensions, material, parentObj) {
    var geometry = new THREE.CylinderGeometry(
      dimensions.shadeSmallRadius,
      dimensions.shadeBigRadius,
      dimensions.shadeHeight,
      20, 20, true
    );

    this. mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(material));
    this.mesh.position.set(position.x, position.y, position.z);
    parentObj.add(this.mesh);
  }
}
