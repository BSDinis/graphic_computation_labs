const depth = 0.01;

class Board {
  constructor(factor, _wireframe, inputColour, parentObj) {
    this.texture =  new THREE.TextureLoader().load( 'resources/chess_chess_board_game_board_flag_target_start_black_and_white_checkered-1195657.jpg' );
    this.materials = genMaterials(0xffffff, _wireframe, this.texture, 0.5, 1, 20, false); 
    this.basematerials = genMaterials(inputColour, _wireframe);   

    this.index=1;

    this.dicc = new THREE.PlaneGeometry(factor,factor,10);         
    this.base = new THREE.CubeGeometry(factor,depth*factor,factor);
   
    this.mesh1 = new THREE.Mesh(this.dicc, this.materials[this.materialIndex]);  
    this.mesh2 = new THREE.Mesh(this.base, this.basematerials[this.materialIndex]);
    this.mesh1.rotation.x=(-Math.PI/2);
    this.mesh1.position.y = 0.55 * depth * factor;
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
    //FIXME
  }

  togglePhongGouraud() {
    //FIXME
  }

  updateMaterial() {
    this.materials[this.index].wireframe = this.mesh1.material.wireframe
    this.mesh1.material = this.materials[this.index]
    this.basematerials2[this.index].wireframe = this.mesh2.basematerials.wireframe
    this.mesh2.basematerials = this.basematerials2[this.index]
  }
}

