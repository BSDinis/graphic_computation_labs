/*
 * chair.js
 *
 * define chair class
 */

class Chair {
  constructor(position, dimensions, inputColor, scene) {
    this._chair = new THREE.Object3D();
    this._speed = 0;
    this._acceleration = 0;
    this._angularSpeed = 0;
    this._angularAcceleration = 0;

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
    this._wheels = [];
    for (var i = 0; i < dimensions.noLegs; i++) {
      this._baseLegs[i] = constructBaseLeg(dimensions, this._material, i);
      this._wheels[i] = constructWheel(dimensions, this._material, i);
      this._chair.add(this._baseLegs[i])
      this._chair.add(this._wheels[i])
    }

    this._chair.position.set(position.x, position.y, position.z);

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

    function constructWheel(dimensions, material, wheelNo) {
      var geometry = new THREE.TorusGeometry(dimensions.wheelRadius, dimensions.wheelRadius, 16, 16);
      var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(material));

      var angle = 2 * wheelNo * Math.PI / dimensions.noLegs;

      mesh.position.x = 0;
      mesh.position.y = dimensions.wheelRadius;
      mesh.position.z = -dimensions.legLength + dimensions.wheelRadius / 2;

      mesh.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), angle);
      mesh.rotateY(Math.PI / 2);

      return mesh;
    }

    function constructBaseLeg(dimensions, material, legNo) {
      var geometry = new THREE.CubeGeometry(2*dimensions.legRadius, 2*dimensions.legRadius, dimensions.legLength);
      var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(material));

      var angle = 2 * legNo * Math.PI / dimensions.noLegs;

      mesh.position.x = 0;
      mesh.position.y = 2 * dimensions.wheelRadius;
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
  }

  hasAcceleration(){
    return this._acceleration != 0 || this._angularAcceleration != 0;
  }

  isMoving(){
    return this._speed != 0 || this._angularSpeed != 0;
  }

  updateSpeed(delta){
    this._speed += delta * this._acceleration;
    if (this._speed > maxSpeed) {
      this._speed = maxSpeed;
    }
    else if (this._speed < -maxSpeed) {
      this._speed = -maxSpeed;
    }
  }

  updateAngularSpeed(delta) {
    this._angularSpeed += delta * this._angularAcceleration;
    if (this._angularSpeed > maxAngularSpeed) {
      this._angularSpeed = maxAngularSpeed;
    }
    else if (this._angularSpeed < -maxAngularSpeed) {
      this._angularSpeed = -maxAngularSpeed;
    }
  }

  updatePosition(delta){
    this._chair.position.z += delta * this._speed;
    console.log(this._speed);
  }

  updateRotation(delta){
    this._chair.rotateY(delta * this._angularSpeed);
  }

  setAcceleration(a){
    this._acceleration = a;
  }

  setAngularAcceleration(a){
    this._angularAcceleration = a;
  }

  getAngularFriction(){
    const factor = 0.5;
    return - this._angularSpeed * factor;
  }

  getFriction(){
    const factor = 0.5;
    return - this._speed * factor;
  }
}
