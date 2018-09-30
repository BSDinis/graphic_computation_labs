/*
 * chair.js
 *
 * define chair class
 */

class Chair {
  constructor(position, dimensions, inputColor, scene) {
    this._chair = new THREE.Object3D();
    this._velocity = new THREE.Vector3(0, 0, 0);
    this._acceleration = new THREE.Vector3(0, 0, 0);
    this._material = new THREE.MeshBasicMaterial({color: inputColor, wireframe: true});

    this._seat = constructSeat(dimensions, this._material);
    this._chair.add(this._seat);

    this._backRod = constructBackRod(dimensions, this._material);
    this._chair.add(this._backRod);

    this._back = constructBack(dimensions, this._material);
    this._chair.add(this._back);

    this._rod = constructRod(dimensions, this._material);
    this._chair.add(this._rod);


    this._baseLegs = [];
    for (var i = 0; i < dimensions.noLegs; i++) {
      this._baseLegs[i] = constructBaseLeg(dimensions, this._material);
      this._chair.add(this._baseLegs[i])
    }


    this._chair.position.x = position.x;
    this._chair.position.y = position.y;
    this._chair.position.z = position.z;

    scene.add(this._chair);
    return;


    function constructRod(dimensions, material) {
      var geometry = new THREE.CubeGeometry(dimensions.rodRadius * 2,
          dimensions.rodHeight,
          dimensions.rodRadius * 2);

        var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(material));
        mesh.position.x = 0;
        mesh.position.y = 2 * dimensions.wheelRadius + dimensions.rodHeight/2;
        mesh.position.z = 0;

        return mesh;
    }

    function constructBaseLeg(dimensions, material) {
      var geometry = new THREE.CubeGeometry(2*dimensions.legRadius, 2*dimensions.legRadius, dimensions.legLength);
      var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(material));

      var angle = 2 * i * Math.PI / dimensions.noLegs;

      mesh.position.x = 0;
      mesh.position.y = dimensions.legRadius + 2 * dimensions.wheelRadius;
      mesh.position.z = -dimensions.legLength / 2
      mesh.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), angle);
      mesh.rotateY(angle);

      return mesh;
    }

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

  function isMoving(){
    return !this._velocity.equals(new THREE.Vector3(0, 0, 0));

  }

  function updateVelocity(delta){
    this._velocity += delta * this._acceleration;
    var speed = this._velocity.length();
    if (speed > maxSpeed){
      this._velocity = maxSpeed / speed * this._velocity;
    }

  }

  function updatePosition(delta){
    this._chair.position.x += delta * this._velocity.x;
    this._chair.position.z += delta * this._velocity.z;
  }

  function setAcceleration(a){
    this._acceleration = a;

  }

  function getFriction(){
    var friction = new THREE.Vector3(-this._velocity);


  }
}
