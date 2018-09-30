/*
 * chair.js
 *
 * define chair class
 */

class Chair {
  constructor(position, dimensions, inputColour, scene) {
    this._chair = new THREE.Object3D();
    this._material = new THREE.MeshBasicMaterial({color: inputColor, wireframe: true});
  
    this._rod = constructRod(dimensions, this._material);
    this._chair.add(this._rod);

    this._seat = constructSeat(dimensions, this._material);
    this._chair.add(this._set);

    this._back = constructBack(dimensions, this._material);
    this._chair.add(this._back);

    this._backRod = constructBackRod(dimensions, this._material);
    this._chair.add(this._backRod);

    this._baseLegs = constructBaseLegs(dimensions, this._material);
    for (var i = 0; i < dimensions.noLegs; i++) {
      this._chair.add(this._baseLegs[i++])
    }

    this._chair.position.x = position.x;
    this._chair.position.y = position.y;
    this._chair.position.z = position.z;

    scene.add(this._chair);
    return;

    function constructRod(dimensions, this._material) {
    }

    function constructSeat(dimensions, this._material) {
    }

    function constructBack(dimensions, this._material) {
    }

    function constructBackRod(dimensions, this._material) {
    }

    function constructBaseLegs(dimensions, this._material) {
    }
  }
}
