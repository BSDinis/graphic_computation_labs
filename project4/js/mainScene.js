/**
 * scene.js
 *
 * define the scene class
 *
 *
 */


class MainScene {
  constructor(factor) {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x228b22);
    this.amb = new THREE.AmbientLight(0xffffff, 0.1);
    this.scene.add(this.amb);
    this.dirlight = new DirLight(this.scene, {width: factor, height: factor, depth: 0.15 * factor});
    this.pointlight = new PointLight(this.scene, {width: factor, height: factor, depth: 0.15 * factor});

    this.board = new Board(factor, 0xB87333, this.scene);
    this.poolball = new PoolBall(factor, this.scene);
    this.rubiks = new Rubiks(factor, this.scene);
    this.camera = new RotatingCamera(factor, this.scene);
  }

  getCamera() { return this.camera.camera;}

  getAspect() { return this.getWidth() / this.getHeight(); }
  getWidth() { return this.board.getWidth(); }
  getHeight() { return this.board.getHeight(); }
  getDepth() { return this.board.getDepth() + this.poolball.getDepth(); }

  reset() {
    this.board.reset();
    this.poolball.reset();
    this.camera.reset();
    this.dirlight.turnOn();
    this.pointlight.turnOn();
  }

  resize(w, h) {
    this.camera.resizeCamera(w, h);
  }

  updateScene(delta) {
    this.poolball.updateBall(delta);
    this.camera.updateCamera(delta);
  }

  toggleBallMove() { this.poolball.toggleMovement();}
  toggleDirLight() { this.dirlight.toggle();}
  togglePointLight() { this.pointlight.toggle();}
  toggleCalc() { 
    this.poolball.toggleLighting();
    this.board.toggleLighting();
    this.rubiks.toggleLighting();
  }

  toggleWireframe() { 
    this.poolball.toggleWireframe();
    this.board.toggleWireframe();
    this.rubiks.toggleWireframe();
  }
}
