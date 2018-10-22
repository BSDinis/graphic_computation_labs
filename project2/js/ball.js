/*
 * ball.js
 *
 * define ball class
 */


const horizSegments = 20
const vertSegments = 20

class Ball {
  constructor(radius, inputColor, parentObj) {
    this.obj =  new THREE.Object3D();
    this.axis = new THREE.AxisHelper(2 * radius);
    this.axis.visible = true;
    this.obj.add(this.axis);
    this.radius = radius;

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

  updateBall() {
    //FIXME - rotate ball around the axis
  }

  getRadius() {
    return this.radius;
  }
}
