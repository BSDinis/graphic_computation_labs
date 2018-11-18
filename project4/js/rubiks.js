const rubiksSide = .2 
class Rubiks {
  constructor(factor, parentObj) {

    this.rubiks = new THREE.BoxGeometry(factor * rubiksSide,factor * rubiksSide,factor * rubiksSide, 10, 10, 10);
    this.texture =  new THREE.TextureLoader().load( 'resources/1.png' );
    this.bmap = new THREE.TextureLoader().load('resources/gridBMap.bmp'); //ainda vou arranjar uma grid melhor do que esta
    this.material = [new THREE.MeshBasicMaterial({color: 0xffffff, map:this.texture, bumpMap: this.bmap}), new THREE.MeshPhongMaterial({color: 0xffffff, map:this.texture, bumpMap: this.bmap})]
    this.index = 1;
    this.mesh = new THREE.Mesh(this.rubiks, this.material);
    this.mesh.position.y = factor * rubiksSide / 2;
    parentObj.add(this.mesh);
  }

  toggleWireframe() {
    this.material[this.index].wireframe = ! this.material[this.index].wireframe;
  }

  toggleLighting() {
    var wireframe = this.material[this.index].wireframe;
    this.index = (this.index == 0) ? 1 : 0;
    this.material[this.index].wireframe = wireframe
    this.mesh.material = this.material[this.index];
  }
}
   



  /* 
   *
   *
   *
   *                                                                       IGNORAR
   *
   *
   *
   *
   * 
   *
   *

   
      const loader = new THREE.TextureLoader();

   var materials = [
   new THREE.MeshPhongMaterial({color: 0xffffff,map: loader.load('resources/1.png')}),
   new THREE.MeshPhongMaterial({map: loader.load('resources/2.png')}),  
   new THREE.MeshPhongMaterial({map: loader.load('resources/3.png')}),  
   new THREE.MeshPhongMaterial({map: loader.load('resources/4.png')}),  
   new THREE.MeshPhongMaterial({map: loader.load('resources/5.png')}), 
   new THREE.MeshPhongMaterial({map: loader.load('resources/6.png')}),  
   ];   
   
   
   
   
   
   
   
   
   var mffaterials = [
       new THREE.MeshPhongMaterial({ color: 0xffffff,
           map: new THREE.TextureLoader().load('resources/1.png')
       }),
       new THREE.MeshPhongMaterial({
           map: new THREE.TextureLoader().load('resources/2.png')
       }),
       new THREE.MeshLambertMaterial({
           map: new THREE.TextureLoader().load('resources/3.png')
       }),
       new THREE.MeshLambertMaterial({
           map: new THREE.TextureLoader().load('resources/4.png')
       }),
       new THREE.MeshLambertMaterial({
           map: new THREE.TextureLoader().load('resources/5.png')
       }),
       new THREE.MeshLambertMaterial({
           map: new THREE.TextureLoader().load('resources/6.png')
       })
    ];    

    var loader = new THREE.CubeTextureLoader();
    loader.setPath( 'resources/' );

    var textureCube =
	new THREE.CubeTextureLoader()
        .setPath('resources/')
        .load([
        '1.png',
        '2.png',
        '3.png',
        '4.png',
        '5.png',
        '6.png'
        ] ) ; */

//var materials = new THREE.MeshPhongMaterial( {color: 0xf67fff,  map: textureCube } );    
