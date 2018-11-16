class Board {
  constructor(factor, _wireframe, inputColour, parentObj) {

    this.dicc = new THREE.PlaneGeometry(1000,1000,100);         
    this.texture =  new THREE.TextureLoader().load( 'resources/chess_chess_board_game_board_flag_target_start_black_and_white_checkered-1195657.jpg' );
    this.material = new THREE.MeshBasicMaterial({color: 0xffffff, map: this.texture});   //can remove the color

    this.base = new THREE.CubeGeometry(1000,50,1000);
    this.basemat = new THREE.MeshPhongMaterial({color: 0xB87333});
   
    this.mesh1 = new THREE.Mesh(this.dicc, this.material);  
    this.mesh2 = new THREE.Mesh(this.base, this.basemat);
    this.mesh1.rotation.x=(-Math.PI/2);
    this.mesh2.position.y = -26;
    parentObj.add(this.mesh1);
    parentObj.add(this.mesh2);
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

