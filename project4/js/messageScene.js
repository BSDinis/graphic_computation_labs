/**
 * scene.js
 *
 * define the scene class
 */


class MessageScene {
  constructor(factor) {
    this.scene = new THREE.Scene();
    this.amb = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(this.amb);
    this.factor = factor;
    this.message = new Message(factor, 'resources/paused.gif', this.scene);
    this.camera = new MessageCamera(factor, this.getWidth(), this.getHeight(), this.scene);
  }

  getCamera() { return this.camera.camera;}

  resize(w, h) {
    this.camera.resizeCamera(w, h);
  }

  getWidth() { return this.factor; }
  getHeight() { return this.factor; }

  updateScene(delta) { }
  toggleBallMove() {}
  toggleDirLight() {}
  togglePointLight() {}
  toggleCalc() { }
  toggleWireframe() { }
}
