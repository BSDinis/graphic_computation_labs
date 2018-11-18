 class Rubiks {
  constructor(factor, _wireframe, inputColour, parentObj) {

    this.rubiks = new THREE.BoxGeometry(200,200,200, 1, 1, 1);
    this.texture =  new THREE.TextureLoader().load( 'resources/1.png' );
    this.bmap = new THREE.TextureLoader().load('resources/gridBMap.bmp'); //ainda vou arranjar uma grid melhor do que esta
    this.material = new THREE.MeshPhongMaterial({color: 0xffffff, map:this.texture, bumpMap: this.bmap});
    


    this.mesh2 = new THREE.Mesh(this.rubiks,
                                this.material);
    this.mesh2.position.y = 100;
    parentObj.add(this.mesh2);
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
