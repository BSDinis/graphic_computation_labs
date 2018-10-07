/*
 * chair.js
 *
 * define chair class
 */

class Chair {
  constructor(position, dimensions, inputColor, parentObj) {
    this.chair = new THREE.Object3D();
    this._speed = 0;
    this._acceleration = 0;
    this._angularSpeed = 0;
    this._angularAcceleration = 0;
    this._material = new THREE.MeshBasicMaterial({color: inputColor, wireframe: true});
    this._angle = 0;
    this._noLegs = dimensions.noLegs;

    this.rod = new ChairRod(
      {x: 0,
       y: 4*dimensions.wheelRadius + dimensions.rodHeight / 2,
       z: 0}, 
      dimensions,
      this._material,
      this.chair
    );

    this.chair.rotateY(this._angle);
    this.chair.position.set(position.x, position.y, position.z);
    parentObj.add(this.chair);
  }


  hasAcceleration(){
    return this._acceleration != 0 || this._angularAcceleration != 0;
  }

  isMoving(){
    return this._speed != 0 || this._angularSpeed != 0;
  }

  updateSpeed(delta){
    var diff = delta * this._acceleration;
    this._speed += diff;
    if (this._speed > maxSpeed) {
      this._speed = maxSpeed;
    }
    else if (this._speed < -maxSpeed) {
      this._speed = -maxSpeed;
    }
    this.rod.updateWheels(this._angle, this._noLegs, this._speed/maxSpeed);
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
    const factor = 1;
    return - this._angularSpeed * factor;
  }

  getFriction(){
    const factor = 1;
    return - this._speed * factor;
  }
}


class ChairRod {
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

  updateWheels(angle, noLegs, factor) {
    for (var i = 0; i < noLegs; i++) {
      this.leg[i].updateWheel(angle, factor);
    }
  }
}

class Leg {
  constructor(position, dimensions, material, angle, parentObj) {
    var geometry = new THREE.CubeGeometry(2*dimensions.legRadius, 2*dimensions.legRadius, dimensions.legLength);
    this.mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(material));
    this._wheelAngle = this._targetAngle = 0;

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


  updateWheel(angle, factor) {
    this._targetAngle = angle;
    var step = (this._targetAngle - this._wheelAngle);
    if (step > Math.PI) {
      this._wheelAngle += Math.PI;
      step -= Math.PI;
    }
    if (step < -Math.PI) {
      this._wheelAngle -= Math.PI;
      step += Math.PI;
    }
    step *= Math.abs(factor) / 2;
    this._wheelAngle += step;
    this.wheel.obj.rotateY(step);
    this.wheel.updateRotation(factor);
  }
}

class Wheel {
  constructor(position, dimensions, material, angle, parentObj) {
    this.obj = new THREE.Object3D()
    var geometry = new THREE.TorusGeometry(dimensions.wheelRadius, dimensions.wheelRadius, 8, 8);
    this.mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(material));

    this.obj.add(this.mesh)
    this.obj.rotateY(Math.PI/2-angle);
    this.obj.position.set(position.x, position.y, position.z);
    parentObj.add(this.obj);
  }

  updateRotation(factor) {
    const step = Math.PI / 16;
    this.mesh.rotateZ(step * factor);
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


    this.armRest = [];
    this.armRest[0] = new ArmRest(
      {x: -dimensions.seatRadius + dimensions.armRestRadius, y: 2 * dimensions.seatRadius/3, z: dimensions.seatRadius/3},
      dimensions, 
      material, 
      this.mesh
    );
    this.armRest[0] = new ArmRest(
      {x: dimensions.seatRadius - dimensions.armRestRadius, y: 2 * dimensions.seatRadius/3, z: dimensions.seatRadius/3},
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

class ArmRest {
  constructor(position, dimensions, material, parentObj) {
    var geometry1 = new THREE.CubeGeometry(dimensions.armRestRadius * 2,
      dimensions.armRestRadius * 2,
      4 * dimensions.seatRadius / 3
    );
    var geometry2 = new THREE.CubeGeometry(dimensions.armRestRadius * 2,
      2 * dimensions.seatRadius/3,
      dimensions.armRestRadius * 2
    );

    this.mesh1 = new THREE.Mesh(geometry1, new THREE.MeshBasicMaterial(material));
    this.mesh2 = new THREE.Mesh(geometry2, new THREE.MeshBasicMaterial(material));
    this.mesh2.position.set(0, -dimensions.seatRadius/3 + dimensions.armRestRadius, - 2 * dimensions.seatRadius/3);
    this.mesh1.add(this.mesh2);
    this.mesh1.position.set(position.x, position.y, position.z);
    parentObj.add(this.mesh1);

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
