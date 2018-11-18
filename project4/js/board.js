const depth = 0.01;
const wireframeDefault = false;

class Board {
  constructor(factor, inputColour, parentObj) {
    this.obj = new THREE.Object3D();
    this.texture =  new THREE.TextureLoader().load( 'resources/chess_chess_board_game_board_flag_target_start_black_and_white_checkered-1195657.jpg' );
    this.materials = genMaterials(0xffffff, wireframeDefault, this.texture, 0.5, 1, 20, false); 
    this.basematerials = genMaterials(inputColour, wireframeDefault);   
    this.depth = depth * factor;

    this.dicc = new THREE.PlaneGeometry(factor,factor,10);         
    this.base = new THREE.CubeGeometry(factor,depth*factor,factor);
    this.mesh1 = new THREE.Mesh(this.dicc, this.materials[1]);  
    this.mesh2 = new THREE.Mesh(this.base, this.basematerials[1]);
    this.reset();

    this.mesh1.rotation.x=(-Math.PI/2);
    this.mesh2.position.y -= 0.55 * this.depth;
    this.obj.add(this.mesh1);
    this.obj.add(this.mesh2);
    this.obj.position.y -= this.depth/2;
    parentObj.add(this.obj);
  }

  reset() {
    this.index=1;
    this.materials[this.index].wireframe = wireframeDefault;
    this.basematerials[this.index].wireframe = wireframeDefault;
    this.mesh1.material = this.materials[this.index];
    this.mesh2.material = this.basematerials[this.index];
  }

  toggleWireframe() {
    this.materials[this.index].wireframe = ! this.materials[this.index].wireframe;
    this.basematerials[this.index].wireframe = ! this.basematerials[this.index].wireframe;
  }

  toggleLighting() {
    var wireframe = this.materials[this.index].wireframe;
    this.index = (this.index == 0) ? 1 : 0;
    this.materials[this.index].wireframe = wireframe
    this.basematerials[this.index].wireframe = wireframe
    this.mesh1.material = this.materials[this.index];
    this.mesh2.material = this.basematerials[this.index];
  }

  getHeight() {
    return this.height;
  }
  getWidth() {                                                                                                                      
    return this.width;
  }
  getDepth() {                                                                                                                      
    return this.depth;
  }

  updateMaterial() {
    this.materials[this.index].wireframe = this.mesh1.material.wireframe
    this.mesh1.material = this.materials[this.index]
    this.basematerials2[this.index].wireframe = this.mesh2.basematerials.wireframe
    this.mesh2.basematerials = this.basematerials2[this.index]
  }
}

