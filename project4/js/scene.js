/**
 * scene.js
 *
 * define the scene class
 *
 *
 */


class Scene {
  constructor(wireframe) {
    this.scene = new THREE.Scene();
    this.amb = new THREE.AmbientLight(0xffffff, 0.3);
    this.scene.add(this.amb);
    this.board = new Board(200, wireframe, 0x4455cc, this.scene);
    var dim = {width: this.getWidth(), height: this.getHeight(), depth: this.getDepth()};
    this.dirlight = new DirLight(this.scene, dim);
    this.poolball = new PoolBall(100, 5, 0xffffff, this.scene);
    var time = Date.now() * 0.0005;
	this.poolball.obj.position.x = Math.cos( time * 10 ) * 5;
	this.poolball.obj.position.y = Math.cos( time * 7 ) * 3;
        this.poolball.obj.position.z = Math.cos( time * 8 ) * 4;  
    this.rubiks = new Rubiks(100, wireframe, 0xffffff, this.scene);

    

  }

  getAspect() {
    return this.getWidth() / this.getHeight();
  }

  getWidth() {
    return 1000;
  }

  getHeight() {
    return 1000;
  }

  getDepth() {
    return 1000;
  }

  updateScene(delta, arrows) {
  }
}
