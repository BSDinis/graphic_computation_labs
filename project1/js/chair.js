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
    this.chair.position.z += delta * this._speed;
  }

  updateRotation(delta){
    this.rod.updateRotation(delta * this._angularSpeed);
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
    var angleStep = 2 * Math.PI / 5;
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
}

class Leg {
  constructor(position, dimensions, material, angle, parentObj) {
    var geometry = new THREE.CubeGeometry(2*dimensions.legRadius, 2*dimensions.legRadius, dimensions.legLength);
    this.mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(material));

    var wheel = new Wheel(
      {x: 0, y: -dimensions.wheelRadius, z: -dimensions.legLength/2},
      dimensions,
      material,
      this.mesh
    );

    this.mesh.position.x = 0;
    this.mesh.position.y = position.y;
    this.mesh.position.z = position.z - dimensions.legLength / 2
    this.mesh.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), angle);
    this.mesh.rotateY(angle);

    parentObj.add(this.mesh);
  }
}

class Wheel {
  constructor(position, dimensions, material, parentObj) {
    var geometry = new THREE.TorusGeometry(dimensions.wheelRadius, dimensions.wheelRadius, 16, 16);
    this.mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(material));

    this.mesh.position.set(position.x, position.y, position.z);
    this.mesh.rotateY(Math.PI / 2);
    parentObj.add(this.mesh);
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
