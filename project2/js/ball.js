/*
 * ball.js
 *
 * define ball class
 */


const horizSegments = 20
const vertSegments = 20

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

    /**
     * TODO
     *   - speed
     *   - rotation
     */

    parentObj.add(this.capsule);
  }

  checkBallCollision(foeBall) {
    //FIXME
  }

  treatBallCollision(foeBall, collision) {
    //FIXME
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

  getAngle() {
    return this.angle;
  }

  rotate(increment) {
    this.angle += increment;
    this.capsule.rotateY(increment);
  }
}
