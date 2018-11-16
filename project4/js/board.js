class Board {
  constructor(factor, _wireframe, inputColour, parentObj) {

    this.dicc = new THREE.PlaneGeometry(1000,1000,100);         
    this.texture =  new THREE.TextureLoader().load( 'resources/chess_chess_board_game_board_flag_target_start_black_and_white_checkered-1195657.jpg' );
    this.material = new THREE.MeshBasicMaterial({color: 0xffffff, map: this.texture});
   
    this.mesh1 = new THREE.Mesh(this.dicc, this.material);
    this.mesh1.rotation.x=(-Math.PI/2);
    parentObj.add(this.mesh1);
  }

  getHeight() {
    return this.height;
  }
  getWidth() {                                                                                                                      
    return this.width;
  }

  toggleLightingCalc() {
    var tmp = this.oldIndex;
    this.oldIndex = this.index;
    this.index = tmp;
    this.updateMaterial();
  }

  togglePhongGouraud() {
    if (this.index == 0) {
      this.oldIndex = (this.oldIndex == 1) ? 2 : 1;
    }
    else {
      this.index = (this.index == 1) ? 2 : 1;
      this.updateMaterial();
    }
  }

  updateMaterial() {
    this.material1[this.index].wireframe = this.mesh1.material.wireframe
    this.mesh1.material = this.material1[this.index]
    this.material2[this.index].wireframe = this.mesh2.material.wireframe
    this.mesh2.material = this.material2[this.index]
  }
}

