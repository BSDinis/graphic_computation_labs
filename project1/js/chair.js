/*
 * chair.js
 *
 * define chair class
 */

class Chair {
  constructor(position, dimensions, inputColor, scene) {
    this._chair = new THREE.Object3D();
    this._material = new THREE.MeshBasicMaterial({color: inputColor, wireframe: true});
  
    this._seat = constructSeat(dimensions, this._material);
    this._chair.add(this._seat);

    this._backRod = constructBackRod(dimensions, this._material);
    this._chair.add(this._backRod);

    this._back = constructBack(dimensions, this._material);
    this._chair.add(this._back);

    /*

    this._rod = constructRod(dimensions, this._material);
    this._chair.add(this._rod);

    this._baseLegs = constructBaseLegs(dimensions, this._material);
    for (var i = 0; i < dimensions.noLegs; i++) {
      this._chair.add(this._baseLegs[i++])
    }

    */

    this._chair.position.x = position.x;
    this._chair.position.y = position.y;
    this._chair.position.z = position.z;

    scene.add(this._chair);
    return;

    /*
    function constructRod(dimensions, material) {
    }
    */

    function constructSeat(dimensions, material) {
	  var geometry = new THREE.CubeGeometry(dimensions.seatRadius * 2,
        dimensions.seatThickness,
        dimensions.seatRadius * 2);

      var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(material));
      mesh.position.x = 0;
      mesh.position.y = 2 * dimensions.wheelRadius + dimensions.rodHeight + dimensions.seatThickness / 2;
      mesh.position.z = 0;

      return mesh;
    }

    function constructBack(dimensions, material) {
	  var geometry = new THREE.CubeGeometry(dimensions.backWidth,
        dimensions.backHeight,
        dimensions.backThickness);

      var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(material));
      mesh.position.x = 0;
      mesh.position.y = 2 * dimensions.wheelRadius + dimensions.rodHeight + dimensions.backRodHeight;
      mesh.position.z = dimensions.seatRadius - dimensions.backRodRadius;

      return mesh;
    }

    function constructBackRod(dimensions, material) {
	  var geometry = new THREE.CubeGeometry(dimensions.backRodRadius * 2,
        dimensions.backRodHeight,
        dimensions.backRodRadius * 2);

      var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(material));
      mesh.position.x = 0;
      mesh.position.y = 2 * dimensions.wheelRadius + dimensions.rodHeight + dimensions.backRodHeight/2;
      mesh.position.z = dimensions.seatRadius + dimensions.backRodRadius;

      return mesh;
    }

    function constructBaseLegs(dimensions, material) {
    }
  }
}
