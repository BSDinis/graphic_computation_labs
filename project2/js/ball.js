/*
 * ball.js
 *
 * define ball class
 */

class Ball {
  constructor(radius, inputColor, parentObj) {
    this.obj =  new THREE.Object3D();
    this.axis = new THREE.AxisHelper(50);
    this.axis.visible = true;
    this.obj.add(axis);

    /**
     * TODO
     *   - draw
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
}
