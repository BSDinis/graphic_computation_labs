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
    this.message = new Message(factor, 'resources/chess_chess_board_game_board_flag_target_start_black_and_white_checkered-1195657.jpg', this.scene);
    this.camera = new MessageCamera(factor, this.getWidth(), this.getHeight(), this.scene);
  }

  getCamera() { return this.camera.camera;}

  resize(w, h) {
    //this.camera.resizeCamera(w, h);
  }

  getWidth() { return this.factor; }
  getHeight() { return this.factor; }

  updateScene(delta) { }
  toggleBallMove() {}
  toggleDirLight() {}
  togglePointLight() {}
  toggleCalc() { }
  toggleWireframe() { 
    this.message.toggleWireframe();
  }
}
