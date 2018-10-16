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
    this.obj.add(axis)
  }

  checkBallCollision(foeBall) {
  }

  treatBallCollision(foeBall, collision) {
  }

  checkWallCollision(foeWall) {
  }

  treatWallCollision(foeWall, collision) {
  }
}
