/*
 * ball.js
 *
 * define ball class
 */


const horizSegments = 20
const vertSegments = 20

class Ball {
  constructor(radius, maxAngularSpeed, inputColor, parentObj) {
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

    /**
     * TODO
     *   - speed
     *   - rotation
     */

    parentObj.add(this.obj);
  }

  checkBallCollision(foeBall) {
    //FIXME
  }

  treatBallCollision(foeBall, collision) {
    //FIXME
  }

  checkWallCollision(foeWall) {
    //FIXME
  }

  treatWallCollision(foeWall, collision) {
    //FIXME
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
    this.obj.rotateY(increment);
  }
}
