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

    this._rod = constructRod(
      {x: 0,
       y: 2*dimensions.wheelRadius + dimensions.rodHeight / 2,
       z: 0}, 
      dimensions,
      this._material
    );

    this._chair.add(this._rod);
    this._chair.position.set(position.x, position.y, position.z);
    scene.add(this._chair);
    return;


    function constructRod(position, dimensions, material) {
      var geometry = new THREE.CubeGeometry(dimensions.rodRadius * 2,
          dimensions.rodHeight,
          dimensions.rodRadius * 2);

      var rod = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(material));

      var seat = constructSeat(
        {x: 0, y: dimensions.rodHeight/2 + dimensions.seatThickness / 2, z: 0},
        dimensions,
        material
      );

      rod.add(seat);

      for (var i = 0; i < dimensions.noLegs; i++) {
        var leg = constructLeg(
          {x: 0, y: -dimensions.rodHeight/2 - dimensions.legRadius, z:0},
          dimensions,
          material,
          i
        );
        rod.add(leg);
      }

      rod.position.x = position.x;
      rod.position.y = position.y;
      rod.position.z = position.z;
      return rod;
    }

    function constructSeat(position, dimensions, material) {
	  var geometry = new THREE.CubeGeometry(dimensions.seatRadius * 2,
        dimensions.seatThickness,
        dimensions.seatRadius * 2);

      var seat = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(material));
      var back = constructBack(
        {x: 0, y: dimensions.backHeight / 2 - dimensions.seatThickness/2, z: dimensions.seatRadius + dimensions.backThickness / 2},
        dimensions,
        material
      );
      seat.add(back);

      seat.position.x = position.x;
      seat.position.y = position.y;
      seat.position.z = position.z;
      return seat;
    }

    function constructBack(position, dimensions, material) {
	  var geometry = new THREE.CubeGeometry(dimensions.backWidth,
        dimensions.backHeight,
        dimensions.backThickness);

      var back = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(material));
      back.position.x = position.x;
      back.position.y = position.y;
      back.position.z = position.z;
      return back;
    }

    function constructLeg(position, dimensions, material, legNo) {
      var geometry = new THREE.CubeGeometry(2*dimensions.legRadius, 2*dimensions.legRadius, dimensions.legLength);
      var leg = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(material));

      var wheel = new constructWheel(
        {x: 0, y: -dimensions.wheelRadius, z: -dimensions.legLength/2},
        dimensions,
        material
      );

      leg.add(wheel);

      var angle = 2 * legNo * Math.PI / dimensions.noLegs;
      leg.position.x = 0;
      leg.position.y = position.y;
      leg.position.z = position.z - dimensions.legLength / 2
      leg.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), angle);
      leg.rotateY(angle);

      return leg;
    }

    function constructWheel(position, dimensions, material) {
      var geometry = new THREE.TorusGeometry(dimensions.wheelRadius, dimensions.wheelRadius, 16, 16);
      var wheel = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(material));

      wheel.position.set(position.x, position.y, position.z);
      return wheel;
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
    const factor = 2;
    return - this._angularSpeed * factor;
  }

  getFriction(){
    const factor = 2;
    return - this._speed * factor;
  }
}
