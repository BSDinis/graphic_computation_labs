/*
 * chair.js
 *
 * define chair class
 */

class Chair {
  constructor(position, dimensions, inputColor, scene) {
    this.chair = new THREE.Object3D();
    this._speed = 0;
    this._acceleration = 0;
    this._angularSpeed = 0;
    this._angularAcceleration = 0;
    this._material = new THREE.MeshBasicMaterial({color: inputColor, wireframe: true});
    this._angle = 0;
    this._noLegs = dimensions.noLegs;

    this.rod = new Rod(
      {x: 0,
       y: 2*dimensions.wheelRadius + dimensions.rodHeight / 2,
       z: 0}, 
      dimensions,
      this._material,
      this.chair
    );

    this.chair.position.set(position.x, position.y, position.z);
    scene.add(this.chair);
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
    this.rod.updateWheels(this._angle, this._noLegs);
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
    var displacement = delta * this._speed;
    this.chair.position.x += displacement * Math.sin(this._angle);
    this.chair.position.z += displacement * Math.cos(this._angle);
  }

  updateRotation(delta){
    var angle = delta * this._angularSpeed;
    this._angle += angle;
    this.rod.updateRotation(angle);
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


class Rod {
  constructor(position, dimensions, material, parentObj) {
    var geometry = new THREE.CubeGeometry(dimensions.rodRadius * 2,
        dimensions.rodHeight,
        dimensions.rodRadius * 2);

    this.mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(material));
    this.seat = new Seat(
      {x: 0, y: dimensions.rodHeight/2 + dimensions.seatThickness / 2, z: 0},
      dimensions,
      material,
      this.mesh
    );

    var angle = 0;
    var angleStep = 2 * Math.PI / dimensions.noLegs;
    this.leg = []
    for (var i = 0; i < dimensions.noLegs; i++, angle += angleStep) {
      this.leg[i] = new Leg(
        {x: 0, y: -dimensions.rodHeight/2 - dimensions.legRadius, z:0},
        dimensions,
        material,
        angle,
        this.mesh
      );
    }

    this.mesh.position.x = position.x;
    this.mesh.position.y = position.y;
    this.mesh.position.z = position.z;
    parentObj.add(this.mesh);

  }

  updateRotation(angle) {
    this.seat.updateRotation(angle);
  }

  updateWheels(angle, noLegs) {
    for (var i = 0; i < noLegs; i++) {
      this.leg[i].updateWheel(angle);
    }
  }
}

class Leg {
  constructor(position, dimensions, material, angle, parentObj) {
    var geometry = new THREE.CubeGeometry(2*dimensions.legRadius, 2*dimensions.legRadius, dimensions.legLength);
    this.mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(material));

    this.wheel = new Wheel(
      {x: 0, y: -dimensions.wheelRadius, z: -dimensions.legLength/2},
      dimensions,
      material,
      angle,
      this.mesh
    );

    this.mesh.position.x = 0;
    this.mesh.position.y = position.y;
    this.mesh.position.z = position.z - dimensions.legLength / 2
    this.mesh.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), angle);
    this.mesh.rotateY(angle);

    parentObj.add(this.mesh);
  }


  updateWheel(angle) {
    this.wheel.updateDirection(angle);
  }
}

class Wheel {
  constructor(position, dimensions, material, angle, parentObj) {
    var geometry = new THREE.TorusGeometry(dimensions.wheelRadius, dimensions.wheelRadius, 16, 16);
    this.mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(material));
    this._offsetAngle = Math.PI/2 - angle;
    this._angle = this._targetAngle = 0;

    this.mesh.position.set(position.x, position.y, position.z);
    this.mesh.rotateY(this._angle + this._offsetAngle);
    parentObj.add(this.mesh);
  }

  updateDirection(angle) {
    this._targetAngle = angle;
    var step = (this._targetAngle - this._angle) / 10;
    this.mesh.rotateY(step);
    this._angle += step;
  }
}

class Seat {
  constructor(position, dimensions, material, parentObj) {
    var geometry = new THREE.CubeGeometry(dimensions.seatRadius * 2,
      dimensions.seatThickness,
      dimensions.seatRadius * 2);

    this.mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(material));
    this.back = new Back(
      {x: 0, y: dimensions.backHeight / 2 - dimensions.seatThickness/2, z: dimensions.seatRadius + dimensions.backThickness / 2},
      dimensions,
      material,
      this.mesh
    );

    this.mesh.position.set(position.x, position.y, position.z);
    parentObj.add(this.mesh);

  }

  updateRotation(angle) {
    this.mesh.rotateY(angle);
  }
}

class Back {
  constructor(position, dimensions, material, parentObj) {
    var geometry = new THREE.CubeGeometry(dimensions.backWidth,
      dimensions.backHeight,
      dimensions.backThickness);

    this.mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(material));
    this.mesh.position.set(position.x, position.y, position.z);
    parentObj.add(this.mesh);
  }
}
