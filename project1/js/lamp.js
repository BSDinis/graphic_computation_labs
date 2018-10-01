/*
 * lamp.js
 *
 * define lamp class
 */

class Lamp {
  constructor(position, dimensions, inputColor, scene) {
    this._lamp = new THREE.Object3D();
    this._material = new THREE.MeshBasicMaterial({color: inputColor, wireframe: true});

    this._rod = constructRod(dimensions, this._material);
    this._lamp.add(this._rod);


    this._base = constructBase(dimensions, this._material);
    this._lamp.add(this._base);

    this._shade = constructShade(dimensions, this._material);
    this._lamp.add(this._shade);

    this._bulb = constructBulb(dimensions, this._material);
    this._lamp.add(this._bulb);

    this._lamp.position.x = position.x;
    this._lamp.position.y = position.y;
    this._lamp.position.z = position.z;
    scene.add(this._lamp);
    return;

    function constructBase(dimensions, material) {
      var geometry = new THREE.CylinderGeometry(
        dimensions.baseRadius,
        dimensions.baseRadius,
        dimensions.baseHeight,
        10, 10, false
      );

      var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(material));
      mesh.position.x = 0;
      mesh.position.y = dimensions.baseHeight / 2;
      mesh.position.z = 0;
      mesh.position.set = (0, dimensions.baseHeight / 2, 0);

      return mesh;
    }

    function constructRod(dimensions, material) {
      var geometry = new THREE.CylinderGeometry(
        dimensions.rodRadius,
        dimensions.rodRadius,
        dimensions.rodHeight,
        10, 10, false
      );

      var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(material));
      mesh.position.x = 0;
      mesh.position.y = dimensions.baseHeight + dimensions.rodHeight / 2;
      mesh.position.z = 0;

      return mesh;
    }

    function constructBulb(dimensions, material) {
      var geometry = new THREE.SphereGeometry(
        dimensions.bulbRadius,
        15, 15
      );

      var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(material));
      mesh.position.x = 0;
      mesh.position.y = dimensions.baseHeight + dimensions.rodHeight + dimensions.bulbRadius;
      mesh.position.z = 0;

      return mesh;
    }

    function constructShade(dimensions, material) {
      var geometry = new THREE.CylinderGeometry(
        dimensions.shadeSmallRadius,
        dimensions.shadeBigRadius,
        dimensions.shadeHeight,
        20, 20, true
      );

      var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(material));
      mesh.position.x = 0;
      mesh.position.y = dimensions.baseHeight + dimensions.rodHeight + dimensions.bulbRadius;
      mesh.position.z = 0;

      return mesh;
    }
  }
}
