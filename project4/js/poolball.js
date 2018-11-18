/*
 * 
 * 
 * */




class PoolBall{
constructor(radius, maxAngularSpeed, inputColor, parentObj) {
    this.obj =  new THREE.Object3D();
    this.axis = new THREE.AxisHelper(2 * radius);
    this.radius = radius;
    this.angle = 0;

    var min = maxAngularSpeed * 0.2
    this.speed = min + (Math.random() * (maxAngularSpeed - min));

    this.texture =  new THREE.TextureLoader().load( 'resources/16079.jpg' );
    var material = new THREE.MeshPhongMaterial(
      {color: inputColor, wireframe: false, transparent: false, opacity:0.5, map: this.texture }
    );
    var geometry = new THREE.SphereGeometry(radius, 80, 80);
    this.mesh = new THREE.Mesh(geometry, material);
    // Pivot point
    this.pivotPoint = new THREE.Object3D();
    this.mesh.add(this.pivotPoint);  

          
                                                             
    
    this.mesh.position.set(300, 101,0);

    parentObj.add(this.mesh);
  }

}
