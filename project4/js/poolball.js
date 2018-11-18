const angularSpeed = 2;
const radius = 0.1
const orbitRadius = 0.35

class PoolBall{
  constructor(factor, inputColor, parentObj) {
    this.capsule = new THREE.Object3D();
    this.obj =  new THREE.Object3D();
    this.axis = new THREE.AxisHelper(2 * radius);
    this.radius = radius * factor;
    this.orbitRadius = orbitRadius * factor;
    this.angle = 0;
    this.index=1;

    this.texture =  new THREE.TextureLoader().load( 'resources/16079.jpg' );
    this.materials = genMaterials(inputColor, false, this.texture, 0.5, 1, 100);
    var geometry = new THREE.SphereGeometry(this.radius, 80, 80);
    this.mesh = new THREE.Mesh(geometry, this.materials[1]);
    this.capsule.add(this.mesh);
    this.capsule.position.x += this.orbitRadius;
    this.capsule.position.y +=  this.radius;
    this.obj.add(this.capsule);

    parentObj.add(this.obj);
  }

  updateBall(delta) {
    this.obj.rotateY(delta * angularSpeed);
    this.capsule.rotateX(-delta * this.orbitRadius/this.radius * angularSpeed);
  }

  getDepth() { return 2* this.radius; }
  getPos() { return this.capsule.position; }
}

