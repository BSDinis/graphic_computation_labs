/*
 * lamp.js
 *
 * define lamp class
 */

class Lamp {
  constructor(dimensions, inputColor, scene) {
    this._lamp = new THREE.Object3D();
    this._material = new THREE.MeshBasicMaterial({color: inputColor, wireframe: true});

    this._base = constructBase(dimensions, this._material);
    this._lamp.add(this._base);

    /*
    this._rod = constructRod(dimensions, this._material);
    this._lamp.add(this._rod);

    this._bulb = constructBulb(dimensions, this._material);
    this._lamp.add(this._bulb);

    this._shade = constructShade(dimensions, this._material);
    this._lamp.add(this._shade);
    */

    scene.add(this._lamp)


    function constructBase(dimensions, material) {
      var geometry = new THREE.CylinderGeometry(
        dimensions.baseRadius,
        dimensions.baseRadius,
        dimensions.baseHeight,
        10, 10, false);

      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.set = (0, dimensions.baseHeight / 2, 0);

      return mesh;
    }
  }
}
