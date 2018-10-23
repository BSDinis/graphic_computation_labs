/*
 * ball.js
 *
 * define ball class
 */


const horizSegments = 44
const vertSegments = 44

class Ball {
  constructor(radius, maxAngularSpeed, inputColor, parentObj) {
    this.capsule = new THREE.Object3D();
    this.obj =  new THREE.Object3D();
    this.axis = new THREE.AxisHelper(2 * radius);
    this.axis.visible = true;
    this.obj.add(this.axis);
    this.radius = radius;
    this.angle = 0;

    var min = maxAngularSpeed * 0.2
    this.speed = min + (Math.random() * (maxAngularSpeed - min));

    var material = new THREE.MeshBasicMaterial(
      {color: inputColor, wireframe: false }
    );
    var geometry = new THREE.SphereGeometry(radius, horizSegments, vertSegments);
    this.mesh = new THREE.Mesh(geometry, material);
    this.obj.add(this.mesh);
    this.capsule.add(this.obj)

    parentObj.add(this.capsule);
  }

  checkBallCollision(foeBall) {
    var x1 = new THREE.Vector3(this.capsule.position.x, 0, this.capsule.position.z)
    var x2 = new THREE.Vector3(foeBall.capsule.position.x, 0, foeBall.capsule.position.z)
    var x3 = new THREE.Vector3();
    x3.subVectors(x1, x2);
    var currDist = x3.x * x3.x + x3.z * x3.z;
    var targetDist = this.getRadius() * foeBall.getRadius() * 4;
    if (currDist <= targetDist) {
      return { happened: true, diff: x3, curr: currDist, target: targetDist };
    }
    
    return {happened: false}
  }

  treatBallCollision(foeBall, collision) {
    var diff = this.angle - foeBall.angle;
    var foeSpeed = foeBall.speed
    var displacement = (Math.sqrt(collision.target) - Math.sqrt(collision.curr)) / 2; 
    this.capsule.position.x -= displacement * Math.sin(this.angle)
    this.capsule.position.z -= displacement * Math.cos(this.angle)
    foeBall.capsule.position.x -= displacement * Math.sin(foeBall.angle)
    foeBall.capsule.position.z -= displacement * Math.cos(foeBall.angle)
    this.rotate(-diff)
    foeBall.rotate(diff)
    foeBall.speed = this.speed;
    this.speed = foeSpeed;
  }

  checkWallCollision(foeWall) {
    var collision = {
      happened: false,
      new_x: this.capsule.position.x,
      new_z: this.capsule.position.z,
      new_angle: this.angle
    }

    if (foeWall.left()) {
      var targetX = foeWall.getX() + foeWall.getThickness()/2 + this.getRadius();
      if (this.capsule.position.x <= targetX) {
        collision.new_x = targetX + (targetX - this.capsule.position.x)
        collision.happened = true;
        collision.new_angle *= -1;
      }
    }
    else if (foeWall.right()) {
      var targetX = foeWall.getX() - foeWall.getThickness()/2 - this.getRadius();
      if (this.capsule.position.x >= targetX) {
        collision.new_x = targetX + (targetX - this.capsule.position.x)
        collision.happened = true;
        collision.new_angle *= -1;
      }
    }

    if (foeWall.top()) {
      var targetZ = foeWall.getZ() - foeWall.getThickness()/2 - this.getRadius();
      if (this.capsule.position.z >= targetZ) {
        collision.new_z = targetZ + (targetZ - this.capsule.position.z)
        collision.happened = true;
        collision.new_angle = Math.PI - collision.new_angle;
      }
    }
    else if (foeWall.bottom()) {
      var targetZ = foeWall.getZ() + foeWall.getThickness()/2 + this.getRadius();
      if (this.capsule.position.z <= targetZ) {
        collision.new_z = targetZ + (targetZ - this.capsule.position.z)
        collision.happened = true;
        collision.new_angle = Math.PI - collision.new_angle;
      }
    }

    return collision
  }

  treatWallCollision(collision) {
    this.capsule.position.x = collision.new_x;
    this.capsule.position.z = collision.new_z;
    var angle_var = collision.new_angle - this.angle;
    this.rotate(angle_var);
  }

  updateBall(delta) {
    var disp = this.speed * delta;
    this.obj.rotateX(disp);
  }

  getRadius() {
    return this.radius;
  }

  getAngularSpeed() {
    return this.speed;
  }

  getSpeed() {
    return this.getRadius() * this.getAngularSpeed();
  }

  setSpeed(vec) {
    console.log(vec)
    var origin = new THREE.Vector3(0,0,1)
    this.speed = vec.length() / this.getRadius();
    var new_angle = vec.angleTo(origin)
    this.rotate(new_angle - this.angle)
    console.log(this.speed)
    console.log(this.angle)
  }

  getAngle() {
    return this.angle;
  }

  rotate(increment) {
    this.angle += increment;
    this.capsule.rotateY(increment);
  }
}
